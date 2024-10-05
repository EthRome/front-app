import { useLogout } from '@account-kit/react';

export const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button className='btn bg-[#593FAC]' onClick={() => logout()}>
      Log Out
    </button>
  );
};
