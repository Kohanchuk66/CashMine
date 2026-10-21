import { useApiQuery } from './use-api-query';
import { queryKeys } from './query-keys';
import { getClaimOptions } from '../requests/claims';
import type { ClaimOptionsResponse } from '../types';

export function useClaimOptions(asset: string, options?: { enabled?: boolean }) {
  return useApiQuery<ClaimOptionsResponse>({
    queryKey: queryKeys.claimOptions(asset),
    queryFn: () => getClaimOptions({ asset }),
    enabled: options?.enabled ?? Boolean(asset),
  });
}
