import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import styles from './SignupForm.module.css';

export type FormValues = {
  givenName: string;
  familyName: string;
  telephone: string;
  email: string;
  username: string;
  password: string;
};

interface Props {
  isSubmitting?: boolean;
  onSubmit?: (values: FormValues) => void;
}

const SignupForm = (props: Props) => {
  const { isSubmitting, onSubmit } = props;

  return (
    <Form<FormValues>
      name='signup'
      className={styles.container}
      onFinish={onSubmit}
      size='large'
      autoComplete='off'
    >
      <Form.Item name='givenName'>
        <Input placeholder='Họ' prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name='familyName'>
        <Input placeholder='Tên' prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name='telephone'
        rules={[
          {
            required: true,
            message: 'Không hợp lệ!',
          },
          {
            pattern: /(84|0[2|3|5|7|8|9])+([0-9]{8,9})\b/g,
            message: 'không hợp lệ',
          },
        ]}
      >
        <Input placeholder='SĐT' prefix={<PhoneOutlined />} />
      </Form.Item>

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
        <Input.Password placeholder='Mật khẩu' prefix={<LockOutlined />} />
      </Form.Item>

      <Row gutter={[20, 20]}>
        <Col sm={24} md={12}>
          <Link to='/login'>Already have one.</Link>
        </Col>

        <Col sm={24} md={12}>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type='primary' htmlType='submit' loading={isSubmitting}>
              Đăng ký
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SignupForm;
