import { useAuth0 } from '@auth0/auth0-react';
import { AuthorizedPage } from './AuthorizedPage';
import { UnauthorizedPage } from './UnauthorizedPage';

export const Homepage = () => {
  const { isAuthenticated } = useAuth0();

  return <>{isAuthenticated ? <AuthorizedPage /> : <UnauthorizedPage />}</>;
};
