import { useAuth0 } from '@auth0/auth0-react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import bitcoin from '/bitcoin.png';
import ethereum from '/ethereum.png';

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
      <button onClick={handleOnClick} className='w-full h-[80px] flex items-center p-8 rounded-2xl bg-[#281A55] hover:bg-[#89568A] active:bg-[#593FAC]'>
        <div className='flex items-center'>
          <div className='w-10'>
            <img src={bitcoin} alt='Bitcoin' />
          </div>
          <div className='ml-4'>Bitcoin</div>
        </div>
        <div className='ml-auto'>0.2137</div>
      </button>
      <button onClick={handleOnClick} className='w-full h-[80px] flex items-center p-8 rounded-2xl  bg-[#281A55] hover:bg-[#89568A] active:bg-[#593FAC] mt-4'>
        <div className='flex items-center'>
          <div className='w-10 pl-2'>
            <img src={ethereum} alt='Ethereum' />
          </div>
          <div className='ml-4'>Ethereum</div>
        </div>
        <div className='ml-auto'>2,137</div>
      </button>
    </div>
  );
};
