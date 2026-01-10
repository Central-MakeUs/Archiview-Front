import type { RequestHandler } from 'msw';

import { exampleHandlers } from './handlers/example';

export const handlers: RequestHandler[] = [...exampleHandlers];
