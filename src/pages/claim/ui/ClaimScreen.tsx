import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBalances, useCreateClaim } from '@/shared/api';
import { useResponsive, useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { ChangeTokenButton, useToken } from '@/features/auth-token';
import { getStoredActiveClaimId, setStoredActiveClaimId } from '../model/active-claim-storage';
import { ClaimConfirmModal } from './ClaimConfirmModal';
import { ClaimForm, type ClaimFormData } from './ClaimForm';
import { ClaimStatusCard } from './ClaimStatusCard';
import { styles } from './ClaimScreen.styles';

export function ClaimScreen() {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const { token, isReady } = useToken();
  const params = useLocalSearchParams<{ asset?: string; claimId?: string }>();

  const { data: balancesData, isLoading: isLoadingBalances, isError, error, refetch, isFetching } = useBalances();
  const createClaimMutation = useCreateClaim();

  const [activeClaimId, setActiveClaimId] = useState<string | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<ClaimFormData | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && !token) {
      router.replace('/token');
    }
  }, [isReady, token]);

  useEffect(() => {
    if (params.claimId) {
      setActiveClaimId(params.claimId);
      setStoredActiveClaimId(params.claimId);
    } else {
      const stored = getStoredActiveClaimId();
      if (stored) {
        setActiveClaimId(stored);
      }
    }
  }, [params.claimId]);

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const items = useMemo(() => balancesData?.items ?? [], [balancesData?.items]);

  const handleReview = (data: ClaimFormData) => {
    setServerError(null);
    setPendingFormData(data);
    setConfirmModalVisible(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingFormData) return;
    try {
      const result = await createClaimMutation.mutateAsync({
        asset: pendingFormData.asset,
        amount: pendingFormData.amount,
        destinationId: pendingFormData.destinationId,
      });
      setConfirmModalVisible(false);
      setActiveClaimId(result.id);
      setStoredActiveClaimId(result.id);
    } catch (err: any) {
      setServerError(err.message || 'Failed to submit claim request.');
      setConfirmModalVisible(false);
    }
  };

  const handleClaimAgain = () => {
    setActiveClaimId(null);
    setStoredActiveClaimId(null);
    setServerError(null);
  };

  const handleGoToBalances = () => {
    router.push('/');
  };

  const renderContent = () => {
    if (isLoadingBalances) {
      return (
        <ThemedView type="backgroundElement" style={styles.centerBox}>
          <ActivityIndicator size="large" color="#0274DF" />
          <ThemedText type="small" themeColor="textSecondary">
            Loading available balances...
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
          <ThemedText type="subtitle">Failed to load balances</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.errorMessage}>
            {error?.message || 'Unable to fetch assets available for claim.'}
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

    if (activeClaimId) {
      return (
        <ClaimStatusCard
          claimId={activeClaimId}
          onClaimAgain={handleClaimAgain}
          onGoToBalances={handleGoToBalances}
        />
      );
    }

    if (items.length === 0) {
      return (
        <ThemedView type="backgroundElement" style={styles.centerBox}>
          <ThemedText type="subtitle">No Claimable Assets</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.errorMessage}>
            You currently have no recorded assets available for payout.
          </ThemedText>
          <Pressable
            onPress={handleGoToBalances}
            style={({ pressed }) => [styles.retryButton, pressed && styles.pressed]}>
            <ThemedText type="smallBold" style={styles.retryButtonText}>
              Go to Balances
            </ThemedText>
          </Pressable>
        </ThemedView>
      );
    }

    return (
      <ClaimForm
        items={items}
        initialAsset={params.asset}
        serverError={serverError}
        onReview={handleReview}
      />
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
              refreshing={isFetching && !isLoadingBalances}
              onRefresh={handleRefresh}
              tintColor={theme.text}
              colors={['#0274DF']}
              progressBackgroundColor={theme.backgroundElement}
            />
          }>
          <View style={[styles.innerWrapper, isMobile && styles.innerWrapperMobile]}>
            <View style={styles.headerRow}>
              <ThemedText type="subtitle" style={[styles.title, isMobile && styles.titleMobile]}>
                Claim
              </ThemedText>
              <View style={styles.headerActions}>
                {activeClaimId && (
                  <Pressable
                    onPress={handleClaimAgain}
                    style={({ pressed }) => [styles.bannerAction, pressed && styles.pressed]}>
                    <ThemedText type="smallBold" style={styles.bannerActionText}>
                      New Claim
                    </ThemedText>
                  </Pressable>
                )}
                <ChangeTokenButton label="Token" />
              </View>
            </View>

            <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
              Withdraw your earned payback balances directly to your wallet.
            </ThemedText>

            {renderContent()}
          </View>
        </ScrollView>
      </SafeAreaView>

      {pendingFormData && (
        <ClaimConfirmModal
          visible={confirmModalVisible}
          asset={pendingFormData.asset}
          amount={pendingFormData.amount}
          fee={pendingFormData.fee}
          receiveAmount={pendingFormData.receiveAmount}
          destinationLabel={pendingFormData.destinationLabel}
          isSubmitting={createClaimMutation.isPending}
          onConfirm={handleConfirmSubmit}
          onCancel={() => setConfirmModalVisible(false)}
        />
      )}
    </ThemedView>
  );
}
