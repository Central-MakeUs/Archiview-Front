import type { QueryClient, QueryKey } from '@tanstack/react-query';

import { archiverKeys } from './keys/archiver';

const archiverQueryRoots = Object.keys(archiverKeys) as string[];

export const invalidateAllArchiverQueries = async (queryClient: QueryClient): Promise<void> => {
  await Promise.all(
    archiverQueryRoots.map((root) =>
      queryClient.invalidateQueries({ queryKey: [root] as QueryKey }),
    ),
  );
};
