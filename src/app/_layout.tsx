import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { QueryProvider } from '@/shared/api';
import { AnimatedSplashOverlay } from '@/features/splash-overlay';
import { TokenModal } from '@/features/auth-token';
import { AppTabs } from '@/widgets/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <QueryProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppTabs />
        <TokenModal />
      </ThemeProvider>
    </QueryProvider>
  );
}
