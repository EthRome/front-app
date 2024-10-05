import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../shared/LogoutButton';

export const AuthorizedPage = () => {
  const { user } = useAuth0();

  return (
    <>
      <h1 className='mb-10'>Hello, {user?.name}</h1>
      <LogoutButton />
    </>
  );
};
