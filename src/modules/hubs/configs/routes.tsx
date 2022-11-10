import React from 'react';
import { RouteObject } from 'react-router-dom';
import { GuardRoute } from 'src/components/helpers';

// const HubDetails = React.lazy(() => import('../pages/hub-details'));
const MyHub = React.lazy(() => import('../pages/my-hub'));

const officeRoutes: RouteObject = {
  children: [
    // {
    //   path: '/hubs/:id',
    //   element: <GuardRoute component={HubDetails} />,
    // },
    {
      path: '/my-hub',
      element: <GuardRoute component={MyHub} />,
    },
  ],
};

export default officeRoutes;
