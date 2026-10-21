import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '700',
  },
  breakdownGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  statBlock: {
    flex: 1,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    gap: Spacing.half,
  },
  accentAvailable: {
    color: '#10B981',
  },
  accentPending: {
    color: '#F59E0B',
  },
  accentClaiming: {
    color: '#3B82F6',
  },
});
