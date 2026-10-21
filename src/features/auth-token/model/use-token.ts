import { useEffect, useState } from 'react';

import { tokenStorage, subscribeToToken } from '@/shared/api';
import { openTokenModal } from './token-events';

export function useToken() {
  const [token, setTokenState] = useState<string | null>(() => tokenStorage.getToken());

  useEffect(() => {
    return subscribeToToken((nextToken) => {
      setTokenState(nextToken);
    });
  }, []);

  return {
    token,
    setToken: tokenStorage.setToken,
    clearToken: tokenStorage.removeToken,
    openModal: openTokenModal,
  };
}
