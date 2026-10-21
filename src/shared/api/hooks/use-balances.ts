import { useApiQuery } from './use-api-query';
import { queryKeys } from './query-keys';
import { getBalances } from '../requests/balances';
import { tokenStorage } from '../token';
import type { BalancesResponse } from '../types';

export function useBalances(options?: { refetchInterval?: number | false; enabled?: boolean }) {
  const hasToken = Boolean(tokenStorage.getToken());

  return useApiQuery<BalancesResponse>({
    queryKey: queryKeys.balances(),
    queryFn: getBalances,
    refetchInterval: options?.refetchInterval ?? 15000,
    enabled: options?.enabled ?? hasToken,
  });
}
