import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from './utils/constants';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const mainHeight = `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`;

  return (
    <div>
      <Navbar />
      <main style={{ height: mainHeight }} className='p-10'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
