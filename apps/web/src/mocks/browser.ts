import { setupWorker, type SetupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker: SetupWorker = setupWorker(...handlers);
