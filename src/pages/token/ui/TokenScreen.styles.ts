import { StyleSheet } from 'react-native';

import { Spacing } from '@/shared/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.three,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  description: {
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 14,
    marginTop: Spacing.two,
    minHeight: 48,
  },
  submitButton: {
    backgroundColor: '#0274DF',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
    minHeight: 48,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
});
