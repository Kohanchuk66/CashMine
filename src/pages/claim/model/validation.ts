export interface ClaimValidationInput {
  amount: string;
  available: string;
  minAmount: string;
  fee: string;
  decimals: number;
  destinationId: string;
}

export interface ClaimValidationResult {
  isValid: boolean;
  error?: string;
  field?: 'amount' | 'destinationId';
  receiveAmount: string;
}

export function validateClaimInput(input: ClaimValidationInput): ClaimValidationResult {
  const { amount, available, minAmount, fee, decimals, destinationId } = input;
  const trimmed = amount.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Please enter an amount to claim.',
      field: 'amount',
      receiveAmount: '0',
    };
  }

  const numAmount = parseFloat(trimmed);
  if (isNaN(numAmount) || numAmount <= 0) {
    return {
      isValid: false,
      error: 'Amount must be greater than zero.',
      field: 'amount',
      receiveAmount: '0',
    };
  }

  const decimalParts = trimmed.split('.');
  if (decimalParts.length > 2) {
    return {
      isValid: false,
      error: 'Invalid number format.',
      field: 'amount',
      receiveAmount: '0',
    };
  }

  if (decimalParts[1] && decimalParts[1].length > decimals) {
    return {
      isValid: false,
      error: `Amount exceeds maximum precision of ${decimals} decimal places.`,
      field: 'amount',
      receiveAmount: '0',
    };
  }

  const numMin = parseFloat(minAmount);
  if (!isNaN(numMin) && numAmount < numMin) {
    return {
      isValid: false,
      error: `Minimum claim amount is ${minAmount}.`,
      field: 'amount',
      receiveAmount: '0',
    };
  }

  const numAvailable = parseFloat(available);
  if (!isNaN(numAvailable) && numAmount > numAvailable) {
    return {
      isValid: false,
      error: `Amount exceeds available balance of ${available}.`,
      field: 'amount',
      receiveAmount: '0',
    };
  }

  const numFee = parseFloat(fee) || 0;
  if (numAmount <= numFee) {
    return {
      isValid: false,
      error: `Amount must be greater than network fee of ${fee}.`,
      field: 'amount',
      receiveAmount: '0',
    };
  }

  if (!destinationId) {
    return {
      isValid: false,
      error: 'Please select a payout destination.',
      field: 'destinationId',
      receiveAmount: Math.max(0, numAmount - numFee).toFixed(decimals),
    };
  }

  const calculatedReceive = Math.max(0, numAmount - numFee).toFixed(decimals);

  return {
    isValid: true,
    receiveAmount: calculatedReceive,
  };
}
