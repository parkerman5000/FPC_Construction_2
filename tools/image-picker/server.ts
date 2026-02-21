import sharp from "sharp";
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const CONFIG_PATH = join(import.meta.dir, "../../assets/data/gallery-config.json");
const PROJECTS_DIR = join(import.meta.dir, "../../assets/images/projects");
const PLACEHOLDER_DIR = join(import.meta.dir, "../../assets/images/placeholder");
const STATIC_DIR = import.meta.dir;
const PORT = 3456;

// Ensure output directories exist
mkdirSync(PROJECTS_DIR, { recursive: true });

// In-memory cache for uploaded files (cleared after processing)
const uploadCache = new Map<string, Buffer>();

// MIME types for static files
const MIME: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function readConfig() {
  return JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));
}

function backupAndWriteConfig(config: any) {
  if (existsSync(CONFIG_PATH)) {
    copyFileSync(CONFIG_PATH, CONFIG_PATH + ".bak");
  }
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
}

async function downloadGDriveImage(gdriveId: string): Promise<Buffer> {
  const url = `https://drive.google.com/uc?export=download&id=${gdriveId}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`Failed to download from GDrive: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    const thumbUrl = `https://drive.google.com/thumbnail?id=${gdriveId}&sz=w1200`;
    const thumbRes = await fetch(thumbUrl, { redirect: "follow" });
    if (!thumbRes.ok) {
      throw new Error(`GDrive thumbnail fallback also failed: ${thumbRes.status}`);
    }
    return Buffer.from(await thumbRes.arrayBuffer());
  }

  return Buffer.from(await res.arrayBuffer());
}

async function optimizeImage(
  buffer: Buffer,
  type: "project" | "gallery"
): Promise<{ data: Buffer; webpData: Buffer; width: number; height: number; size: number }> {
  const width = type === "project" ? 800 : 1200;
  const height = type === "project" ? 600 : 900;

  const pipeline = sharp(buffer).rotate().resize(width, height, { fit: "cover", position: "center" });

  const jpgResult = await pipeline.clone()
    .jpeg({ quality: 80, progressive: true })
    .toBuffer({ resolveWithObject: true });

  const webpResult = await pipeline.clone()
    .webp({ quality: 75 })
    .toBuffer();

  return {
    data: jpgResult.data,
    webpData: webpResult,
    width: jpgResult.info.width,
    height: jpgResult.info.height,
    size: jpgResult.info.size,
  };
}

async function saveLocal(
  slotId: string,
  data: Buffer,
  webpData: Buffer,
  type: "project" | "gallery"
): Promise<string> {
  const jpgFilename = `${slotId}.jpg`;
  const webpFilename = `${slotId}.webp`;

  // Projects go to both projects/ and placeholder/ (for fallback)
  const targetDir = type === "project" ? PLACEHOLDER_DIR : PROJECTS_DIR;

  writeFileSync(join(targetDir, jpgFilename), data);
  writeFileSync(join(targetDir, webpFilename), webpData);

  // Also save to projects dir for local mode
  if (type === "project") {
    writeFileSync(join(PROJECTS_DIR, jpgFilename), data);
    writeFileSync(join(PROJECTS_DIR, webpFilename), webpData);
  }

  const relativePath = type === "project"
    ? `assets/images/placeholder/${jpgFilename}`
    : `assets/images/projects/${jpgFilename}`;

  return relativePath;
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // --- API Routes ---

    // GET /api/config
    if (path === "/api/config" && req.method === "GET") {
      try {
        const config = readConfig();
        return Response.json(config);
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // GET /api/gdrive-thumb/:id
    if (path.startsWith("/api/gdrive-thumb/") && req.method === "GET") {
      const gdriveId = path.split("/api/gdrive-thumb/")[1];
      if (!gdriveId) {
        return Response.json({ error: "Missing gdriveId" }, { status: 400 });
      }
      try {
        const thumbUrl = `https://drive.google.com/thumbnail?id=${gdriveId}&sz=w400`;
        const res = await fetch(thumbUrl, { redirect: "follow" });
        if (!res.ok) {
          return new Response("GDrive fetch failed", { status: res.status });
        }
        const data = await res.arrayBuffer();
        return new Response(data, {
          headers: {
            "Content-Type": res.headers.get("content-type") || "image/jpeg",
            "Cache-Control": "public, max-age=3600",
          },
        });
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // POST /api/upload — upload a local file to the pool
    if (path === "/api/upload" && req.method === "POST") {
      try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
          return Response.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const id = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const thumbResult = await sharp(buffer)
          .rotate()
          .resize(400, 300, { fit: "cover" })
          .jpeg({ quality: 70 })
          .toBuffer();

        // Store full-res buffer in memory for later processing
        uploadCache.set(id, buffer);

        // Return thumbnail as base64 for preview
        const thumbBase64 = `data:image/jpeg;base64,${thumbResult.toString("base64")}`;

        return Response.json({
          success: true,
          id,
          filename: file.name,
          size: buffer.length,
          thumbnail: thumbBase64,
        });
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // POST /api/process-upload — process an uploaded file for a slot
    if (path === "/api/process-upload" && req.method === "POST") {
      try {
        const body = await req.json();
        const { uploadId, slotId, type } = body as {
          uploadId: string;
          slotId: string;
          type: "project" | "gallery";
        };

        const buffer = uploadCache.get(uploadId);
        if (!buffer) {
          return Response.json({ error: "Upload not found (expired?)" }, { status: 404 });
        }

        const rawSize = buffer.length;
        const optimized = await optimizeImage(buffer, type);
        const filename = `${slotId}.jpg`;
        const localPath = await saveLocal(slotId, optimized.data, optimized.webpData, type);

        // Clean up cache
        uploadCache.delete(uploadId);

        return Response.json({
          success: true,
          filename,
          localPath,
          rawSize,
          optimizedSize: optimized.size,
          width: optimized.width,
          height: optimized.height,
          savings: Math.round((1 - optimized.size / rawSize) * 100),
        });
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // POST /api/process — process a single slot (local save)
    if (path === "/api/process" && req.method === "POST") {
      try {
        const body = await req.json();
        const { gdriveId, slotId, type } = body as {
          gdriveId: string;
          slotId: string;
          type: "project" | "gallery";
        };

        if (!gdriveId || !slotId || !type) {
          return Response.json(
            { error: "Missing gdriveId, slotId, or type" },
            { status: 400 }
          );
        }

        const raw = await downloadGDriveImage(gdriveId);
        const rawSize = raw.length;
        const optimized = await optimizeImage(raw, type);
        const filename = `${slotId}.jpg`;
        const localPath = await saveLocal(slotId, optimized.data, optimized.webpData, type);

        return Response.json({
          success: true,
          filename,
          localPath,
          rawSize,
          optimizedSize: optimized.size,
          width: optimized.width,
          height: optimized.height,
          savings: Math.round((1 - optimized.size / rawSize) * 100),
        });
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // POST /api/process-all — batch process all assigned slots (local save)
    if (path === "/api/process-all" && req.method === "POST") {
      try {
        const body = await req.json();
        const { items } = body as {
          items: Array<{
            gdriveId: string;
            slotId: string;
            type: "project" | "gallery";
          }>;
        };

        if (!items || items.length === 0) {
          return Response.json({ error: "No items to process" }, { status: 400 });
        }

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            let completed = 0;
            const results: any[] = [];

            for (const item of items) {
              try {
                const raw = await downloadGDriveImage(item.gdriveId);
                const rawSize = raw.length;
                const optimized = await optimizeImage(raw, item.type);
                const filename = `${item.slotId}.jpg`;
                const localPath = await saveLocal(item.slotId, optimized.data, optimized.webpData, item.type);

                completed++;
                const result = {
                  success: true,
                  slotId: item.slotId,
                  filename,
                  localPath,
                  rawSize,
                  optimizedSize: optimized.size,
                  savings: Math.round((1 - optimized.size / rawSize) * 100),
                };
                results.push(result);

                controller.enqueue(
                  encoder.encode(
                    JSON.stringify({
                      type: "progress",
                      completed,
                      total: items.length,
                      current: result,
                    }) + "\n"
                  )
                );
              } catch (e: any) {
                completed++;
                const errorResult = {
                  success: false,
                  slotId: item.slotId,
                  error: e.message,
                };
                results.push(errorResult);

                controller.enqueue(
                  encoder.encode(
                    JSON.stringify({
                      type: "progress",
                      completed,
                      total: items.length,
                      current: errorResult,
                    }) + "\n"
                  )
                );
              }
            }

            controller.enqueue(
              encoder.encode(
                JSON.stringify({ type: "done", results }) + "\n"
              )
            );
            controller.close();
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        });
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // POST /api/save-config
    if (path === "/api/save-config" && req.method === "POST") {
      try {
        const config = await req.json();
        backupAndWriteConfig(config);
        return Response.json({ success: true, path: CONFIG_PATH });
      } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
      }
    }

    // --- Static Files ---
    if (path === "/" || path === "/index.html") {
      return new Response(Bun.file(join(STATIC_DIR, "index.html")));
    }

    const ext = path.substring(path.lastIndexOf("."));
    if (MIME[ext]) {
      const filePath = join(STATIC_DIR, path);
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file, {
          headers: { "Content-Type": MIME[ext] },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`FPC Image Picker running at http://localhost:${PORT}`);
console.log(`Mode: LOCAL — images save to assets/images/`);
