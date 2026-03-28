import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './src/shared/lib/i18n/routing';

const handleI18nRouting: ReturnType<typeof createMiddleware> =
  createMiddleware(routing);

export function proxy(request: NextRequest): ReturnType<
  ReturnType<typeof createMiddleware>
> {
  return handleI18nRouting(request);
}

export const config: { matcher: string[] } = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
