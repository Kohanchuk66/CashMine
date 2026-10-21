import { memo } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import type { BalanceItem } from '@/shared/api';
import { styles } from './BalanceItemCard.styles';

export type BalanceItemCardProps = {
  item: BalanceItem;
};

function formatUsd(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

export const BalanceItemCard = memo(function BalanceItemCard({ item }: BalanceItemCardProps) {
  const theme = useTheme();

  const price = parseFloat(item.usdPrice) || 0;
  const avail = parseFloat(item.available) || 0;
  const pend = parseFloat(item.pending) || 0;
  const claim = parseFloat(item.claiming) || 0;
  const totalQuantity = avail + pend + claim;
  const totalUsdValue = totalQuantity * price;

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.assetIdentity}>
          <ThemedView type="backgroundSelected" style={styles.assetBadge}>
            <ThemedText type="smallBold">{item.asset}</ThemedText>
          </ThemedView>
          <ThemedText type="small" themeColor="textSecondary">
            {formatUsd(price)} / unit
          </ThemedText>
        </View>

        <View style={styles.valuesColumn}>
          <ThemedText type="subtitle" style={{ fontSize: 20, lineHeight: 24 }}>
            {formatUsd(totalUsdValue)}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {totalQuantity.toFixed(Math.min(item.decimals, 6))} {item.asset}
          </ThemedText>
        </View>
      </View>

      <View style={[styles.breakdownRow, { borderTopColor: theme.backgroundSelected }]}>
        <View style={styles.fieldBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Available
          </ThemedText>
          <ThemedText type="smallBold" style={styles.availableColor}>
            {avail.toFixed(Math.min(item.decimals, 4))}
          </ThemedText>
        </View>

        <View style={styles.fieldBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Pending
          </ThemedText>
          <ThemedText type="smallBold" style={styles.pendingColor}>
            {pend.toFixed(Math.min(item.decimals, 4))}
          </ThemedText>
        </View>

        <View style={styles.fieldBlock}>
          <ThemedText type="small" themeColor="textSecondary">
            Claiming
          </ThemedText>
          <ThemedText type="smallBold" style={styles.claimingColor}>
            {claim.toFixed(Math.min(item.decimals, 4))}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
});
