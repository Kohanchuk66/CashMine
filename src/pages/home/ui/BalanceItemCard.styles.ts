import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  cardMobile: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  assetIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexShrink: 1,
  },
  assetBadge: {
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
  },
  valuesColumn: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    flexWrap: 'wrap',
  },
  fieldBlock: {
    flex: 1,
    minWidth: 80,
    gap: Spacing.half,
  },
  availableColor: {
    color: '#10B981',
  },
  pendingColor: {
    color: '#F59E0B',
  },
  claimingColor: {
    color: '#3B82F6',
  },
  claimButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.one,
    marginTop: Spacing.half,
    alignSelf: 'flex-start',
    minHeight: 28,
    justifyContent: 'center',
  },
  claimButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
