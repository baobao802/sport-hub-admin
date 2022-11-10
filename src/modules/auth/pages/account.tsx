import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, message, Row } from 'antd';
import React, { useEffect } from 'react';
import { Page } from 'src/components/page';
import { useAuthentication } from 'src/contexts/authContext';
import { AccountForm } from '../components';
import {
  useUpdatePasswordMutation,
  useUpdateUserInfoMutation,
} from '../services/authApi';

const AccountPage = () => {
  const { userInfo } = useAuthentication();
  const [updateUserInfo, userInfoState] = useUpdateUserInfoMutation();
  const [updatePassword, passwordState] = useUpdatePasswordMutation();

  useEffect(() => {
    if (userInfoState.isSuccess) {
      message.success('Cập nhật thông tin tài khoản thành công.');
    }
    if (userInfoState.error) {
      message.error((userInfoState.error as any).data.message);
    }
  }, [userInfoState.isSuccess, userInfoState.error]);

  useEffect(() => {
    if (passwordState.isSuccess) {
      message.success('Cập nhật mật khẩu thành công.');
    }
    if (passwordState.error) {
      message.error((passwordState.error as any).data.message);
    }
  }, [passwordState.isSuccess, passwordState.error]);

  return (
    <Page
      pageHeader={{ title: `My account | SportHub` }}
      style={{ padding: '16px 24px' }}
    >
      <Divider orientation='left' orientationMargin={0}>
        Information
      </Divider>
      <AccountForm
        initialValues={{
          givenName: userInfo.givenName,
          familyName: userInfo.familyName,
          email: userInfo.email,
          telephone: userInfo.telephone,
        }}
        onSubmit={(values) => updateUserInfo({ payload: values })}
        isSubmitting={userInfoState.isLoading}
      />
      <Divider orientation='left' orientationMargin={0}>
        Security
      </Divider>
      <Form
        name='account'
        onFinish={(values) => updatePassword({ payload: values })}
        autoComplete='off'
      >
        <Row gutter={[20, 20]}>
          <Col sm={24} md={6}>
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Required!' }]}
            >
              <Input.Password
                placeholder='Mật khẩu hiện tại'
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={6}>
            <Form.Item
              name='newPassword'
              rules={[{ required: true, message: 'Required!' }]}
            >
              <Input.Password
                placeholder='Mật khẩu mới'
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Page>
  );
};

export default AccountPage;
