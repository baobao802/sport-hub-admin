import React from 'react';
import { RouteObject } from 'react-router-dom';
import { GuardRoute } from 'src/components/helpers';

const Bookings = React.lazy(() => import('../pages'));

const bookingRoutes: RouteObject = {
  path: '/booking-history',
  children: [
    {
      index: true,
      element: <GuardRoute component={Bookings} />,
    },
  ],
};

export default bookingRoutes;
