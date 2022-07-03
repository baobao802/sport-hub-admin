import { GoogleOutlined } from '@ant-design/icons';
import { Button, Divider, Image, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components';
import { Credentials } from '../types';

type Props = {};

const Login = (props: Props) => {
  const _onSubmit = (values: Credentials) => {
    console.log('Success:', values);
  };

  return (
    <div style={{ maxWidth: '320px', margin: 'auto' }}>
      <Typography.Title style={{ textAlign: 'center' }}>
        <Image src='/images/logo.svg' alt='Sport Hub Logo' preview={false} />
      </Typography.Title>
      <Button type='primary' size='large' icon={<GoogleOutlined />} ghost block>
        Google
      </Button>
      <Divider orientation='center'>OR</Divider>
      <LoginForm onSubmit={_onSubmit} />
      <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Link>Forgot password?</Typography.Link>
        <Typography.Link>
          <Link to='/sign-up'>Create a new one.</Link>
        </Typography.Link>
      </Space>
    </div>
  );
};

export default Login;
