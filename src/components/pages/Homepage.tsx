import { useState, useEffect } from 'react';
import { AuthorizedPage } from './AuthorizedPage';
import { UnauthorizedPage } from './UnauthorizedPage';
import { useSignerStatus, useUser } from '@account-kit/react';

export const Homepage = () => {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const user = useUser();
  const signerStatus = useSignerStatus();

  useEffect(() => {
    if (signerStatus.status === 'CONNECTED') {
      setIsUserConnected(true);
    } else if (signerStatus.status === 'DISCONNECTED') {
      setIsUserConnected(false);
    }
  }, [signerStatus.status]);

  const isLoading = signerStatus.isAuthenticating || signerStatus.isInitializing || !!user;

  return <>{isUserConnected ? <AuthorizedPage /> : <UnauthorizedPage isLoading={isLoading} />}</>;
};
