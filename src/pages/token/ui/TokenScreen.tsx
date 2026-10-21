import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { tokenStorage } from '@/shared/api';
import { useToken } from '@/features/auth-token';
import { styles } from './TokenScreen.styles';

export function TokenScreen() {
  const theme = useTheme();
  const { token, isReady } = useToken();
  const [tokenInput, setTokenInput] = useState('');

  useEffect(() => {
    if (isReady && token) {
      router.replace('/');
    }
  }, [isReady, token]);

  const handleSubmit = () => {
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    tokenStorage.setToken(trimmed);
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={styles.badgeRow}>
            <SymbolView
              tintColor="#0274DF"
              name={{ ios: 'key.fill', android: 'key', web: 'vpn_key' }}
              size={24}
            />
          </View>

          <ThemedText type="subtitle" style={styles.title}>
            API Token Required
          </ThemedText>

          <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
            Enter your bearer token to access CashMine Balances. The token will be saved to your browser local storage.
          </ThemedText>

          <TextInput
            value={tokenInput}
            onChangeText={setTokenInput}
            placeholder="Paste your API bearer token"
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

          <Pressable
            onPress={handleSubmit}
            disabled={!tokenInput.trim()}
            style={({ pressed }) => [
              styles.submitButton,
              !tokenInput.trim() && styles.disabledButton,
              pressed && styles.pressed,
            ]}>
            <ThemedText type="smallBold" style={styles.submitButtonText}>
              Save & Go to Balances
            </ThemedText>
          </Pressable>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}
