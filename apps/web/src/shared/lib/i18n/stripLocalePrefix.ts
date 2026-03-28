import { routing } from './routing';

/**
 * `/ko/archiver/home` → `/archiver/home` — for matchers that use locale-free paths (e.g. SSGOI).
 */
export function stripLocalePrefix(pathname: string): string {
  const first = pathname.split('/').filter(Boolean)[0];
  if (first && routing.locales.includes(first as (typeof routing.locales)[number])) {
    const rest = pathname.slice(`/${first}`.length) || '/';
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}

/** First path segment if it is a configured locale; otherwise default locale (for hard redirects). */
export function getLocalePrefixFromPathname(pathname: string): string {
  const first = pathname.split('/').filter(Boolean)[0];
  if (first && routing.locales.includes(first as (typeof routing.locales)[number])) {
    return `/${first}`;
  }
  return `/${routing.defaultLocale}`;
}
