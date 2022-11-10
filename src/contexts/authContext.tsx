import React, { useContext, useEffect } from 'react';
import { message } from 'antd';
import { useAuthenticateQuery } from 'src/modules/auth/services/authApi';
import { UserInfo } from 'src/types';

export type AuthContextType = {
  userInfo: UserInfo;
  isAuthenticating: boolean;
};

export const AuthContext = React.createContext<AuthContextType>({
  userInfo: null as any,
  isAuthenticating: false,
});

export const AuthProvider = (props: any) => {
  const authentication = useAuthenticateQuery({});

  useEffect(() => {
    if (authentication.isSuccess) {
      message.success('Authenticated!');
    }
    if (authentication.isError) {
      message.error('Unauthenticated!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authentication.isSuccess, authentication.isError]);

  return (
    <AuthContext.Provider
      value={{
        userInfo: authentication.data!,
        isAuthenticating: authentication.isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthContext);
