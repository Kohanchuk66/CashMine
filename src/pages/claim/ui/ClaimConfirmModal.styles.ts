import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 440,
    borderRadius: Spacing.four,
    padding: Spacing.five,
    gap: Spacing.four,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
  summaryCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
  },
  receiveValue: {
    color: '#10B981',
    fontSize: 18,
    lineHeight: 22,
  },
  noticeBox: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(2, 116, 223, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#0274DF',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.25)',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
  confirmButtonText: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
