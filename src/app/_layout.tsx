import { DarkTheme, DefaultTheme, ThemeProvider, router, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { QueryProvider } from '@/shared/api';
import '@/shared/lib/firebase';
import { AnimatedSplashOverlay } from '@/features/splash-overlay';
import { TokenModal, useToken } from '@/features/auth-token';
import { TokenScreen } from '@/pages/token';
import { AppTabs } from '@/widgets/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { token, isReady } = useToken();
  const pathname = usePathname();

  useEffect(() => {
    if (!isReady) return;
    if (!token && pathname !== '/token') {
      router.replace('/token');
    } else if (token && pathname === '/token') {
      router.replace('/');
    }
  }, [token, isReady, pathname]);

  return (
    <QueryProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        {!isReady ? null : !token ? (
          <TokenScreen />
        ) : (
          <AppTabs />
        )}
        <TokenModal />
      </ThemeProvider>
    </QueryProvider>
  );
}
