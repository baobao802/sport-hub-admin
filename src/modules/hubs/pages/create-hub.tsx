import { message, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Page } from 'src/components/page';
import { useAuthentication } from 'src/contexts/authContext';
import { CreateHubForm } from '../components/form';
import { FormValues } from '../components/form/CreateHubForm';
import { useCreateMyHubMutation } from '../services/hubApi';

type Props = {};

const CreateHubPage = (props: Props) => {
  const { userInfo } = useAuthentication();
  const navigate = useNavigate();
  const [createMyHub, { isLoading, isSuccess, isError }] =
    useCreateMyHubMutation();

  const onSubmit = (values: FormValues) => {
    createMyHub({
      payload: {
        name: values.name,
        address: {
          street: values.street,
          district: {
            id: values.district.value,
            name: values.district.label,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (isError) {
      message.error('Create your new hub failed');
    }
    if (isSuccess) {
      message.success('Create your new hub successful');
      navigate('/my-hub');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  if (!userInfo) {
    return <Navigate to='/login' />;
  }

  return (
    <Page
      pageHeader={{ title: 'Tạo mới hub của bạn | SportHub' }}
      style={{ maxWidth: '320px', margin: 'auto' }}
    >
      <Typography.Title style={{ textAlign: 'center', fontSize: '32px' }}>
        Tạo mới hub của bạn
      </Typography.Title>
      <CreateHubForm onSubmit={onSubmit} isSubmitting={isLoading} />
    </Page>
  );
};

export default CreateHubPage;
