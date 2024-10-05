import { useState } from 'react';
import ExampleModal from '../shared/SendModal';
import SpinnerLoader from '../shared/SpinnerLoader';

export const Example = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-10'>
      <h1 className='mb-10'>Example Page</h1>
      <button onClick={handleToggleModal} className='btn btn-primary w-[200px]'>
        Toggle Modal
      </button>
      <ExampleModal open={openModal} handleToggleModal={handleToggleModal} />
      <SpinnerLoader />
    </div>
  );
};
