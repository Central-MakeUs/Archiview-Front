const INSTAGRAM_URL_PREFIX = 'https://www.instagram.com/';

export function ValidateInstagramUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed.startsWith(INSTAGRAM_URL_PREFIX) && trimmed.length > INSTAGRAM_URL_PREFIX.length;
}
