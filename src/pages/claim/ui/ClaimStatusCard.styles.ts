import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.five,
    gap: Spacing.four,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idGroup: {
    gap: Spacing.one,
  },
  idText: {
    fontFamily: 'monospace',
    fontSize: 13,
  },
  badge: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  badgePending: {
    backgroundColor: 'rgba(2, 116, 223, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(2, 116, 223, 0.4)',
  },
  badgeCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  badgeFailed: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  statusTextPending: {
    color: '#0274DF',
  },
  statusTextCompleted: {
    color: '#10B981',
  },
  statusTextFailed: {
    color: '#EF4444',
  },
  centerBox: {
    paddingVertical: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  progressBox: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.two,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  timerText: {
    color: '#0274DF',
  },
  failureBox: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.two,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  failureReason: {
    color: '#EF4444',
  },
  detailsGrid: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.25)',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.one,
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
  },
});
