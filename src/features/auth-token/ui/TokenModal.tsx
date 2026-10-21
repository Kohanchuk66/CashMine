import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  View,
} from 'react-native';

import { subscribeToUnauthorized, tokenStorage } from '@/shared/api';
import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { subscribeToOpenModal } from '../model/token-events';
import { styles } from './TokenModal.styles';

export function TokenModal() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [hasExistingToken, setHasExistingToken] = useState(false);

  useEffect(() => {
    const existing = tokenStorage.getToken();
    if (!existing) {
      setHasExistingToken(false);
      setVisible(true);
    } else {
      setHasExistingToken(true);
    }

    const unsubUnauthorized = subscribeToUnauthorized(() => {
      setTokenInput('');
      setHasExistingToken(false);
      setVisible(true);
    });

    const unsubOpen = subscribeToOpenModal(() => {
      const current = tokenStorage.getToken();
      setTokenInput(current || '');
      setHasExistingToken(Boolean(current));
      setVisible(true);
    });

    return () => {
      unsubUnauthorized();
      unsubOpen();
    };
  }, []);

  const handleSave = () => {
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    tokenStorage.setToken(trimmed);
    setHasExistingToken(true);
    setVisible(false);
  };

  const handleCancel = () => {
    if (hasExistingToken) {
      setVisible(false);
    }
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
            Enter your bearer token for API authorization.
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
            {hasExistingToken && (
              <Pressable
                onPress={handleCancel}
                style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.pressed]}>
                <ThemedText type="small">Cancel</ThemedText>
              </Pressable>
            )}

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
