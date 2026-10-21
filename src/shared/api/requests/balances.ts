import { get } from './base';
import type { BalancesResponse } from '../types';

export function getBalances(): Promise<BalancesResponse> {
  return get<BalancesResponse>('/v1/balances');
}
