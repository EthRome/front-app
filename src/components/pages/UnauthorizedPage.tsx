import { LoginButton } from '../shared/LoginButton';

export const UnauthorizedPage = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='justify-start flex mt-4 text-4xl wave-text'>
          {'Feasy'.split('').map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
        <div className='mb-20 mt-4'>
          <img src='/tlo.webp' />
        </div>
        <div className='text-center mb-[72px] mx-6'>
          {!isLoading && <h2 className='uppercase mb-2'>the future is now</h2>}
          {isLoading ? (
            <div className='text-center mb-[72px] mx-6 text-2xl'>Almost there...</div>
          ) : (
            <p>Crypto made easy — no wallet, no passkey, just your email!</p>
          )}
        </div>
        <LoginButton />
      </div>
    </>
  );
};
