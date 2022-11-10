import _ from 'lodash';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentication } from 'src/contexts/authContext';
import { Role } from 'src/types';

type Props = {
  component: React.ComponentType<any>;
  roles?: Role[] | false | null | undefined;
};

const GuardRoute = (props: Props) => {
  const { component: Component, roles } = props;
  const { userInfo } = useAuthentication();
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (!roles) {
    return <Component />;
  }

  const checkAuthorization = (roles?: Role[]) => {
    if (roles) {
      return _.some(roles, (role) => _.includes(userInfo.roles, role));
    }
    return false;
  };

  if (!checkAuthorization(roles)) {
    return <Navigate to='/403' state={{ from: location }} replace />;
  }

  return <Component />;
};

export default GuardRoute;
