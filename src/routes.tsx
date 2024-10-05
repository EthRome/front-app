import { ErrorPage } from './components/pages/404';
import { Homepage } from './components/pages/Homepage';
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
    ],
  },
];
