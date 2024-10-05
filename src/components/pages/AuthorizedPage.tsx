import { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpRightIcon, Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline';
import { IconButton } from '../shared/IconButton';
import bitcoin from '/bitcoin.png';
import ethereum from '/ethereum.png';
import SendModal from '../shared/SendModal';
import SettingsModal from '../shared/SettingsModal';
import { useSmartAccountClient, useUser } from '@account-kit/react';
import { formatEther, keccak256 } from 'viem';
import { formatBalance } from '../../utils/helpers/formatBalance';
import RequestModal from '../shared/RequestModal';

const BTC_BALANCE = '2,137';

export const AuthorizedPage = () => {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState('ETH');
  const [ethBalance, setETHBalance] = useState<string | null>(null);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const user = useUser();

  const formattedEmail = keccak256(`0x${user?.email}`);
  const { client } = useSmartAccountClient({
    type: 'LightAccount',
    accountParams: { salt: formattedEmail as any, factoryAddress: '0xdbF3041e4bd1F14FDBC320834d709A5f7E803614' },
  });

  console.log('Account address', client?.account?.address);

  useEffect(() => {
    const fetchBalance = async () => {
      if (client) {
        const address = await client.getAddress();
        if (address) {
          try {
            const balanceResult = await client.getBalance({ address });
            const formattedBalanceEther = formatEther(balanceResult);
            const formattedBalanceFinal = formatBalance(formattedBalanceEther);
            if (activeCurrency === 'ETH') setETHBalance(formattedBalanceFinal);
          } catch (error) {
            console.error('Error fetching balance:', error);
          }
        }
      }
    };

    fetchBalance();
  }, [client, activeCurrency]);

  const handleToggleSendModal = () => {
    setOpenSendModal((prev) => !prev);
  };

  const handleCurrencyClick = (currency: any) => {
    if (currency === 'BTC') {
      setActiveCurrency('BTC');
    } else if (currency === 'ETH') {
      setActiveCurrency('ETH');
    }
  };

  const handleToggleSettingsModal = () => {
    setSettingsModalOpen((prev) => !prev);
  };

  const handleToggleRequestModal = () => {
    setOpenRequestModal((prev) => !prev);
  };

  return (
    <div className='px-[24px] py-[40px]'>
      <SettingsModal open={settingsModalOpen} handleToggleModal={handleToggleSettingsModal} />
      <SendModal open={openSendModal} handleToggleModal={handleToggleSendModal} client={client} activeCurrency={activeCurrency} />
      <RequestModal open={openRequestModal} handleToggleModal={handleToggleRequestModal} client={client} />
      <div className='w-full h-[362px] flex flex-col justify-between bg-gradient rounded-[49px] p-8'>
        <div className='w-full flex items-center justify-between'>
          <div className='text-md'>Hello, Izabela!</div>
          <button onClick={() => setSettingsModalOpen(true)} className='w-[18px] h-[18px]'>
            <Cog6ToothIcon />
          </button>
        </div>
        <div>
          <div className='mb-2 text-lg'>{activeCurrency}</div>
          <p className='text-[32px] font-semibold'>{activeCurrency === 'BTC' ? BTC_BALANCE : ethBalance ? ethBalance : '--'}</p>
        </div>

        <div className='flex justify-between'>
          <IconButton icon={<PlusIcon />} label='Add' />
          <IconButton handleOnClick={() => setOpenSendModal(true)} icon={<ArrowUpRightIcon />} label='Send' />
          <IconButton icon={<ArrowDownIcon />} handleOnClick={() => setOpenRequestModal(true)} label='Request' />
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
        <div className='ml-auto'>{BTC_BALANCE}</div>
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
        <div className='ml-auto'>{ethBalance ?? '--'}</div>
      </button>
    </div>
  );
};
