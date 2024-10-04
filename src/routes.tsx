import { ErrorPage } from './components/pages/404';
import { Homepage } from './components/pages/Homepage';
import { Example } from './components/pages/Example';
import { Layout } from './Layout';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/example',
        element: <Example />,
      },
    ],
  },
];
