import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.three,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
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
    padding: Spacing.three,
    gap: Spacing.two,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  receiveValue: {
    color: '#10B981',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  noticeBox: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(2, 116, 223, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#0274DF',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  cancelButton: {
    flex: 1,
    minHeight: 44,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.25)',
  },
  confirmButton: {
    flex: 1,
    minHeight: 44,
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
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
