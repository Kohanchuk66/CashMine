import { get } from './base';
import type { ActivityResponse, GetActivityParams } from '../types';

export function getActivity(params?: GetActivityParams): Promise<ActivityResponse> {
  return get<ActivityResponse>('/v1/activity', { params });
}
