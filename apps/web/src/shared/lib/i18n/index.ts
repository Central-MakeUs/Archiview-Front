import { routing } from './routing';

export { routing };
export type AppLocale = (typeof routing.locales)[number];

export { Link, redirect, usePathname, useRouter, getPathname } from './navigation';
