import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';

import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { openTokenModal } from '../model/token-events';
import { styles } from './ChangeTokenButton.styles';

export type ChangeTokenButtonProps = {
  label?: string;
};

export function ChangeTokenButton({ label = 'Token' }: ChangeTokenButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={openTokenModal}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
      <ThemedView type="backgroundSelected" style={styles.container}>
        <SymbolView
          tintColor={theme.text}
          name={{ ios: 'key.fill', android: 'key', web: 'vpn_key' }}
          size={14}
        />
        <ThemedText type="smallBold">{label}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}
