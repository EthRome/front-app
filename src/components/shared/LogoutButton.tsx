import { useAuth0 } from '@auth0/auth0-react';
import { AUTH0_REDIRECT_ADDRESS } from '../../Layout';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='btn btn-secondary' onClick={() => logout({ logoutParams: { returnTo: AUTH0_REDIRECT_ADDRESS } })}>
      Log Out
    </button>
  );
};
