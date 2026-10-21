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
