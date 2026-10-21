import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { styles } from './FreshnessIndicator.styles';

export type FreshnessIndicatorProps = {
  asOf?: string;
  isFetching?: boolean;
  onRefresh: () => void;
};

export function FreshnessIndicator({ asOf, isFetching, onRefresh }: FreshnessIndicatorProps) {
  const theme = useTheme();
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    if (!asOf) return;
    const calculate = () => {
      const diff = Math.max(0, Math.floor((Date.now() - new Date(asOf).getTime()) / 1000));
      setSecondsAgo(diff);
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [asOf]);

  const timeLabel = !asOf
    ? 'Checking status...'
    : isFetching
      ? 'Updating snapshot...'
      : secondsAgo < 3
        ? 'Updated just now'
        : `Updated ${secondsAgo}s ago (15s cycle)`;

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.leftGroup}>
        <View style={styles.statusDot} />
        <ThemedText type="small" themeColor="textSecondary">
          {timeLabel}
        </ThemedText>
      </View>

      <Pressable
        onPress={onRefresh}
        disabled={isFetching}
        style={({ pressed }) => [styles.refreshButton, pressed && styles.pressed]}>
        {isFetching ? (
          <ActivityIndicator size="small" color={theme.text} />
        ) : (
          <SymbolView
            tintColor={theme.text}
            name={{ ios: 'arrow.clockwise', android: 'refresh', web: 'refresh' }}
            size={14}
          />
        )}
        <ThemedText type="smallBold">
          {isFetching ? 'Refreshing' : 'Refresh'}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
