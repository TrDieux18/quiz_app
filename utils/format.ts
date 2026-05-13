/** Format seconds into a human-readable duration string (e.g. "15m", "1h 30m") */
export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "No limit";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 && h === 0) parts.push(`${s}s`);
  return parts.join(" ") || "0m";
}

/** Format a unix timestamp string to a readable Vietnamese locale date */
export function formatDate(timestamp: string): string {
  const ts = Number(timestamp);
  if (ts === 0) return "Open";
  return new Date(ts * 1000).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Strip HTML tags from a string */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}
