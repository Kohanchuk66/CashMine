import { SymbolView } from 'expo-symbols';
import { ActivityIndicator, Modal, Pressable, View } from 'react-native';

import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { styles } from './ClaimConfirmModal.styles';

export type ClaimConfirmModalProps = {
  visible: boolean;
  asset: string;
  amount: string;
  fee: string;
  receiveAmount: string;
  destinationLabel: string;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ClaimConfirmModal({
  visible,
  asset,
  amount,
  fee,
  receiveAmount,
  destinationLabel,
  isSubmitting,
  onConfirm,
  onCancel,
}: ClaimConfirmModalProps) {
  const theme = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <ThemedView type="backgroundElement" style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <ThemedText type="subtitle" style={styles.title}>
              Confirm Claim
            </ThemedText>
            <Pressable
              onPress={onCancel}
              disabled={isSubmitting}
              style={({ pressed }) => pressed && styles.pressed}>
              <SymbolView
                tintColor={theme.textSecondary}
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={20}
              />
            </Pressable>
          </View>

          <ThemedView type="backgroundSelected" style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Asset
              </ThemedText>
              <ThemedText type="smallBold">{asset}</ThemedText>
            </View>

            <View style={styles.summaryRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Claim Amount
              </ThemedText>
              <ThemedText type="smallBold">
                {amount} {asset}
              </ThemedText>
            </View>

            <View style={styles.summaryRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Network Fee
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {fee} {asset}
              </ThemedText>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

            <View style={styles.summaryRow}>
              <ThemedText type="smallBold">You Will Receive</ThemedText>
              <ThemedText type="smallBold" style={styles.receiveValue}>
                {receiveAmount} {asset}
              </ThemedText>
            </View>

            <View style={styles.summaryRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Destination
              </ThemedText>
              <ThemedText type="smallBold" numberOfLines={1}>
                {destinationLabel}
              </ThemedText>
            </View>
          </ThemedView>

          <View style={styles.noticeBox}>
            <ThemedText type="small" themeColor="textSecondary">
              Claim amount leaves available balance immediately. Claims settle in approximately 20
              seconds.
            </ThemedText>
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              onPress={onCancel}
              disabled={isSubmitting}
              style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold">Cancel</ThemedText>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.confirmButton,
                isSubmitting && styles.disabledButton,
                pressed && styles.pressed,
              ]}>
              {isSubmitting && <ActivityIndicator size="small" color="#ffffff" />}
              <ThemedText type="smallBold" style={styles.confirmButtonText}>
                {isSubmitting ? 'Submitting...' : 'Confirm & Submit'}
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}
