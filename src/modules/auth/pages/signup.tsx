import { GoogleOutlined } from '@ant-design/icons';
import { Button, Divider, Image, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { LoginForm } from '../components';
import { useLoginMutation } from '../services/authApi';
import { setCredentials } from '../services/authSlice';
// import { Credentials } from '../types';

const SignUp = () => {
  const [login, { data, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const _onSubmit = (values: Credentials) => {
  //   login(values);
  // };

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
      navigate('/dashboard');
    }
  }, [data, dispatch, navigate]);

  return (
    <div style={{ maxWidth: '320px', margin: 'auto' }}>
      <Typography.Title style={{ textAlign: 'center' }}>
        <Image src='/images/logo.svg' alt='Sport Hub Logo' preview={false} />
      </Typography.Title>
      <Button type='primary' size='large' icon={<GoogleOutlined />} ghost block>
        Google
      </Button>
      <Divider orientation='center'>Register</Divider>
      {/* <LoginForm onSubmit={_onSubmit} isSubmitting={isLoading} /> */}
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to='/login'>Already have one.</Link>
      </Space>
    </div>
  );
};

export default SignUp;
