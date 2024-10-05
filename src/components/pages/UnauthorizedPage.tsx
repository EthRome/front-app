import { LoginButton } from '../shared/LoginButton';

export const UnauthorizedPage = () => {
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
