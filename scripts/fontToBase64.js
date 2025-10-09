/* eslint-disable @typescript-eslint/no-require-imports */
// Script to convert a font file to base64 for embedding
// Usage: node scripts/fontToBase64.js path/to/font.woff2

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
    console.log('Usage: node fontToBase64.js <path-to-font-file>');
    process.exit(1);
}

const fontPath = process.argv[2];

try {
    const fontBuffer = fs.readFileSync(fontPath);
    const base64 = fontBuffer.toString('base64');

    console.log('\n=== Font Base64 (copy this into generateOverlaySvg.ts) ===');
    console.log(base64);
    console.log('\n=== Usage in code ===');
    console.log(`const fontBase64 = "${base64}";`);

    // Also save to a file
    const outputPath = path.join(__dirname, '../public/fonts/embedded-font.txt');
    fs.writeFileSync(outputPath, base64);
    console.log(`\nBase64 saved to: ${outputPath}`);

} catch (error) {
    console.error('Error reading font file:', error.message);
}