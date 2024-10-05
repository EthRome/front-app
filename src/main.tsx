import React from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { QueryClient } from '@tanstack/react-query';
import { polygonAmoy } from '@account-kit/infra';
import { createConfig } from '@account-kit/react';
import { AlchemyAccountProvider } from '@account-kit/react';

const uiConfig = {
  illustrationStyle: 'outline',
  auth: {
    sections: [[{ type: 'email' }]],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    // alchemy config
    apiKey: 'zVn9SpYynKkWxaxFm8LfAblXN2ICx1fB', // TODO: add your Alchemy API key - setup your app and embedded account config in the alchemy dashboard (https://dashboard.alchemy.com/accounts)
    chain: polygonAmoy, // TODO: specify your preferred chain here and update imports from @account-kit/infra
    ssr: false, // Defers hydration of the account state to the client after the initial mount solving any inconsistencies between server and client state (read more here: https://accountkit.alchemy.com/react/ssr)
    transport: {
      config: {
        apiKey: 'zVn9SpYynKkWxaxFm8LfAblXN2ICx1fB',
      },
    },
    policyId: 'f04b7a6e-6351-4d0d-b4ff-0ed270f649fe',
  },
  uiConfig
);

export const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlchemyAccountProvider config={config} queryClient={queryClient}>
      <RouterProvider router={router} />
    </AlchemyAccountProvider>
  </React.StrictMode>
);
