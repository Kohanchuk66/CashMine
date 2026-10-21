const TOKEN_KEY = 'cashmine_auth_token';

let inMemoryToken: string | null = null;

type TokenListener = (token: string | null) => void;
type UnauthorizedListener = () => void;

const tokenListeners = new Set<TokenListener>();
const unauthorizedListeners = new Set<UnauthorizedListener>();

function emitTokenChange(token: string | null) {
  tokenListeners.forEach((listener) => listener(token));
}

export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(TOKEN_KEY);
        if (stored !== null) {
          inMemoryToken = stored;
          return stored;
        }
      } catch {
        return inMemoryToken;
      }
    }
    return inMemoryToken;
  },
  setToken: (token: string): void => {
    const trimmed = token.trim();
    inMemoryToken = trimmed;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(TOKEN_KEY, trimmed);
      } catch {
      }
    }
    emitTokenChange(trimmed);
  },
  removeToken: (): void => {
    inMemoryToken = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(TOKEN_KEY);
      } catch {
      }
    }
    emitTokenChange(null);
  },
};

export function notifyUnauthorized(): void {
  unauthorizedListeners.forEach((listener) => listener());
}

export function subscribeToUnauthorized(listener: UnauthorizedListener): () => void {
  unauthorizedListeners.add(listener);
  return () => {
    unauthorizedListeners.delete(listener);
  };
}

export function subscribeToToken(listener: TokenListener): () => void {
  tokenListeners.add(listener);
  return () => {
    tokenListeners.delete(listener);
  };
}
