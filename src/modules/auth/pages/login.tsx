import { Image, message, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Page } from 'src/components/page';
import { LoginForm } from '../components';
import { useLoginMutation } from '../services/authApi';
import { Credentials } from '../types';

const Login = () => {
  const [login, { isLoading, isSuccess, error }] = useLoginMutation();

  const _onSubmit = (values: Credentials) => {
    login(values);
  };

  useEffect(() => {
    if (error && 'data' in error) {
      message.error((error.data as any).message);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/my-hub';
      message.success('LogIn successful!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Page
      pageHeader={{ title: 'Login | SportHub' }}
      style={{ maxWidth: '320px', margin: 'auto' }}
    >
      <Typography.Title style={{ textAlign: 'center' }}>
        <Image src='/images/logo.svg' alt='Sport Hub Logo' preview={false} />
      </Typography.Title>
      <LoginForm onSubmit={_onSubmit} isSubmitting={isLoading} />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to='/forgot-password'>Forgot password?</Link>
        <Link to='/sign-up'>Create a new one.</Link>
      </Space>
    </Page>
  );
};

export default Login;
