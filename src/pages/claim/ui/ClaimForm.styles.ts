import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  formCard: {
    borderRadius: Spacing.four,
    padding: Spacing.five,
    gap: Spacing.five,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  formCardMobile: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  assetChip: {
    flex: 1,
    minWidth: 80,
    maxWidth: 140,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    gap: 2,
  },
  assetChipSelected: {
    borderColor: '#0274DF',
    backgroundColor: 'rgba(2, 116, 223, 0.12)',
  },
  destinationItem: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  destinationSelected: {
    borderColor: '#0274DF',
    backgroundColor: 'rgba(2, 116, 223, 0.08)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.25)',
    paddingHorizontal: Spacing.three,
    minHeight: 48,
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  inputWrapperFocused: {
    borderColor: '#0274DF',
  },
  textInput: {
    flex: 1,
    paddingVertical: Spacing.two,
    fontSize: 18,
    fontFamily: 'monospace',
  },
  maxButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    minHeight: 32,
    justifyContent: 'center',
  },
  maxButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  hintsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    lineHeight: 18,
  },
  serverErrorBox: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    gap: Spacing.one,
  },
  breakdownCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  breakdownDivider: {
    height: 1,
    width: '100%',
  },
  receiveHighlight: {
    color: '#10B981',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
    minHeight: 48,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
  },
  pressed: {
    opacity: 0.7,
  },
  loadingBox: {
    paddingVertical: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
});
