import { Image, message, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'src/components/page';
import SignupForm, { FormValues } from '../components/form/SignupForm';
import { useSignupMutation } from '../services/authApi';

const SignUp = () => {
  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();
  const navigate = useNavigate();

  const _onSubmit = (values: FormValues) => {
    const payload = {
      givenName: values.givenName,
      familyName: values.familyName,
      email: values.email,
      username: values.username,
      password: values.password,
      telephone: values.telephone,
      roles: [
        {
          id: '74145c5f-4997-46e6-b254-232acbb87c48',
          name: 'app_admin',
        },
      ],
    };
    signup(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
      message.success('Đăng ký thành công');
    }
    if (error) {
      message.error((error as any).data.message);
    }
  }, [isSuccess, error]);

  return (
    <Page
      pageHeader={{ title: 'Signup | SportHub' }}
      style={{ maxWidth: '420px', margin: 'auto' }}
    >
      <Typography.Title style={{ textAlign: 'center' }}>
        <Image src='/images/logo.svg' alt='Sport Hub Logo' preview={false} />
      </Typography.Title>
      {/* <Button type='primary' size='large' icon={<GoogleOutlined />} ghost block>
        Google
      </Button>
      <Divider orientation='center'>Register</Divider> */}
      <SignupForm onSubmit={_onSubmit} isSubmitting={isLoading} />
    </Page>
  );
};

export default SignUp;
