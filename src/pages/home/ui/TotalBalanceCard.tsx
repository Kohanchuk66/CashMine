import { memo } from 'react';
import { View } from 'react-native';

import { ThemedText, ThemedView } from '@/shared/ui';
import type { BalanceItem } from '@/shared/api';
import { styles } from './TotalBalanceCard.styles';

export type TotalBalanceCardProps = {
  items: BalanceItem[];
};

function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

export const TotalBalanceCard = memo(function TotalBalanceCard({ items }: TotalBalanceCardProps) {
  let totalUsd = 0;
  let availableUsd = 0;
  let pendingUsd = 0;
  let claimingUsd = 0;

  for (const item of items) {
    const price = parseFloat(item.usdPrice) || 0;
    const avail = parseFloat(item.available) || 0;
    const pend = parseFloat(item.pending) || 0;
    const claim = parseFloat(item.claiming) || 0;

    availableUsd += avail * price;
    pendingUsd += pend * price;
    claimingUsd += claim * price;
    totalUsd += (avail + pend + claim) * price;
  }

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
