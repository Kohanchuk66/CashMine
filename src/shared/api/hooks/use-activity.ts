import { useInfiniteQuery } from '@tanstack/react-query';

import { useApiQuery } from './use-api-query';
import { queryKeys } from './query-keys';
import { getActivity } from '../requests/activity';
import type { ActivityResponse, ApiError, GetActivityParams } from '../types';

export function useActivity(params?: GetActivityParams, options?: { enabled?: boolean }) {
  return useApiQuery<ActivityResponse>({
    queryKey: queryKeys.activity(params),
    queryFn: () => getActivity(params),
    enabled: options?.enabled,
  });
}

export function useInfiniteActivity(limit = 20) {
  return useInfiniteQuery<ActivityResponse, ApiError>({
    queryKey: queryKeys.activity({ limit }),
    queryFn: ({ pageParam }) => getActivity({ limit, cursor: (pageParam as string | undefined) ?? null }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
