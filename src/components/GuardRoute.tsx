import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectAuth } from 'src/modules/auth/services/authSlice';

type Props = {
  children?: JSX.Element;
};

const GuardRoute = (props: Props) => {
  const { user } = useSelector(selectAuth);
  const location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return props?.children || <Outlet />;
};

export default GuardRoute;
