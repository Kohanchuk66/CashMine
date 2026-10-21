import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  field?: string;
}

export interface ApiErrorResponse {
  error: ApiErrorDetail;
}

export interface ApiErrorPayload {
  message: string;
  code?: string;
  field?: string;
  statusCode?: number;
  raw?: unknown;
}

export class ApiError extends Error {
  code?: string;
  field?: string;
  statusCode?: number;
  raw?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = 'ApiError';
    this.code = payload.code;
    this.field = payload.field;
    this.statusCode = payload.statusCode;
    this.raw = payload.raw;
  }
}

export type RequestConfig = AxiosRequestConfig;
export type ResponseData<T> = AxiosResponse<T>['data'];

export interface BalanceItem {
  asset: string;
  decimals: number;
  available: string;
  pending: string;
  claiming: string;
  usdPrice: string;
}

export interface BalancesResponse {
  asOf: string;
  items: BalanceItem[];
}

export type ActivityType = 'accrual' | 'reversal' | 'claim';
export type ActivityStatus = 'pending' | 'confirmed' | 'completed' | 'failed';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  asset: string;
  amount: string;
  status: ActivityStatus;
  exchange: string | null;
  createdAt: string;
  relatedId: string | null;
}

export interface ActivityResponse {
  items: ActivityItem[];
  nextCursor: string | null;
}

export interface GetActivityParams {
  limit?: number;
  cursor?: string | null;
}

export interface ClaimDestination {
  id: string;
  label: string;
}

export interface ClaimOptionsResponse {
  asset: string;
  minAmount: string;
  fee: string;
  destinations: ClaimDestination[];
}

export interface GetClaimOptionsParams {
  asset: string;
}

export type ClaimStatus = 'pending' | 'completed' | 'failed';

export interface CreateClaimPayload {
  asset: string;
  amount: string;
  destinationId: string;
}

export interface CreateClaimParams extends CreateClaimPayload {
  idempotencyKey?: string;
}

export interface Claim {
  id: string;
  asset: string;
  amount: string;
  fee: string;
  receiveAmount: string;
  destinationId: string;
  status: ClaimStatus;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
}
