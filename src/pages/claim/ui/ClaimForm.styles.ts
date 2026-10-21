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
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    gap: 2,
    minWidth: 90,
  },
  assetChipSelected: {
    borderColor: '#0274DF',
    backgroundColor: 'rgba(2, 116, 223, 0.12)',
  },
  destinationItem: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  inputWrapperFocused: {
    borderColor: '#0274DF',
  },
  textInput: {
    flex: 1,
    paddingVertical: Spacing.three,
    fontSize: 18,
    fontFamily: 'monospace',
  },
  maxButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
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
  },
  breakdownDivider: {
    height: 1,
    width: '100%',
  },
  receiveHighlight: {
    color: '#10B981',
    fontSize: 18,
    lineHeight: 22,
  },
  submitButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
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
