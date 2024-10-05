import { useLogout } from '@account-kit/react';

export const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button className='btn btn-secondary' onClick={() => logout()}>
      Log Out
    </button>
  );
};
