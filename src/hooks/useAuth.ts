import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from 'src/modules/auth/services/authSlice';

const useAuth = () => {
  const { user } = useSelector(selectAuth);
  return useMemo(() => ({ user }), [user]);
};

export default useAuth;
