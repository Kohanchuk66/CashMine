const STORAGE_KEY = 'cashmine_active_claim_id';

let memoryClaimId: string | null = null;

export function getStoredActiveClaimId(): string | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return memoryClaimId;
    }
  }
  return memoryClaimId;
}

export function setStoredActiveClaimId(claimId: string | null): void {
  memoryClaimId = claimId;
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      if (claimId) {
        window.localStorage.setItem(STORAGE_KEY, claimId);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }
}
