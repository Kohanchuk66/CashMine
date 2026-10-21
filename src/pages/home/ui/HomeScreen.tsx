import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon, ThemedText, ThemedView } from '@/shared/ui';
import { DevHints } from '@/widgets/dev-hints';
import { WebBadge } from '@/entities/expo-badge';
import { ChangeTokenButton } from '@/features/auth-token';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ChangeTokenButton label="Change API Token" />

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <DevHints />

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}
