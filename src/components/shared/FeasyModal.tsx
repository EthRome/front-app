import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function FeasyModal({ open, handleToggleModal }: { open: boolean; handleToggleModal: () => void }) {
  const [feasyCode, setFeasyCode] = useState('');
  const [responseInfo, setResponseInfo] = useState({ info1: '', info2: '' });
  const [error, setError] = useState('');

  const handleInputChange = async (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 6) value = value.slice(0, 6); // Limit to 6 digits

    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3); // Insert hyphen after 3 digits
    }

    setFeasyCode(value);

    // If 6 digits are entered (making it 7 characters including the hyphen), trigger the submission
    if (value.length === 7) {
      await handleSubmit(value);
    }
  };

  const handleSubmit = async (code) => {
    try {
      // Send request to backend with the Feasy code
      const response = await fetch('https://your-backend-api.com/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feasyCode: code }),
      });

      const data = await response.json();

      // Check for errors in the response
      if (response.ok) {
        setResponseInfo({ info1: data.info1, info2: data.info2 });
        setError(''); // Clear any previous errors
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
      setResponseInfo({ info1: '', info2: '' }); // Clear previous response info
    }
  };

  const acceptPayment = async () => {};

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
                {error && <div className='text-red-500 mt-4'>{error}</div>}
                {responseInfo.info1 && (
                  <div>
                    <div className='mt-4'>
                      <div className='text-xl font-semibold'>Info 1: {responseInfo.info1}</div>
                      <div className='text-xl font-semibold'>Info 2: {responseInfo.info2}</div>
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
