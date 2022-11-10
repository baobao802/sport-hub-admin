import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Credentials } from '../../types';
import styles from './LoginForm.module.css';

type Props = {
  initialValues?: Partial<Credentials>;
  isSubmitting?: boolean;
  onSubmit?: (values: Credentials) => void;
};

const LoginForm = (props: Props) => {
  const { initialValues, isSubmitting, onSubmit } = props;

  return (
    <Form
      name='login'
      className={styles.container}
      initialValues={initialValues}
      onFinish={onSubmit}
      size='large'
      autoComplete='off'
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder='Username' prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='Password' prefix={<LockOutlined />} />
      </Form.Item>

      {/* <div className={styles.HStack} style={{ marginBottom: '24px' }}>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </div> */}

      <Form.Item>
        <Button type='primary' htmlType='submit' block loading={isSubmitting}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
