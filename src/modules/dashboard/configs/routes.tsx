import React from 'react';
import { RouteObject } from 'react-router-dom';
import { GuardRoute } from 'src/components/helpers';
import { Role } from 'src/types';

const Dashboard = React.lazy(() => import('../pages'));

const dashboardRoutes: RouteObject = {
  path: '/dashboard',
  children: [
    {
      index: true,
      element: <GuardRoute roles={[Role.APP_ADMIN]} component={Dashboard} />,
    },
  ],
};

export default dashboardRoutes;
