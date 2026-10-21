import { useQueryClient } from '@tanstack/react-query';

import { useApiMutation } from './use-api-mutation';
import { useApiQuery } from './use-api-query';
import { queryKeys } from './query-keys';
import { createClaim, getClaim } from '../requests/claims';
import type { Claim, CreateClaimParams } from '../types';

export function useCreateClaim() {
  const queryClient = useQueryClient();

  return useApiMutation<Claim, CreateClaimParams>({
    mutationFn: createClaim,
    onSuccess: (newClaim) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.balances() });
      queryClient.invalidateQueries({ queryKey: queryKeys.activity() });
      queryClient.setQueryData(queryKeys.claim(newClaim.id), newClaim);
    },
  });
}

export function useClaim(id: string, options?: { enabled?: boolean }) {
  return useApiQuery<Claim>({
    queryKey: queryKeys.claim(id),
    queryFn: () => getClaim(id),
    enabled: options?.enabled ?? Boolean(id),
    refetchInterval: (query) => {
      const data = query.state.data as Claim | undefined;
      return data?.status === 'pending' ? 3000 : false;
    },
  });
}
