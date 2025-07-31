export function sanitizeQuote(raw: string): string {
  return raw
    .replace(/[“”]/g, '"') // Replace smart double quotes with regular ones
    .replace(/[‘’]/g, "'") // Replace smart single quotes with regular ones
    .replace(/—/g, " ") // Replace em-dash with regular space
    .replace(/[^\S\r\n]{2,}/g, " ") // Collapse multiple spaces/tabs
    .replace(/\r?\n|\r/g, " ") // Remove newlines
    .replace(/^\W+|\W+$/g, "") // Trim leading/trailing non-word chars (like punctuation)
    .replace(/\s{2,}/g, " ") // Collapse multiple spaces again
    .trim(); // Final trim
}
