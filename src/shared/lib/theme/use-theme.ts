/**
 * Theme hook returning colors for current scheme
 */
import { Colors } from '@/shared/config';
import { useColorScheme } from './use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return Colors[theme];
}
