import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { PrimaryLayout, SecondaryLayout } from 'src/layouts';
import { authRoutes } from '../modules/auth/configs';
import { customerRoutes } from '../modules/customers/configs';
import { dashboardRoutes } from '../modules/dashboard/configs';

const NotFound = React.lazy(() => import('../404'));

const rootRoutes: RouteObject[] = [
  {
    element: <PrimaryLayout />,
    children: [dashboardRoutes, customerRoutes],
  },
  {
    element: <SecondaryLayout />,
    children: [
      authRoutes,
      {
        path: '/',
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: '/404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to='/404' replace />,
      },
    ],
  },
];

export default rootRoutes;
