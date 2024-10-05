import { useState, useEffect } from 'react';
import { AuthorizedPage } from './AuthorizedPage';
import { UnauthorizedPage } from './UnauthorizedPage';
import { useSignerStatus, useUser } from '@account-kit/react';

export const Homepage = () => {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Tracks whether we're still checking auth
  const signerStatus = useSignerStatus();
  const user = useUser();

  useEffect(() => {
    // Add a delay to give authentication process time to complete
    const checkAuthTimeout = setTimeout(() => {
      if (signerStatus.status === 'CONNECTED' && user) {
        setIsUserConnected(true);
        setIsCheckingAuth(false); // Done checking, user is authenticated
      } else if (signerStatus.status === 'DISCONNECTED') {
        setIsUserConnected(false);
        setIsCheckingAuth(false); // Done checking, user is not authenticated
      }
    }, 2000);

    return () => clearTimeout(checkAuthTimeout); // Cleanup timeout on unmount
  }, [signerStatus.status, user]);

  const isLoading = signerStatus.isAuthenticating || signerStatus.isInitializing || isCheckingAuth;
  const authenticated = isUserConnected && user;

  if (isLoading) {
    return (
      <div>
        <div className='mb-20 mt-6'>
          <img src='/tlo.webp' />
        </div>
        <div className='text-center mb-[72px] mx-6 text-2xl'>Almost there...</div>
      </div>
    );
  }

  return <>{authenticated ? <AuthorizedPage /> : <UnauthorizedPage />}</>;
};
