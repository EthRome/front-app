import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from './utils/constants';
import { Outlet } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH0_DOMAIN = 'dev-6kgz5p07e0chsfvl.us.auth0.com';
const AUTH0_CLIENT_ID = 'yaqIhZaWz5iTGb0CQOcX1t4nm3mUNoPT';
export const AUTH0_REDIRECT_ADDRESS = 'http://localhost:5173/';

export const Layout = () => {
  const mainHeight = `calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`;

  return (
    <>
      <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: AUTH0_REDIRECT_ADDRESS,
        }}
      >
        <Navbar />
        <main style={{ height: mainHeight }} className='p-10'>
          <Outlet />
        </main>
        <Footer />
      </Auth0Provider>
    </>
  );
};
