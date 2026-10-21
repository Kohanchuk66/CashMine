import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  return { width, height, isMobile };
}
