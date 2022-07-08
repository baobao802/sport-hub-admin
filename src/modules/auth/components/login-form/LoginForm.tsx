import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
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
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input placeholder='Email' prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='Password' prefix={<LockOutlined />} />
      </Form.Item>

      <div className={styles.HStack} style={{ marginBottom: '24px' }}>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </div>

      <Form.Item>
        <Button type='primary' htmlType='submit' block loading={isSubmitting}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
