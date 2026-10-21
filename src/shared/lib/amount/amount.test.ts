import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  calculateBalanceTotals,
  calculateFeeAndReceive,
  formatCurrency,
  getDecimalPlaces,
  parseAmount,
} from './amount.ts';

describe('Amount Parsing Logic', () => {
  it('parses valid integer strings', () => {
    assert.equal(parseAmount('100'), 100);
    assert.equal(parseAmount('0'), 0);
  });

  it('parses valid decimal strings with dot', () => {
    assert.equal(parseAmount('12.345'), 12.345);
    assert.equal(parseAmount('0.000001'), 0.000001);
  });

  it('parses decimal strings with comma', () => {
    assert.equal(parseAmount('12,345'), 12.345);
    assert.equal(parseAmount('0,5'), 0.5);
  });

  it('trims leading and trailing whitespace', () => {
    assert.equal(parseAmount('   42.5   '), 42.5);
    assert.equal(parseAmount('\t10\n'), 10);
  });

  it('returns null for empty or invalid strings', () => {
    assert.equal(parseAmount(''), null);
    assert.equal(parseAmount('   '), null);
    assert.equal(parseAmount('abc'), null);
    assert.equal(parseAmount('12a34'), null);
    assert.equal(parseAmount('1.2.3'), null);
    assert.equal(parseAmount('..5'), null);
  });

  it('returns null for negative numbers', () => {
    assert.equal(parseAmount('-10'), null);
    assert.equal(parseAmount('-0.5'), null);
  });

  it('counts decimal places correctly', () => {
    assert.equal(getDecimalPlaces('100'), 0);
    assert.equal(getDecimalPlaces('100.5'), 1);
    assert.equal(getDecimalPlaces('100.123456'), 6);
    assert.equal(getDecimalPlaces('100,25'), 2);
    assert.equal(getDecimalPlaces('100.'), 0);
  });
});

describe('Fee and Net Receive Logic', () => {
  it('calculates net receive amount after fee deduction', () => {
    const result = calculateFeeAndReceive('10.5', '0.5', 2);
    assert.equal(result.receiveAmount, '10.00');
    assert.equal(result.feeAmount, '0.50');
    assert.equal(result.isValid, true);
  });

  it('formats receive amount with proper asset decimals', () => {
    const result = calculateFeeAndReceive('1.234567', '0.001', 6);
    assert.equal(result.receiveAmount, '1.233567');
    assert.equal(result.isValid, true);
  });

  it('marks invalid when amount is less than fee', () => {
    const result = calculateFeeAndReceive('0.0005', '0.001', 4);
    assert.equal(result.receiveAmount, '0.0000');
    assert.equal(result.isValid, false);
  });

  it('marks invalid when amount equals fee exactly', () => {
    const result = calculateFeeAndReceive('0.005', '0.005', 3);
    assert.equal(result.receiveAmount, '0.000');
    assert.equal(result.isValid, false);
  });
});

describe('Portfolio Balance Totals Logic', () => {
  it('computes available, pending, claiming, and total USD sums', () => {
    const items = [
      {
        asset: 'USDT',
        decimals: 6,
        available: '100',
        pending: '20',
        claiming: '10',
        usdPrice: '1.00',
      },
      {
        asset: 'ETH',
        decimals: 18,
        available: '2',
        pending: '0.5',
        claiming: '0',
        usdPrice: '2500.00',
      },
    ];

    const totals = calculateBalanceTotals(items);

    assert.equal(totals.availableUsd, 100 * 1 + 2 * 2500);
    assert.equal(totals.pendingUsd, 20 * 1 + 0.5 * 2500);
    assert.equal(totals.claimingUsd, 10 * 1 + 0 * 2500);
    assert.equal(
      totals.totalUsd,
      (100 + 20 + 10) * 1 + (2 + 0.5 + 0) * 2500
    );
  });

  it('returns zeroes for an empty balance list', () => {
    const totals = calculateBalanceTotals([]);
    assert.equal(totals.totalUsd, 0);
    assert.equal(totals.availableUsd, 0);
    assert.equal(totals.pendingUsd, 0);
    assert.equal(totals.claimingUsd, 0);
  });

  it('handles invalid or non-numeric balance values without NaN', () => {
    const items = [
      {
        asset: 'INVALID',
        decimals: 2,
        available: 'invalid',
        pending: 'NaN',
        claiming: '',
        usdPrice: 'abc',
      },
    ];

    const totals = calculateBalanceTotals(items);
    assert.equal(Number.isNaN(totals.totalUsd), false);
    assert.equal(totals.totalUsd, 0);
  });

  it('formats currency with commas and two decimals', () => {
    assert.equal(formatCurrency(1234.56), '$1,234.56');
    assert.equal(formatCurrency(0), '$0.00');
  });
});
