import React from 'react';
import type { RouteObject } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/login'));
const SignUp = React.lazy(() => import('../pages/signup'));

const authRoutes: RouteObject = {
  children: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
  ],
};
export default authRoutes;
