import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  View,
} from 'react-native';

import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { tokenStorage } from '@/shared/api';
import { subscribeToOpenModal } from '../model/token-events';
import { styles } from './TokenModal.styles';

export function TokenModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  useEffect(() => {
    const unsubOpen = subscribeToOpenModal(() => {
      const current = tokenStorage.getToken();
      setTokenInput(current || '');
      setVisible(true);
    });

    return () => {
      unsubOpen();
    };
  }, []);

  const handleSave = () => {
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    tokenStorage.setToken(trimmed);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}>
      <View style={styles.backdrop}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="subtitle" style={styles.title}>
            API Token
          </ThemedText>

          <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
            Enter your bearer token for API authorization. It will be stored in your browser local storage.
          </ThemedText>

          <TextInput
            value={tokenInput}
            onChangeText={setTokenInput}
            placeholder="Paste your token here"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.background,
                borderColor: theme.backgroundSelected,
              },
            ]}
          />

          <View style={styles.actions}>
            <Pressable
              onPress={handleCancel}
              style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.pressed]}>
              <ThemedText type="small">Cancel</ThemedText>
            </Pressable>

            <Pressable
              onPress={handleSave}
              disabled={!tokenInput.trim()}
              style={({ pressed }) => [
                styles.button,
                styles.saveButton,
                !tokenInput.trim() && styles.disabledButton,
                pressed && styles.pressed,
              ]}>
              <ThemedText type="smallBold" style={styles.saveButtonText}>
                Save Token
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}
