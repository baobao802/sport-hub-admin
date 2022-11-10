import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { PrimaryLayout, SecondaryLayout } from 'src/layouts';
import { authRoutes } from '../modules/auth/configs';
import { dashboardRoutes } from '../modules/dashboard/configs';
import { hubRoutes } from 'src/modules/hubs/configs';
import { bookingRoutes } from 'src/modules/bookings/configs';
import { GuardRoute } from 'src/components/helpers';
import { Role } from 'src/types';

const NotFound = React.lazy(() => import('../404'));
const Forbidden = React.lazy(() => import('../403'));
const AccountPage = React.lazy(() => import('../modules/auth/pages/account'));
const CreateHub = React.lazy(() => import('../modules/hubs/pages/create-hub'));

const rootRoutes: RouteObject[] = [
  {
    element: <PrimaryLayout />,
    children: [
      dashboardRoutes,
      hubRoutes,
      bookingRoutes,
      {
        path: '/account',
        element: (
          <GuardRoute roles={[Role.APP_ADMIN]} component={AccountPage} />
        ),
      },
    ],
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
        path: '/create-hub',
        element: <CreateHub />,
      },
      {
        path: '/404',
        element: <NotFound />,
      },
      {
        path: '/403',
        element: <Forbidden />,
      },
      {
        path: '*',
        element: <Navigate to='/404' replace />,
      },
    ],
  },
];

export default rootRoutes;
