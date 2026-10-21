import Constants from 'expo-constants';

const resolvedApiUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ||
  'https://api.example.com';

export const API_CONFIG = {
  baseURL: resolvedApiUrl,
} as const;

export const API_BASE_URL = API_CONFIG.baseURL;
