import type { AxiosRequestConfig } from 'axios';

import { apiClient } from '../client';

export async function get<TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const response = await apiClient.get<TResponse>(url, config);
  return response.data;
}

export async function post<TResponse = unknown, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const response = await apiClient.post<TResponse>(url, data, config);
  return response.data;
}

export async function put<TResponse = unknown, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const response = await apiClient.put<TResponse>(url, data, config);
  return response.data;
}

export async function patch<TResponse = unknown, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const response = await apiClient.patch<TResponse>(url, data, config);
  return response.data;
}

export async function del<TResponse = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const response = await apiClient.delete<TResponse>(url, config);
  return response.data;
}
