import {
  useQuery,
  type DefinedInitialDataOptions,
  type UndefinedInitialDataOptions,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

import type { ApiError } from '../types';

export function useApiQuery<
  TQueryFnData = unknown,
  TError = ApiError,
  TData = TQueryFnData,
>(
  options:
    | UndefinedInitialDataOptions<TQueryFnData, TError, TData>
    | DefinedInitialDataOptions<TQueryFnData, TError, TData>
    | UseQueryOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> {
  return useQuery(options as UseQueryOptions<TQueryFnData, TError, TData>);
}
