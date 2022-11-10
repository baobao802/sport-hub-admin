import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';

export type FormValues = {
  givenName: string;
  familyName: string;
  telephone: string;
  email: string;
};

interface Props {
  isSubmitting?: boolean;
  initialValues?: FormValues;
  onSubmit?: (values: FormValues) => void;
}

const AccountForm = (props: Props) => {
  const { isSubmitting, initialValues, onSubmit } = props;

  return (
    <Form<FormValues>
      name='account'
      initialValues={initialValues}
      onFinish={onSubmit}
      autoComplete='off'
      style={{ maxWidth: 420 }}
    >
      <Row gutter={[20, 20]}>
        <Col sm={24} md={10}>
          <Form.Item name='givenName'>
            <Input placeholder='Họ' prefix={<UserOutlined />} />
          </Form.Item>
        </Col>

        <Col sm={24} md={10}>
          <Form.Item name='familyName'>
            <Input placeholder='Tên' prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col sm={24} md={12}>
          <Form.Item
            name='telephone'
            rules={[
              {
                required: true,
                message: 'Required!',
              },
              {
                pattern: /(84|0[2|3|5|7|8|9])+([0-9]{8,9})\b/g,
                message: 'Invalid!',
              },
            ]}
          >
            <Input placeholder='SĐT' prefix={<PhoneOutlined />} />
          </Form.Item>
        </Col>

        <Col sm={24} md={12}>
          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid email!',
              },
              {
                required: true,
                message: 'Required!',
              },
            ]}
          >
            <Input placeholder='Email' prefix={<MailOutlined />} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isSubmitting}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountForm;
