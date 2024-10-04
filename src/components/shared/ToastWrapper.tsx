import { ToastContainer } from 'react-toastify';

export default function ToastWrapper() {
  return (
    <ToastContainer
      position='bottom-right'
      theme='dark'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className='toast-container'
    />
  );
}
