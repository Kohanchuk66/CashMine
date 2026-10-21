import type { GetActivityParams } from '../types';

export const queryKeys = {
  all: ['api'] as const,
  balances: () => [...queryKeys.all, 'balances'] as const,
  activity: (params?: GetActivityParams) => [...queryKeys.all, 'activity', params] as const,
  claimOptions: (asset: string) => [...queryKeys.all, 'claim-options', asset] as const,
  claims: () => [...queryKeys.all, 'claims'] as const,
  claim: (id: string) => [...queryKeys.all, 'claims', id] as const,
};
