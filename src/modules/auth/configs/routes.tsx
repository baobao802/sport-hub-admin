import React from 'react';
import type { RouteObject } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/login'));

const authRoutes: RouteObject = {
  path: '/login',
  element: <Login />,
};
export default authRoutes;
