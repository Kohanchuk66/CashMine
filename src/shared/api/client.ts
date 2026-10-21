import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import { API_CONFIG } from './config';
import { tokenStorage, notifyUnauthorized } from './token';
import { ApiError, type ApiErrorResponse } from './types';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = config.url || '';
    const isV1 = url.startsWith('/v1') || url.startsWith('v1') || url.includes('/v1');
    if (isV1) {
      const token = tokenStorage.getToken();
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const statusCode = error.response?.status;
    const errorData = error.response?.data?.error;
    const message =
      errorData?.message ||
      error.message ||
      'An unexpected network error occurred';

    if (statusCode === 401) {
      tokenStorage.removeToken();
      notifyUnauthorized();
    }

    const normalizedError = new ApiError({
      message,
      code: errorData?.code,
      field: errorData?.field,
      statusCode,
      raw: error,
    });

    return Promise.reject(normalizedError);
  }
);
