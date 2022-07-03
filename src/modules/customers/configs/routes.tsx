import React from 'react';
import { RouteObject } from 'react-router-dom';
import { GuardRoute } from 'src/components';

const Customers = React.lazy(() => import('../pages'));
const CustomerDetails = React.lazy(() => import('../pages/customer-details'));

const customerRoutes: RouteObject = {
  path: '/customers',
  element: <GuardRoute />,
  children: [
    {
      index: true,
      element: <Customers />,
    },
    {
      path: '/customers/:id',
      element: <CustomerDetails />,
    },
  ],
};

export default customerRoutes;
