import { SymbolView } from 'expo-symbols';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, View } from 'react-native';

import { useClaimOptions } from '@/shared/api';
import type { BalanceItem } from '@/shared/api';
import { useTheme } from '@/shared/lib';
import { ThemedText, ThemedView } from '@/shared/ui';
import { validateClaimInput } from '../model/validation';
import { styles } from './ClaimForm.styles';

export type ClaimFormData = {
  asset: string;
  amount: string;
  destinationId: string;
  destinationLabel: string;
  fee: string;
  receiveAmount: string;
};

export type ClaimFormProps = {
  items: BalanceItem[];
  initialAsset?: string;
  serverError?: string | null;
  onReview: (data: ClaimFormData) => void;
};

export function ClaimForm({ items, initialAsset, serverError, onReview }: ClaimFormProps) {
  const theme = useTheme();

  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>(
    initialAsset || items[0]?.asset || ''
  );
  const [amount, setAmount] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (initialAsset && items.some((i) => i.asset === initialAsset)) {
      setSelectedAssetSymbol(initialAsset);
    } else if (!selectedAssetSymbol && items[0]) {
      setSelectedAssetSymbol(items[0].asset);
    }
  }, [initialAsset, items, selectedAssetSymbol]);

  const selectedBalance = useMemo(
    () => items.find((i) => i.asset === selectedAssetSymbol) || items[0],
    [items, selectedAssetSymbol]
  );

  const {
    data: claimOptions,
    isLoading: isLoadingOptions,
    isError: isOptionsError,
    error: optionsError,
  } = useClaimOptions(selectedBalance?.asset ?? '');

  useEffect(() => {
    if (claimOptions?.destinations && claimOptions.destinations.length > 0) {
      if (!selectedDestinationId || !claimOptions.destinations.some((d) => d.id === selectedDestinationId)) {
        setSelectedDestinationId(claimOptions.destinations[0].id);
      }
    }
  }, [claimOptions?.destinations, selectedDestinationId]);

  const selectedDestination = useMemo(
    () => claimOptions?.destinations.find((d) => d.id === selectedDestinationId),
    [claimOptions?.destinations, selectedDestinationId]
  );

  const validation = useMemo(() => {
    if (!selectedBalance || !claimOptions) {
      return { isValid: false, receiveAmount: '0' };
    }
    return validateClaimInput({
      amount,
      available: selectedBalance.available,
      minAmount: claimOptions.minAmount,
      fee: claimOptions.fee,
      decimals: selectedBalance.decimals,
      destinationId: selectedDestinationId,
    });
  }, [amount, selectedBalance, claimOptions, selectedDestinationId]);

  const handleMaxPress = () => {
    if (selectedBalance) {
      setAmount(selectedBalance.available);
    }
  };

  const handleAssetSelect = (asset: string) => {
    setSelectedAssetSymbol(asset);
    setAmount('');
  };

  const handleReviewSubmit = () => {
    if (!validation.isValid || !selectedBalance || !claimOptions || !selectedDestination) {
      return;
    }
    onReview({
      asset: selectedBalance.asset,
      amount,
      destinationId: selectedDestination.id,
      destinationLabel: selectedDestination.label,
      fee: claimOptions.fee,
      receiveAmount: validation.receiveAmount,
    });
  };

  const price = parseFloat(selectedBalance?.usdPrice ?? '0') || 0;
  const numAmount = parseFloat(amount) || 0;
  const numFee = parseFloat(claimOptions?.fee ?? '0') || 0;
  const numReceive = parseFloat(validation.receiveAmount) || 0;

  return (
    <ThemedView type="backgroundElement" style={styles.formCard}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold">Select Asset</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Available to claim
          </ThemedText>
        </View>

        <View style={styles.assetList}>
          {items.map((item) => {
            const isSelected = item.asset === selectedBalance?.asset;
            const avail = parseFloat(item.available) || 0;
            return (
              <Pressable
                key={item.asset}
                onPress={() => handleAssetSelect(item.asset)}
                style={({ pressed }) => [
                  styles.assetChip,
                  isSelected && styles.assetChipSelected,
                  pressed && styles.pressed,
                ]}>
                <ThemedText type={isSelected ? 'smallBold' : 'small'}>{item.asset}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={{ fontSize: 11 }}>
                  {avail.toFixed(Math.min(item.decimals, 2))}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold">Payout Destination</ThemedText>
          {isLoadingOptions && <ActivityIndicator size="small" color="#0274DF" />}
        </View>

        {isLoadingOptions ? (
          <ThemedView type="backgroundSelected" style={styles.loadingBox}>
            <ThemedText type="small" themeColor="textSecondary">
              Loading destinations...
            </ThemedText>
          </ThemedView>
        ) : isOptionsError ? (
          <View style={styles.serverErrorBox}>
            <ThemedText type="small" style={styles.errorText}>
              {optionsError?.message || 'Failed to load destinations for this asset.'}
            </ThemedText>
          </View>
        ) : !claimOptions?.destinations || claimOptions.destinations.length === 0 ? (
          <ThemedView type="backgroundSelected" style={styles.loadingBox}>
            <ThemedText type="small" themeColor="textSecondary">
              No registered payout destinations found.
            </ThemedText>
          </ThemedView>
        ) : (
          claimOptions.destinations.map((dest) => {
            const isSelected = dest.id === selectedDestinationId;
            return (
              <Pressable
                key={dest.id}
                onPress={() => setSelectedDestinationId(dest.id)}
                style={({ pressed }) => [
                  styles.destinationItem,
                  isSelected && styles.destinationSelected,
                  pressed && styles.pressed,
                ]}>
                <ThemedText type={isSelected ? 'smallBold' : 'small'}>{dest.label}</ThemedText>
                <SymbolView
                  tintColor={isSelected ? '#0274DF' : theme.textSecondary}
                  name={{
                    ios: isSelected ? 'checkmark.circle.fill' : 'circle',
                    android: isSelected ? 'check' : 'circle',
                    web: isSelected ? 'check' : 'circle',
                  }}
                  size={18}
                />
              </Pressable>
            );
          })
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold">Claim Amount</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Available: {selectedBalance?.available ?? '0'} {selectedBalance?.asset}
          </ThemedText>
        </View>

        <View
          style={[
            styles.inputWrapper,
            isFocused && styles.inputWrapperFocused,
            validation.error && styles.inputWrapperError,
          ]}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="0.00"
            placeholderTextColor={theme.textSecondary}
            keyboardType="decimal-pad"
            style={[styles.textInput, { color: theme.text }]}
          />
          <Pressable
            onPress={handleMaxPress}
            style={({ pressed }) => [styles.maxButton, pressed && styles.pressed]}>
            <ThemedText type="smallBold" style={styles.maxButtonText}>
              MAX
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.hintsRow}>
          {validation.error ? (
            <ThemedText type="small" style={styles.errorText}>
              {validation.error}
            </ThemedText>
          ) : (
            <>
              <ThemedText type="small" themeColor="textSecondary">
                Min: {claimOptions?.minAmount ?? '—'} {selectedBalance?.asset}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Precision: up to {selectedBalance?.decimals ?? 6} decimals
              </ThemedText>
            </>
          )}
        </View>
      </View>

      {serverError && (
        <View style={styles.serverErrorBox}>
          <ThemedText type="smallBold" style={styles.errorText}>
            Submission Error
          </ThemedText>
          <ThemedText type="small" style={styles.errorText}>
            {serverError}
          </ThemedText>
        </View>
      )}

      <ThemedView type="backgroundSelected" style={styles.breakdownCard}>
        <View style={styles.breakdownRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Gross Amount
          </ThemedText>
          <ThemedText type="smallBold">
            {amount || '0'} {selectedBalance?.asset}{' '}
            {price > 0 && `(~$${(numAmount * price).toFixed(2)})`}
          </ThemedText>
        </View>

        <View style={styles.breakdownRow}>
          <ThemedText type="small" themeColor="textSecondary">
            Network Fee
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            - {claimOptions?.fee ?? '0'} {selectedBalance?.asset}{' '}
            {price > 0 && `(~$${(numFee * price).toFixed(2)})`}
          </ThemedText>
        </View>

        <View style={[styles.breakdownDivider, { backgroundColor: theme.backgroundSelected }]} />

        <View style={styles.breakdownRow}>
          <ThemedText type="smallBold">Estimated Net Received</ThemedText>
          <ThemedText type="smallBold" style={styles.receiveHighlight}>
            {validation.receiveAmount} {selectedBalance?.asset}{' '}
            {price > 0 && `(~$${(numReceive * price).toFixed(2)})`}
          </ThemedText>
        </View>
      </ThemedView>

      <Pressable
        onPress={handleReviewSubmit}
        disabled={!validation.isValid || isLoadingOptions}
        style={({ pressed }) => [
          styles.submitButton,
          (!validation.isValid || isLoadingOptions) && styles.submitButtonDisabled,
          pressed && styles.pressed,
        ]}>
        <ThemedText type="smallBold" style={styles.submitButtonText}>
          Review Claim
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}
