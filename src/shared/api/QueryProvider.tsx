import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

import { queryClient as defaultQueryClient } from './query-client';

export type QueryProviderProps = PropsWithChildren<{
  client?: typeof defaultQueryClient;
}>;

export function QueryProvider({ children, client = defaultQueryClient }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
