import { StyleSheet } from 'react-native';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
    alignItems: 'center',
  },
  innerWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
    marginTop: Spacing.six,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: Spacing.one,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: Spacing.two,
  },
  itemsList: {
    gap: Spacing.three,
    width: '100%',
  },
  centerBox: {
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    width: '100%',
  },
  errorBox: {
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorMessage: {
    textAlign: 'center',
    maxWidth: 400,
  },
  retryButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  retryButtonText: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
  },
});
