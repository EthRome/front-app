import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <button className='btn btn-primary' onClick={() => loginWithRedirect({ authorizationParams: { transactionHash: 123456 } })}>
      {isLoading ? 'Loading...' : 'Log In With Google'}
    </button>
  );
};
