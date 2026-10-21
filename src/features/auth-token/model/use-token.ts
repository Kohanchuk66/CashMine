import { useEffect, useState } from 'react';

import { tokenStorage, subscribeToToken } from '@/shared/api';
import { openTokenModal } from './token-events';

export function useToken() {
  const [token, setTokenState] = useState<string | null>(() => tokenStorage.getToken());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const current = tokenStorage.getToken();
    setTokenState(current);
    setIsReady(true);

    return subscribeToToken((nextToken) => {
      setTokenState(nextToken);
    });
  }, []);

  return {
    token,
    isReady,
    setToken: tokenStorage.setToken,
    clearToken: tokenStorage.removeToken,
    openModal: openTokenModal,
  };
}
