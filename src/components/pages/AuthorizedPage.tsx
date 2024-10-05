import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../shared/IconButton';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import bitcoin from '/bitcoin.png';
import ethereum from '/ethereum.png';

export const AuthorizedPage = () => {
  const handleOnClick = () => {
    console.log('Clicked!');
  };

  const ethBalance = 2137;

  return (
    <div>
      <div className='w-full h-[362px] flex flex-col justify-between bg-gradient rounded-[49px] p-8'>
        <div className='w-full flex items-center justify-between'>
          <h3>Hello, </h3>
          <button className='w-[18px] h-[18px]'>
            <Cog6ToothIcon />
          </button>
        </div>
        <div>
          <h3 className='mb-2'>ETH</h3>
          <p className='text-[32px] font-semibold'>{ethBalance.toFixed(2)}</p>
        </div>

        <div className='flex justify-between'>
          <IconButton handleOnClick={handleOnClick} icon={<PlusIcon />} label='Add' />
          <IconButton handleOnClick={handleOnClick} icon={<ArrowUpRightIcon />} label='Send' />
          <IconButton handleOnClick={handleOnClick} icon={<ArrowDownIcon />} label='Request' />
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
