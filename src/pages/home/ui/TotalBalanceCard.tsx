import { memo } from 'react';
import { View } from 'react-native';

import { calculateBalanceTotals, formatCurrency } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import type { BalanceItem } from '@/shared/api';
import { styles } from './TotalBalanceCard.styles';

export type TotalBalanceCardProps = {
  items: BalanceItem[];
};

export const TotalBalanceCard = memo(function TotalBalanceCard({ items }: TotalBalanceCardProps) {
  const { totalUsd, availableUsd, pendingUsd, claimingUsd } = calculateBalanceTotals(items);

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.headerRow}>
        <ThemedText type="small" themeColor="textSecondary">
          Total Estimated Value
        </ThemedText>
      </View>

      <ThemedText style={styles.totalAmount}>{formatCurrency(totalUsd)}</ThemedText>

      <View style={styles.breakdownGrid}>
        <ThemedView type="backgroundSelected" style={styles.statBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Available
          </ThemedText>
          <ThemedText type="smallBold" style={styles.accentAvailable}>
            {formatCurrency(availableUsd)}
          </ThemedText>
        </ThemedView>

        <ThemedView type="backgroundSelected" style={styles.statBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Pending
          </ThemedText>
          <ThemedText type="smallBold" style={styles.accentPending}>
            {formatCurrency(pendingUsd)}
          </ThemedText>
        </ThemedView>

        <ThemedView type="backgroundSelected" style={styles.statBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Claiming
          </ThemedText>
          <ThemedText type="smallBold" style={styles.accentClaiming}>
            {formatCurrency(claimingUsd)}
          </ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
});
