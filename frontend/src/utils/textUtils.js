export function normalizeTextForDisplay(text) {
  if (!text) return '';
  // collapse multiple blank lines into max two
  return text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
