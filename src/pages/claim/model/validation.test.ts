import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { validateClaimInput } from './validation.ts';

describe('Claim Validation Logic', () => {
  const baseInput = {
    amount: '10.5',
    available: '100.0',
    minAmount: '1.0',
    fee: '0.5',
    decimals: 2,
    destinationId: 'dest_wallet_1',
  };

  it('validates a completely correct claim input', () => {
    const result = validateClaimInput(baseInput);
    assert.equal(result.isValid, true);
    assert.equal(result.receiveAmount, '10.00');
    assert.equal(result.error, undefined);
  });

  it('rejects empty or whitespace-only amount', () => {
    const result = validateClaimInput({ ...baseInput, amount: '   ' });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'amount');
    assert.equal(result.error, 'Please enter an amount to claim.');
  });

  it('rejects zero or negative amounts', () => {
    const zeroResult = validateClaimInput({ ...baseInput, amount: '0' });
    assert.equal(zeroResult.isValid, false);
    assert.equal(zeroResult.field, 'amount');

    const negativeResult = validateClaimInput({ ...baseInput, amount: '-5' });
    assert.equal(negativeResult.isValid, false);
    assert.equal(negativeResult.field, 'amount');
  });

  it('rejects amounts exceeding decimal precision', () => {
    const result = validateClaimInput({
      ...baseInput,
      amount: '10.1234',
      decimals: 2,
    });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'amount');
    assert.match(result.error!, /maximum precision of 2 decimal places/);
  });

  it('accepts amounts with decimal precision within bounds', () => {
    const result = validateClaimInput({
      ...baseInput,
      amount: '10.123456',
      available: '50.0',
      decimals: 6,
    });
    assert.equal(result.isValid, true);
  });

  it('rejects amounts below minAmount', () => {
    const result = validateClaimInput({
      ...baseInput,
      amount: '0.5',
      minAmount: '1.0',
    });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'amount');
    assert.match(result.error!, /Minimum claim amount is 1.0/);
  });

  it('rejects amounts exceeding available balance', () => {
    const result = validateClaimInput({
      ...baseInput,
      amount: '150.0',
      available: '100.0',
    });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'amount');
    assert.match(result.error!, /exceeds available balance of 100.0/);
  });

  it('rejects amounts that do not cover network fee', () => {
    const result = validateClaimInput({
      ...baseInput,
      amount: '0.4',
      fee: '0.5',
      minAmount: '0.1',
    });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'amount');
    assert.match(result.error!, /greater than network fee of 0.5/);
  });

  it('rejects when amount equals fee exactly', () => {
    const result = validateClaimInput({
      ...baseInput,
      amount: '0.5',
      fee: '0.5',
      minAmount: '0.1',
    });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'amount');
  });

  it('rejects missing destination when destinations are required', () => {
    const result = validateClaimInput({
      ...baseInput,
      destinationId: '',
    });
    assert.equal(result.isValid, false);
    assert.equal(result.field, 'destinationId');
    assert.equal(result.error, 'Please select a payout destination.');
  });
});
