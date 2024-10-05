// import { Navbar } from './components/shared/Navbar';
// import { Footer } from './components/shared/Footer';
// import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from './utils/constants';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const mainHeight = `calc(100dvh)`;

  return (
    <>
      {/* <Navbar /> */}
      <main style={{ minHeight: mainHeight }} className='pt-[10px] pb-[40px]'>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};
