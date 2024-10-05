import { useAuthModal } from '@account-kit/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const LoginButton = () => {
  const { openAuthModal } = useAuthModal();

  return (
    <button className='w-[80px] aspect-square flex justify-center items-center bg-gradient rounded-full' onClick={openAuthModal}>
      <ArrowRightIcon width={'39px'} height={'37px'} />
    </button>
  );
};
