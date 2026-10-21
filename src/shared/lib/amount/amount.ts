import type { BalanceItem } from '@/shared/api';

export function parseAmount(input: string): number | null {
  if (typeof input !== 'string') return null;
  const normalized = input.trim().replace(',', '.');
  if (!normalized) return null;
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;

  const parsed = parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

export function getDecimalPlaces(input: string): number {
  if (typeof input !== 'string') return 0;
  const normalized = input.trim().replace(',', '.');
  const parts = normalized.split('.');
  if (parts.length !== 2) return 0;
  return parts[1].length;
}

export function calculateFeeAndReceive(
  amount: string | number,
  fee: string | number,
  decimals: number
): { receiveAmount: string; feeAmount: string; isValid: boolean } {
  const numAmount = typeof amount === 'number' ? amount : parseFloat(String(amount).replace(',', '.')) || 0;
  const numFee = typeof fee === 'number' ? fee : parseFloat(String(fee).replace(',', '.')) || 0;
  const safeDecimals = Math.max(0, Math.min(18, decimals));

  const net = numAmount - numFee;
  const isValid = numAmount > 0 && net > 0;

  return {
    receiveAmount: Math.max(0, net).toFixed(safeDecimals),
    feeAmount: numFee.toFixed(safeDecimals),
    isValid,
  };
}

export interface BalanceTotals {
  totalUsd: number;
  availableUsd: number;
  pendingUsd: number;
  claimingUsd: number;
}

export function calculateBalanceTotals(items: BalanceItem[]): BalanceTotals {
  let availableUsd = 0;
  let pendingUsd = 0;
  let claimingUsd = 0;
  let totalUsd = 0;

  for (const item of items) {
    const price = parseFloat(item.usdPrice) || 0;
    const avail = parseFloat(item.available) || 0;
    const pend = parseFloat(item.pending) || 0;
    const claim = parseFloat(item.claiming) || 0;

    const itemAvailUsd = avail * price;
    const itemPendUsd = pend * price;
    const itemClaimUsd = claim * price;

    availableUsd += itemAvailUsd;
    pendingUsd += itemPendUsd;
    claimingUsd += itemClaimUsd;
    totalUsd += itemAvailUsd + itemPendUsd + itemClaimUsd;
  }

  return {
    totalUsd,
    availableUsd,
    pendingUsd,
    claimingUsd,
  };
}

export function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}
