import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';
import { HintRow, ThemedText, ThemedView } from '@/shared/ui';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export function DevHints() {
  return (
    <ThemedView type="backgroundElement" style={styles.stepContainer}>
      <HintRow
        title="Try editing"
        hint={<ThemedText type="code">src/pages/home/ui/HomeScreen.tsx</ThemedText>}
      />
      <HintRow title="Dev tools" hint={getDevMenuHint()} />
      <HintRow
        title="Fresh start"
        hint={<ThemedText type="code">npm run reset-project</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
