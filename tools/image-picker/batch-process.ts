import sharp from "sharp";
import { writeFileSync, readFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const CONFIG_PATH = join(import.meta.dir, "../../assets/data/gallery-config.json");
const PROJECTS_DIR = join(import.meta.dir, "../../assets/images/projects");
const PLACEHOLDER_DIR = join(import.meta.dir, "../../assets/images/placeholder");

mkdirSync(PROJECTS_DIR, { recursive: true });
mkdirSync(PLACEHOLDER_DIR, { recursive: true });

// All 28 GDrive IDs from the public folder
const ALL_GDRIVE_IDS = [
  "1-m2kRxIZFetHDvQ9sAZ_3xmfYGcykCTu",
  "10BUE00Njka1En6A8YhuLZE4KfnWGNSE3",
  "115yLrAwX2KZ3GL764V3PQNLYEr1e9y1D",
  "165wUrhZPgJi0XLJ_ZXx56BL4_Y5R8yWE",
  "18hzumNAm-Qa3IsvJYE3nkjaHEeiNQxpa",
  "18lQ1Ne0pmgY7Ft-7zqZGg22ct9-irk16",
  "1Bh8-ostOzxSPVq-DZ9mZS2UD-3sF9IDN",
  "1CK6-GU2H3urWmYD7xTVzK5Ql73XLQDpw",
  "1F2InCX56GTTn0gtvSCrPfs8yjLj3dtsK",
  "1FEVczs8OFJW3qiArQ1bjnphC76pLNRkB",
  "1HXDw5izzjiqZxcuh5pLU5Y-P1sop0ZL_",
  "1PSosulcjAyAIIxGgbSmZw13aawcQbMwF",
  "1PuuBxpGPBRorr9B-YkfsajfIvm1eBT9B",
  "1URkraaNQ6Gx57iFBJdYWswOB0xSBaWFs",
  "1UV67EW7xC1HokCyAP7z0SpNm7YIDOUrM",
  "1V9wU5eXTu4Yu4QDKcU8sRLNIUWNE6A3T",
  "1XBG09ukSLwcdg_liaTiD6KBirgxGKcZI",
  "1YWOMJX512fNGHb1fsrB1tQpEx3u2Jfgt",
  "1_5T4Ku3QsVyi2Y39a0LSLYKbC92zW51m",
  "1cyJOpH3yBtaANZ6DNHNW6Zgdofq755tK",
  "1dM4MaV9rA363SGZZHV3UPI07dxI--Y-4",
  "1gN9FoS651bLqO8Lk0GbSalGvBFtcrAT6",
  "1ggQpCE07uJVBVLWAjQVpaVVI0OgblHZP",
  "1gzblPlFopTyHqlb9LprLil_AgJN0trmS",
  "1oDgsOaX7zuB4mnP6pnQkU_km-nEgW_kT",
  "1qAxCNbKjbAwB8SHiCxebh5dUE9omhcoH",
  "1qq8xB7nZbXZ4gq5RRbtkCMjUEy8JWZXj",
  "1y8RHyRfIJXQYvjF-ZejSju-PpNCL7bYQ",
];

// Existing config mapping (gdriveId -> slotId)
const EXISTING_MAP: Record<string, { slotId: string; type: "project" | "gallery" }> = {
  "1F2InCX56GTTn0gtvSCrPfs8yjLj3dtsK": { slotId: "project-1", type: "project" },
  "1ggQpCE07uJVBVLWAjQVpaVVI0OgblHZP": { slotId: "project-2", type: "project" },
  "1y8RHyRfIJXQYvjF-ZejSju-PpNCL7bYQ": { slotId: "project-3", type: "project" },
  "1UV67EW7xC1HokCyAP7z0SpNm7YIDOUrM": { slotId: "project-4", type: "project" },
  "1Bh8-ostOzxSPVq-DZ9mZS2UD-3sF9IDN": { slotId: "project-5", type: "project" },
  "1V9wU5eXTu4Yu4QDKcU8sRLNIUWNE6A3T": { slotId: "project-6", type: "project" },
  "1HXDw5izzjiqZxcuh5pLU5Y-P1sop0ZL_": { slotId: "gallery-1", type: "gallery" },
  "1qq8xB7nZbXZ4gq5RRbtkCMjUEy8JWZXj": { slotId: "gallery-2", type: "gallery" },
  "1FEVczs8OFJW3qiArQ1bjnphC76pLNRkB": { slotId: "gallery-3", type: "gallery" },
  "1cyJOpH3yBtaANZ6DNHNW6Zgdofq755tK": { slotId: "gallery-4", type: "gallery" },
  "1CK6-GU2H3urWmYD7xTVzK5Ql73XLQDpw": { slotId: "gallery-5", type: "gallery" },
  "165wUrhZPgJi0XLJ_ZXx56BL4_Y5R8yWE": { slotId: "gallery-6", type: "gallery" },
  "1YWOMJX512fNGHb1fsrB1tQpEx3u2Jfgt": { slotId: "gallery-7", type: "gallery" },
  "18lQ1Ne0pmgY7Ft-7zqZGg22ct9-irk16": { slotId: "gallery-8", type: "gallery" },
  "1dM4MaV9rA363SGZZHV3UPI07dxI--Y-4": { slotId: "gallery-9", type: "gallery" },
  "1gN9FoS651bLqO8Lk0GbSalGvBFtcrAT6": { slotId: "gallery-10", type: "gallery" },
};

async function downloadGDriveImage(gdriveId: string): Promise<Buffer> {
  // Try direct download first
  const url = `https://drive.google.com/uc?export=download&id=${gdriveId}`;
  const res = await fetch(url, { redirect: "follow" });

  if (res.ok) {
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return Buffer.from(await res.arrayBuffer());
    }
  }

  // Fallback to high-res thumbnail
  const thumbUrl = `https://drive.google.com/thumbnail?id=${gdriveId}&sz=w2000`;
  const thumbRes = await fetch(thumbUrl, { redirect: "follow" });
  if (!thumbRes.ok) {
    throw new Error(`Failed to download ${gdriveId}: ${thumbRes.status}`);
  }
  return Buffer.from(await thumbRes.arrayBuffer());
}

async function optimizeImage(
  buffer: Buffer,
  type: "project" | "gallery"
): Promise<{ jpgData: Buffer; webpData: Buffer; width: number; height: number; jpgSize: number }> {
  const width = type === "project" ? 800 : 1200;
  const height = type === "project" ? 600 : 900;

  const pipeline = sharp(buffer).rotate().resize(width, height, { fit: "cover", position: "center" });

  const jpgResult = await pipeline
    .clone()
    .jpeg({ quality: 80, progressive: true })
    .toBuffer({ resolveWithObject: true });

  const webpResult = await pipeline.clone().webp({ quality: 75 }).toBuffer();

  return {
    jpgData: jpgResult.data,
    webpData: webpResult,
    width: jpgResult.info.width,
    height: jpgResult.info.height,
    jpgSize: jpgResult.info.size,
  };
}

function saveImage(slotId: string, jpgData: Buffer, webpData: Buffer, type: "project" | "gallery") {
  const jpgFilename = `${slotId}.jpg`;
  const webpFilename = `${slotId}.webp`;

  if (type === "project") {
    // Projects save to both placeholder/ and projects/
    writeFileSync(join(PLACEHOLDER_DIR, jpgFilename), jpgData);
    writeFileSync(join(PLACEHOLDER_DIR, webpFilename), webpData);
    writeFileSync(join(PROJECTS_DIR, jpgFilename), jpgData);
    writeFileSync(join(PROJECTS_DIR, webpFilename), webpData);
  } else {
    // Gallery saves to projects/
    writeFileSync(join(PROJECTS_DIR, jpgFilename), jpgData);
    writeFileSync(join(PROJECTS_DIR, webpFilename), webpData);
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// --- Main ---
async function main() {
  console.log("=== FPC Batch Image Processor ===");
  console.log(`Processing ${ALL_GDRIVE_IDS.length} photos from Google Drive\n`);

  // Read existing config
  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));

  // Backup config
  if (existsSync(CONFIG_PATH)) {
    copyFileSync(CONFIG_PATH, CONFIG_PATH + ".bak");
    console.log("Config backed up.\n");
  }

  // Track new gallery items (IDs not in existing map)
  let nextGalleryIndex = 11; // gallery-11, gallery-12, etc.
  const newGalleryItems: any[] = [];

  let processed = 0;
  let failed = 0;
  let totalRawBytes = 0;
  let totalOptBytes = 0;

  for (const gdriveId of ALL_GDRIVE_IDS) {
    const existing = EXISTING_MAP[gdriveId];
    const slotId = existing?.slotId ?? `gallery-${nextGalleryIndex}`;
    const type = existing?.type ?? "gallery";

    if (!existing) {
      nextGalleryIndex++;
    }

    process.stdout.write(`[${processed + failed + 1}/${ALL_GDRIVE_IDS.length}] ${slotId} ... `);

    try {
      const raw = await downloadGDriveImage(gdriveId);
      const rawSize = raw.length;
      totalRawBytes += rawSize;

      const optimized = await optimizeImage(raw, type);
      totalOptBytes += optimized.jpgSize;

      saveImage(slotId, optimized.jpgData, optimized.webpData, type);

      const savings = Math.round((1 - optimized.jpgSize / rawSize) * 100);
      console.log(
        `OK  ${optimized.width}x${optimized.height}  ${formatBytes(rawSize)} → ${formatBytes(optimized.jpgSize)} (${savings}% saved)`
      );

      // Add new gallery items to config
      if (!existing) {
        newGalleryItems.push({
          id: slotId,
          title: `Construction Photo ${nextGalleryIndex - 1}`,
          category: "general",
          localImage: `${slotId}.jpg`,
          gdriveId: gdriveId,
        });
      }

      processed++;
    } catch (e: any) {
      console.log(`FAIL  ${e.message}`);
      failed++;
    }
  }

  // Add new gallery items to config
  if (newGalleryItems.length > 0) {
    config.gallery.push(...newGalleryItems);
    console.log(`\nAdded ${newGalleryItems.length} new gallery items to config.`);
  }

  // Update mode to local
  config.mode = "local";

  // Save updated config
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
  console.log(`Config saved to ${CONFIG_PATH}`);

  console.log("\n=== Summary ===");
  console.log(`Processed: ${processed}/${ALL_GDRIVE_IDS.length}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total raw: ${formatBytes(totalRawBytes)}`);
  console.log(`Total optimized: ${formatBytes(totalOptBytes)}`);
  console.log(`Overall savings: ${Math.round((1 - totalOptBytes / totalRawBytes) * 100)}%`);
  console.log("\nDone! Images saved to assets/images/projects/ and assets/images/placeholder/");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
