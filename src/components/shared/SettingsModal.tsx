import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { LogoutButton } from './LogoutButton';

export default function SettingsModal({ open, handleToggleModal }: { open: boolean; handleToggleModal: () => void }) {
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
            <div>
              <div className='mt-3 text-center sm:mt-5'>
                <div className='flex justify-between'>
                  <button className='w-[18px] h-[18px] icon-stroke ml-auto' onClick={handleToggleModal}>
                    <XMarkIcon />
                  </button>
                </div>

                <div className='mt-6 mx-10 mb-16'>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
