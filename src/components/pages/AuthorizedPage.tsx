import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../shared/LogoutButton';

export const AuthorizedPage = () => {
  const { user } = useAuth0();

  return (
    <div>
      <div className='w-full h-[235px] bg-gradient rounded-[49px] p-8'>
        <h3 className='mb-10'>Hello, {user?.given_name}</h3>
      </div>

      <LogoutButton />
    </div>
  );
};
