import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import ethereum from '/ethereum.png';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSendUserOperation } from '@account-kit/react';
import { useState } from 'react';
import SpinnerLoader from './SpinnerLoader';
import { showToast } from '../../utils/helpers/showToast';
import { encodeFunctionData, keccak256, pad } from 'viem';
import paymentHandlerABI from '../../../abi/PaymentHandler.json';

export default function RequestModal({ open, handleToggleModal, client }: { open: boolean; handleToggleModal: () => void; client: any }) {
  const [amount, setAmount] = useState('');
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
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
            className='relative transform overflow-hidden rounded-2xl bg-[#130042] opacity-95 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
          >
            <div>
              <div className='mt-3 text-left sm:mt-5'>
                <div className='flex justify-between items-center mx-8'>
                  <div className='flex items-center space-x-4'>
                    <img src={ethereum} alt='Ethereum' />
                    <div className='text-base font-semibold leading-6 text-gray-900'>ETH</div>
                  </div>
                  <button className='w-[18px] h-[18px] icon-stroke' onClick={handleToggleModal}>
                    <XMarkIcon />
                  </button>
                </div>

                <div className='mt-6 mx-10 mb-16'>
                  <p className='text-sm text-gray-500 mb-2'>Request an amount</p>
                  <input type='text' value={amount} onChange={handleAmountChange} placeholder='Type here' className='input w-full max-w-xs bg-[#4B237E]' />
                </div>
              </div>
            </div>
            <div className='mt-5 sm:mt-6 justify-center flex mb-4'>
              <button
                type='button'
                onClick={() => {}}
                className='btn inline-flex w-[30%] justify-center rounded-3xl bg-gradient px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {isSendingUserOperation ? <SpinnerLoader className='h-[30px] w-[30px] aspect-square ' /> : 'Request'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
