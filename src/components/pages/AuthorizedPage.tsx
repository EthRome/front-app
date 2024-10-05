import { useAuth0 } from '@auth0/auth0-react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export const AuthorizedPage = () => {
  const { user } = useAuth0();

  const handleOnClick = () => {
    console.log('Clicked!');
  };

  return (
    <div>
      <div className='w-full h-[235px] flex items-center justify-between bg-gradient rounded-[49px] p-8'>
        <div>
          <h3 className='mb-10'>Hello, {user?.given_name}</h3>
          <button className='w-[18px] h-[18px]'>
            <Cog6ToothIcon />
          </button>
        </div>
      </div>
      <div className='mt-12 mb-4 ml-2 text-xl'>Portfolio</div>
      <button onClick={handleOnClick} className='w-full h-[80px] flex items-center p-8 rounded-2xl bg-[#281A55]'>
        <div>Bitcoin</div>
        <div className='ml-auto'>0.2137</div>
      </button>
    </div>
  );
};
