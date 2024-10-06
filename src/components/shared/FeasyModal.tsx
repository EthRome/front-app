import { useSendUserOperation, useSmartAccountClient, useUser } from '@account-kit/react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { encodeFunctionData, keccak256 } from 'viem';
import { showToast } from '../../utils/helpers/showToast';
import paymentHandlerABI from '../../../abi/PaymentHandler.json';
import { useReadContract } from 'wagmi';

export default function FeasyModal({ open, handleToggleModal }: { open: boolean; handleToggleModal: () => void }) {
  const [feasyCode, setFeasyCode] = useState('');
  const [error, setError] = useState('');

  const user = useUser();

  const data = useReadContract({
    abi: paymentHandlerABI.abi,
    address: '0xe98481c675446F7CAC1Fbc0810dAb30a3eB1724a',
    functionName: 'readCodeToValue',
    args: [feasyCode],
  })

  console.log(data.data);

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
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 6) value = value.slice(0, 6); // Limit to 6 digits

    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3); // Insert hyphen after 3 digits
    }

    setFeasyCode(value);
  };

  const acceptPayment = async (code) => {
    const tx = encodeFunctionData({
      abi: paymentHandlerABI.abi,
      functionName: 'fulfillCode',
      args: [code],
    });

    sendUserOperation({
      uo: {
        target: '0x4DbA50B0CEC84784D64eCF2418Cf40bee1d5CA06',
        data: tx,
        value: data || 0,
      },
    });
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
                  maxLength={7} // 6 digits + 1 hyphen
                  className='input text-2xl font-semibold text-gray-900 rounded-2xl w-[80%] bg-purple p-2 mt-6 mb-8 flex justify-center items-center text-center'
                />
                {/* Display the response information below */}
                {/* {error && <div className='text-red-500 mt-4'>{error}</div>} */}
                {data && (
                  <div>
                    <div className='mt-4'>
                      <div className='text-xl font-semibold'>Value: {data}</div>
                    </div>
                    <button onClick={acceptPayment}>Accept</button>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
