import { useAuth0 } from '@auth0/auth0-react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className='w-[80px] aspect-square flex justify-center items-center bg-gradient rounded-full'
      onClick={() => loginWithRedirect({ authorizationParams: { transactionHash: 123456 } })}
    >
      <ArrowRightIcon width={'39px'} height={'37px'} />
    </button>
  );
};
