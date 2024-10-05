import { LoginButton } from '../shared/LoginButton';
import { useUser } from '@account-kit/react';

export const UnauthorizedPage = () => {
  const user = useUser();

  console.log('user', user);

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='mb-6'>
        <img src='/logo.png' />
      </div>
      <div className='text-center mb-[72px]'>
        <h2 className='uppercase mb-2'>the future is now</h2>
        <p>Use your crypto, no need for passkey, wallet or blablabla </p>
      </div>
      <LoginButton />
    </div>
  );
};
