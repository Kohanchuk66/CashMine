import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBalances } from '@/shared/api';
import { useResponsive, useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { ChangeTokenButton, useToken } from '@/features/auth-token';
import { TotalBalanceCard } from './TotalBalanceCard';
import { BalanceItemCard } from './BalanceItemCard';
import { FreshnessIndicator } from './FreshnessIndicator';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const { token, isReady } = useToken();
  const { data, isLoading, isError, error, refetch, isFetching } = useBalances();

  useEffect(() => {
    if (isReady && !token) {
      router.replace('/token');
    }
  }, [isReady, token]);

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const items = useMemo(() => data?.items ?? [], [data?.items]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <ThemedView type="backgroundElement" style={styles.centerBox}>
          <ActivityIndicator size="large" color="#0274DF" />
          <ThemedText type="small" themeColor="textSecondary">
            Loading your balances snapshot...
          </ThemedText>
        </ThemedView>
      );
    }

    if (isError) {
      return (
        <ThemedView type="backgroundElement" style={[styles.centerBox, styles.errorBox]}>
          <SymbolView
            tintColor="#EF4444"
            name={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }}
            size={32}
          />
          <ThemedText type="subtitle" style={{ fontSize: 18, lineHeight: 22 }}>
            Failed to load balances
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.errorMessage}>
            {error?.message || 'Unable to connect to the balances service.'}
          </ThemedText>
          <Pressable
            onPress={handleRefresh}
            style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}>
            <SymbolView
              tintColor="#ffffff"
              name={{ ios: 'arrow.clockwise', android: 'refresh', web: 'refresh' }}
              size={14}
            />
            <ThemedText type="smallBold" style={styles.retryButtonText}>
              Retry
            </ThemedText>
          </Pressable>
        </ThemedView>
      );
    }

    return (
      <>
        <TotalBalanceCard items={items} />

        <FreshnessIndicator
          asOf={data?.asOf}
          isFetching={isFetching}
          onRefresh={handleRefresh}
        />

        <View style={styles.itemsList}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Assets ({items.length})
          </ThemedText>

          {items.length === 0 ? (
            <ThemedView type="backgroundElement" style={styles.centerBox}>
              <ThemedText type="small" themeColor="textSecondary">
                No asset balances recorded yet.
              </ThemedText>
            </ThemedView>
          ) : (
            items.map((item) => <BalanceItemCard key={item.asset} item={item} />)
          )}
        </View>
      </>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            isMobile && styles.contentContainerMobile,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          scrollEventThrottle={16}
          bounces={true}
          alwaysBounceVertical={true}
          overScrollMode="always"
          nestedScrollEnabled={true}
          contentInsetAdjustmentBehavior="never"
          removeClippedSubviews={Platform.OS !== 'web'}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isLoading}
              onRefresh={handleRefresh}
              tintColor={theme.text}
              colors={['#0274DF']}
              progressBackgroundColor={theme.backgroundElement}
            />
          }>
          <View style={[styles.innerWrapper, isMobile && styles.innerWrapperMobile]}>
            <View style={styles.headerRow}>
              <ThemedText type="subtitle" style={[styles.title, isMobile && styles.titleMobile]}>
                Balances
              </ThemedText>
              <ChangeTokenButton label="Token" />
            </View>

            {renderContent()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
