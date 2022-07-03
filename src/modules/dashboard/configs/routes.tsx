import React from 'react';
import { RouteObject } from 'react-router-dom';
import { GuardRoute } from 'src/components';

const Dashboard = React.lazy(() => import('../pages'));

const dashboardRoutes: RouteObject = {
  path: '/',
  element: <GuardRoute />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
  ],
};

export default dashboardRoutes;
