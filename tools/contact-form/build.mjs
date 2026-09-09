import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { minify } from 'terser';
const source = new URL('../../assets/js/main.js', import.meta.url);
const output = new URL('../../assets/js/main.min.js', import.meta.url);
const { code } = await minify(await readFile(source, 'utf8'), { compress: true, mangle: true, format: { comments: false } });
const asset = code + '\n';
if (process.argv.includes('--check')) {
  assert.equal(await readFile(output, 'utf8'), asset, 'main.min.js must be regenerated from main.js');
  console.log('Source/minified asset parity verified (terser 5.44.0).');
} else {
  await writeFile(output, asset);
  console.log('Generated assets/js/main.min.js (terser 5.44.0).');
}
