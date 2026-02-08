// Usage: node save-one-image.mjs <name> <base64data>
import fs from 'fs';
const name = process.argv[2];
const b64 = process.argv[3];
fs.writeFileSync(`photos/${name}`, Buffer.from(b64, 'base64'));
console.log(`Saved ${name}: ${fs.statSync(`photos/${name}`).size} bytes`);
