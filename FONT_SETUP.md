# Font Embedding Setup

## Steps to add a custom font:

### 1. Download a font

Get a `.woff2` font file (recommended for smaller size):

- **Inter**: https://fonts.google.com/specimen/Inter
- **Roboto**: https://fonts.google.com/specimen/Roboto
- **Open Sans**: https://fonts.google.com/specimen/Open+Sans

Save it to: `public/fonts/your-font.woff2`

### 2. Convert to Base64

Run this command in the root directory:

```bash
node scripts/fontToBase64.js public/fonts/your-font.woff2
```

### 3. Copy the base64 string

Copy the output and replace the empty `fontBase64` variable in:
`lib/ImageProcessor/overlay/generateOverlaySvg.ts`

```typescript
const fontBase64 = "YOUR_BASE64_STRING_HERE";
```

### 4. Test

Deploy and test - the font should now render consistently across all environments!

## Alternative: Quick test font

For immediate testing, you can use this minimal base64 font (very basic):

```
// Add this to generateOverlaySvg.ts for quick testing
const fontBase64 = ""; // Keep empty to use fallback fonts initially
```

The fallback will use: `'Arial', 'Helvetica', sans-serif` which should work better than the previous attempts.
