export function truncateWithDots(text, maxLength = 60) {
  if (typeof text !== "string") return "";
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "....";
  }
  return text;
}
