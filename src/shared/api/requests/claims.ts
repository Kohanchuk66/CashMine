import { get, post } from './base';
import { generateIdempotencyKey } from './idempotency';
import type {
  Claim,
  ClaimOptionsResponse,
  CreateClaimParams,
  CreateClaimPayload,
  GetClaimOptionsParams,
} from '../types';

export function getClaimOptions(params: GetClaimOptionsParams): Promise<ClaimOptionsResponse> {
  return get<ClaimOptionsResponse>('/v1/claim-options', { params });
}

export function createClaim(params: CreateClaimParams): Promise<Claim> {
  const { idempotencyKey = generateIdempotencyKey(), ...payload } = params;
  return post<Claim, CreateClaimPayload>('/v1/claims', payload, {
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
  });
}

export function getClaim(id: string): Promise<Claim> {
  return get<Claim>(`/v1/claims/${id}`);
}
