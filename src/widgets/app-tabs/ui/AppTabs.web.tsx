import { usePathname } from 'expo-router';
import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, View } from 'react-native';

import { ChangeTokenButton } from '@/features/auth-token';
import { useResponsive } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { styles } from './AppTabs.web.styles';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Balances</TabButton>
          </TabTrigger>
          <TabTrigger name="claim" href="/claim" asChild>
            <TabButton>Claim</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const { isMobile } = useResponsive();

  return (
    <Pressable
      {...(props as any)}
      style={({ pressed }) => [
        isMobile && styles.tabButtonPressableMobile,
        pressed && styles.pressed,
      ]}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={isMobile ? styles.tabButtonViewMobile : styles.tabButtonViewDesktop}>
        <ThemedText
          type={isFocused ? 'smallBold' : 'small'}
          themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const pathname = usePathname();
  const { isMobile } = useResponsive();

  if (pathname === '/token') {
    return null;
  }

  if (isMobile) {
    return (
      <View {...props} style={styles.tabListContainerMobile}>
        <ThemedView type="backgroundElement" style={styles.innerContainerMobile}>
          {props.children}
        </ThemedView>
      </View>
    );
  }

  return (
    <View {...props} style={styles.tabListContainerDesktop}>
      <ThemedView type="backgroundElement" style={styles.innerContainerDesktop}>
        <ThemedText type="smallBold" style={styles.brandText}>
          CashMine
        </ThemedText>

        {props.children}

        <ChangeTokenButton />
      </ThemedView>
    </View>
  );
}
