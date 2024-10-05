import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../shared/IconButton';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import bitcoin from '/bitcoin.png';
import ethereum from '/ethereum.png';
import SendModal from '../shared/SendModal';
import SettingsModal from '../shared/SettingsModal';

export const AuthorizedPage = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState('ETH');
  const [balance, setBalance] = useState(2137);
  const [openSendModal, setOpenSendModal] = useState(false);

  const handleOnClickSend = () => {
    setOpenSendModal((prev) => !prev);
  };

  const handleOnClick = () => {
    console.log('Clicked!');
  };

  const handleCurrencyClick = (currency: any) => {
    if (currency === 'BTC') {
      setActiveCurrency('BTC');
      setBalance(0.2137);
    } else if (currency === 'ETH') {
      setActiveCurrency('ETH');
      setBalance(21.37);
    }
  };

  const handleToggleSettingsModal = () => {
    setSettingsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <SettingsModal open={settingsModalOpen} handleToggleModal={handleToggleSettingsModal} />
      <SendModal open={openSendModal} handleToggleModal={handleOnClickSend} activeCurrency={activeCurrency} />
      <div className='w-full h-[362px] flex flex-col justify-between bg-gradient rounded-[49px] p-8'>
        <div className='w-full flex items-center justify-between'>
          <div className='text-md'>Hello, Izabela!</div>
          <button onClick={() => setSettingsModalOpen(true)} className='w-[18px] h-[18px]'>
            <Cog6ToothIcon />
          </button>
        </div>
        <div>
          <div className='mb-2 text-lg'>{activeCurrency}</div>
          <p className='text-[32px] font-semibold'>{balance}</p>
        </div>

        <div className='flex justify-between'>
          <IconButton handleOnClick={handleOnClick} icon={<PlusIcon />} label='Add' />
          <IconButton handleOnClick={handleOnClickSend} icon={<ArrowUpRightIcon />} label='Send' />
          <IconButton handleOnClick={handleOnClick} icon={<ArrowDownIcon />} label='Request' />
        </div>
      </div>

      <div className='mt-12 mb-4 ml-2 text-xl'>Portfolio</div>
      <button
        onClick={() => handleCurrencyClick('BTC')}
        className={`w-full h-[80px] flex items-center p-8 rounded-2xl ${activeCurrency === 'BTC' ? 'bg-[#593FAC]' : 'bg-[#281A55]'} hover:bg-[#352272]`}
      >
        <div className='flex items-center'>
          <div className='w-10'>
            <img src={bitcoin} alt='Bitcoin' />
          </div>
          <div className='ml-4'>Bitcoin</div>
        </div>
        <div className='ml-auto'>0.2137</div>
      </button>
      <button
        onClick={() => handleCurrencyClick('ETH')}
        className={`w-full h-[80px] flex items-center p-8 rounded-2xl ${activeCurrency === 'ETH' ? 'bg-[#593FAC]' : 'bg-[#281A55]'} hover:bg-[#352272] mt-4`}
      >
        <div className='flex items-center'>
          <div className='w-10 pl-2'>
            <img src={ethereum} alt='Ethereum' />
          </div>
          <div className='ml-4'>Ethereum</div>
        </div>
        <div className='ml-auto'>21.37</div>
      </button>
    </div>
  );
};
