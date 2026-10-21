import { SymbolView } from 'expo-symbols';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { useClaim } from '@/shared/api';
import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { styles } from './ClaimStatusCard.styles';

export type ClaimStatusCardProps = {
  claimId: string;
  onClaimAgain: () => void;
  onGoToBalances: () => void;
};

export function ClaimStatusCard({ claimId, onClaimAgain, onGoToBalances }: ClaimStatusCardProps) {
  const theme = useTheme();
  const { data: claim, isLoading, isError, error, refetch, isFetching } = useClaim(claimId);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!claim?.createdAt || claim.status !== 'pending') {
      return;
    }

    const start = new Date(claim.createdAt).getTime();
    const updateElapsed = () => {
      const diff = Math.max(0, Math.floor((Date.now() - start) / 1000));
      setElapsedSeconds(diff);
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [claim?.createdAt, claim?.status]);

  if (isLoading) {
    return (
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#0274DF" />
          <ThemedText type="small" themeColor="textSecondary">
            Loading claim details...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (isError || !claim) {
    return (
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.centerBox}>
          <SymbolView
            tintColor="#EF4444"
            name={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }}
            size={28}
          />
          <ThemedText type="subtitle">Failed to load claim</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {error?.message || 'Unable to fetch status for this claim.'}
          </ThemedText>
          <View style={styles.actionsRow}>
            <Pressable
              onPress={() => refetch()}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold" style={styles.primaryButtonText}>
                Retry
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={onClaimAgain}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold">New Claim</ThemedText>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    );
  }

  const isPending = claim.status === 'pending';
  const isCompleted = claim.status === 'completed';
  const isFailed = claim.status === 'failed';

  const badgeStyle = isPending
    ? styles.badgePending
    : isCompleted
      ? styles.badgeCompleted
      : styles.badgeFailed;

  const statusTextStyle = isPending
    ? styles.statusTextPending
    : isCompleted
      ? styles.statusTextCompleted
      : styles.statusTextFailed;

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.idGroup}>
          <ThemedText type="small" themeColor="textSecondary">
            Claim Identifier
          </ThemedText>
          <ThemedText style={styles.idText}>{claim.id}</ThemedText>
        </View>

        <View style={[styles.badge, badgeStyle]}>
          {isPending && <ActivityIndicator size="small" color="#0274DF" />}
          {isCompleted && (
            <SymbolView
              tintColor="#10B981"
              name={{ ios: 'checkmark.circle.fill', android: 'check', web: 'check' }}
              size={14}
            />
          )}
          {isFailed && (
            <SymbolView
              tintColor="#EF4444"
              name={{ ios: 'xmark.circle.fill', android: 'close', web: 'close' }}
              size={14}
            />
          )}
          <ThemedText type="smallBold" style={statusTextStyle}>
            {isPending ? 'Pending (~20s)' : isCompleted ? 'Completed' : 'Failed'}
          </ThemedText>
        </View>
      </View>

      {isPending && (
        <ThemedView type="backgroundSelected" style={styles.progressBox}>
          <ThemedText type="subtitle" style={styles.progressTitle}>
            Processing Claim On Network
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Claims typically settle in about 20 seconds. This view updates automatically.
          </ThemedText>
          <ThemedText type="smallBold" style={styles.timerText}>
            Elapsed: {elapsedSeconds}s
          </ThemedText>
        </ThemedView>
      )}

      {isFailed && (
        <View style={styles.failureBox}>
          <ThemedText type="smallBold" style={styles.failureReason}>
            Failure Reason: {claim.failureReason || 'Claim processing was rejected'}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            The requested amount has been automatically returned to your available balance.
          </ThemedText>
        </View>
      )}

      <ThemedView type="backgroundSelected" style={styles.detailsGrid}>
        <View style={styles.detailRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Asset
          </ThemedText>
          <ThemedText type="smallBold">{claim.asset}</ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Claim Amount
          </ThemedText>
          <ThemedText type="smallBold">
            {claim.amount} {claim.asset}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Network Fee
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {claim.fee} {claim.asset}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Receive Amount
          </ThemedText>
          <ThemedText type="smallBold" style={{ color: '#10B981' }}>
            {claim.receiveAmount} {claim.asset}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Destination ID
          </ThemedText>
          <ThemedText type="smallBold" numberOfLines={1}>
            {claim.destinationId}
          </ThemedText>
        </View>
      </ThemedView>

      <View style={styles.actionsRow}>
        {isPending ? (
          <>
            <Pressable
              onPress={() => refetch()}
              disabled={isFetching}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold">
                {isFetching ? 'Checking...' : 'Refresh Status'}
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={onGoToBalances}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold" style={styles.primaryButtonText}>
                View Balances
              </ThemedText>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              onPress={onGoToBalances}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold">View Balances</ThemedText>
            </Pressable>
            <Pressable
              onPress={onClaimAgain}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
              <ThemedText type="smallBold" style={styles.primaryButtonText}>
                {isCompleted ? 'Claim More' : 'Try Again'}
              </ThemedText>
            </Pressable>
          </>
        )}
      </View>
    </ThemedView>
  );
}
