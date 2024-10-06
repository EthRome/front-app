import { useSendUserOperation, useSmartAccountClient, useUser } from '@account-kit/react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { encodeFunctionData, formatEther, keccak256 } from 'viem';
import { showToast } from '../../utils/helpers/showToast';
import paymentHandlerABI from '../../../abi/PaymentHandler.json';
import { useReadContract } from 'wagmi';
import SpinnerLoader from './SpinnerLoader';
import { PAYMENT_HANDLER_ADDRESS } from '../../utils/contracts';

export default function FeasyModal({ open, handleToggleModal }: { open: boolean; handleToggleModal: () => void }) {
  const [feasyCode, setFeasyCode] = useState('');
  const user = useUser();

  const {
    data: balance,
    isLoading,
    error,
  } = useReadContract({
    abi: paymentHandlerABI.abi,
    address: '0xe98481c675446F7CAC1Fbc0810dAb30a3eB1724a',
    functionName: 'readCodeToValue',
    args: [feasyCode],
  });

  const isSuccess = Boolean(!isLoading && !error && balance);

  const formattedEmail = keccak256(`0x${user?.email}`);
  const { client } = useSmartAccountClient({
    type: 'LightAccount',
    accountParams: { salt: formattedEmail as any, factoryAddress: '0xdbF3041e4bd1F14FDBC320834d709A5f7E803614' },
  });

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      console.log(hash, request);
      showToast('Transaction sent', 'success');
      handleToggleModal();
    },
    onError: (error) => {
      console.log(error);
      showToast('Transaction rejected', 'error');
    },
  });

  const handleInputChange = async (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 6) value = value.slice(0, 6);

    setFeasyCode(value);
  };

  const acceptPayment = async (code) => {
    const tx = encodeFunctionData({
      abi: paymentHandlerABI.abi,
      functionName: 'fulfillCode',
      args: [feasyCode],
    });

    sendUserOperation({
      uo: {
        target: PAYMENT_HANDLER_ADDRESS,
        data: tx,
        value: balance || 0,
      },
    });
  };

  const handleRejectPayment = () => {
    handleToggleModal();
  };

  return (
    <Dialog open={open} onClose={handleToggleModal} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-black bg-opacity-35 backdrop-blur transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='w-full relative transform overflow-hidden rounded-2xl bg-[#130042] opacity-95 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
          >
            <div className='mt-3 text-center sm:mt-5'>
              <div className='flex justify-between'>
                <button className='w-[18px] h-[18px] icon-stroke ml-auto' onClick={handleToggleModal}>
                  <XMarkIcon />
                </button>
              </div>
              <div className='flex flex-col justify-center items-center mt-8'>
                <div className='text-2xl font-semibold mb-4'>Enter Feasy Code:</div>
                <input
                  type='text'
                  placeholder='Type here'
                  value={feasyCode}
                  onChange={handleInputChange}
                  maxLength={6}
                  className='input text-2xl font-semibold text-gray-900 rounded-2xl w-[80%] bg-purple p-2 mt-6 mb-8 flex justify-center items-center text-center'
                />

                <div>
                  <div className='mb-8'>
                    <div className='text-xl font-semibold'>{isSuccess ? `Value: ${formatEther(balance as bigint)}` : 'Value: --'}</div>
                  </div>
                  <div className='w-full flex justify-center gap-[20px]'>
                    <button
                      disabled={isSendingUserOperation}
                      onClick={handleRejectPayment}
                      className='btn bg-gray inline-flex w-[100px] justify-center rounded-3xl px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Reject
                    </button>
                    <button
                      onClick={acceptPayment}
                      className='btn inline-flex w-[100px] justify-center rounded-3xl bg-gradient px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      {isSendingUserOperation ? <SpinnerLoader className='h-[30px] w-[30px] aspect-square' /> : 'Accept'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
