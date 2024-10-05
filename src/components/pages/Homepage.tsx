import { AuthorizedPage } from './AuthorizedPage';
import { UnauthorizedPage } from './UnauthorizedPage';
import { useSignerStatus } from '@account-kit/react';

export const Homepage = () => {
  const signerStatus = useSignerStatus();

  const isUserConnected = signerStatus.status === 'CONNECTED';

  return <>{isUserConnected ? <AuthorizedPage /> : <UnauthorizedPage />}</>;
};
