import { EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Image,
  message,
  Modal,
  PageHeader,
  Row,
  UploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import Upload, { RcFile } from 'antd/lib/upload';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Page } from 'src/components/page';
import { useAuthentication } from 'src/contexts/authContext';
import { useGetCitiesQuery } from 'src/services/placeApi';
import { City } from 'src/types';
import { PitchCard } from '../components';
import { HubFormModal, PitchFormModal } from '../components/form';
import { FormValues } from '../components/form/HubFormModal';
import {
  useCreatePitchMutation,
  useGetMyHubQuery,
  useUpdateMyHubMutation,
} from '../services/hubApi';
import { Pitch } from '../types';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const MyHub = () => {
  const { userInfo } = useAuthentication();
  const { data, refetch } = useGetMyHubQuery({});
  const cities = useGetCitiesQuery({});
  const [updateMyHub, updateMyHubState] = useUpdateMyHubMutation();
  const [createPitch, createPitchState] = useCreatePitchMutation();
  const [previewCoverImage, setPreviewCoverImage] = useState();
  const [visibleHubModal, setVisibleHubModal] = useState(false);
  const [visiblePitchModal, setVisiblePitchModal] = useState(false);
  const city = _.find(cities.data, (city) =>
    _.find(
      city.districts,
      (district) => district.id === data?.address.district.id,
    ),
  ) as City | undefined;

  const uploadProps: UploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_API_URL}/files/upload`,
    onChange: async (info) => {
      const { status } = info.file;
      if (status === 'done') {
        if (!info.file.response && !info.file.preview) {
          info.file.preview = await getBase64(
            info.file.originFileObj as RcFile,
          );
        }
        updateMyHub({
          payload: { picture: info.file.response.url },
        });
        setPreviewCoverImage(
          info.file.response.url || (info.file.preview as string),
        );
      }
    },
    showUploadList: false,
  };

  const cancelHubModal = () => {
    setVisibleHubModal(false);
  };

  const openHubModal = () => {
    setVisibleHubModal(true);
  };

  const cancelPitchModal = () => {
    setVisiblePitchModal(false);
  };

  const openPitchModal = () => {
    setVisiblePitchModal(true);
  };

  const onSubmit = (values: FormValues) => {
    const payload = {
      name: values.name,
      address: {
        street: values.street,
        district: values.district,
      },
    };
    updateMyHub({ payload });
    cancelHubModal();
  };

  useEffect(() => {
    if (updateMyHubState.isSuccess || createPitchState.isSuccess) {
      message.success('Cập nhật thành công.');
      Modal.destroyAll();
      refetch();
    }
    if (updateMyHubState.isError || createPitchState.isError) {
      message.error('Cập nhật không thành công.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    updateMyHubState.isSuccess,
    updateMyHubState.isError,
    createPitchState.isSuccess,
    createPitchState.isError,
  ]);

  return (
    <Page pageHeader={{ title: `${data?.name} | SportHub` }}>
      <PageHeader
        title={data?.name}
        extra={[
          <Button
            key='edit'
            icon={<EditOutlined />}
            title='Chỉnh sửa thông tin'
            onClick={openHubModal}
          >
            Edit
          </Button>,
        ]}
      >
        {data && (
          <HubFormModal
            title='Cập nhật thông tin'
            visible={visibleHubModal}
            onCancel={cancelHubModal}
            initialValues={{
              name: data.name,
              street: data.address.street,
              district: data.address.district,
              city: city as any,
            }}
            onSubmit={onSubmit}
          />
        )}
        <Row gutter={[20, 20]}>
          <Col sm={24} md={16}>
            <Descriptions column={2}>
              <Descriptions.Item label='SĐT'>
                {userInfo.telephone}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {userInfo.email}
              </Descriptions.Item>
              <Descriptions.Item label='Địa chỉ'>
                {data?.address?.street}, {data?.address.district.name},{' '}
                {city?.name}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          {/* <Col sm={24} md={8}>
            <Space size={'large'}>
              <Statistic title='Doanh thu' prefix='$' value={568.08} />
              <Statistic title='Lợi nhuận' prefix='$' value={3345.08} />
            </Space>
          </Col> */}
        </Row>

        <div style={{ height: 280, position: 'relative' }}>
          <Image
            src={
              previewCoverImage ||
              data?.picture ||
              'https://via.placeholder.com/1280x480.png'
            }
            width='100%'
            height={280}
            style={{ objectFit: 'cover' }}
          />
          <span style={{ position: 'absolute', top: 0, right: 0 }}>
            <ImgCrop aspect={3 / 2}>
              <Upload {...uploadProps}>
                <Button
                  type='dashed'
                  icon={<UploadOutlined />}
                  style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                >
                  Upload
                </Button>
              </Upload>
            </ImgCrop>
          </span>
        </div>

        <div>
          <PitchFormModal
            title='Tạo sân bóng'
            visible={visiblePitchModal}
            onCancel={cancelPitchModal}
            onSubmit={(values) => {
              createPitch({ payload: values });
              cancelPitchModal();
            }}
          />
          <Card
            title='Sân bóng'
            extra={
              <Button
                key='add'
                icon={<PlusOutlined />}
                title='Thêm sân bóng'
                onClick={openPitchModal}
              >
                Thêm
              </Button>
            }
            bordered={false}
            headStyle={{ padding: 0, border: 'none' }}
            bodyStyle={{ padding: 0 }}
          >
            <Row gutter={[20, 20]}>
              {_.map(data?.pitches, (pitch: Pitch) => (
                <Col sm={24} md={12} lg={8} xl={6} key={pitch.id}>
                  <PitchCard data={pitch} refetch={refetch} />
                </Col>
              ))}
              {!data?.pitches ||
                (_.size(data?.pitches) === 0 && (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{ margin: 'auto' }}
                  />
                ))}
            </Row>
          </Card>
        </div>
      </PageHeader>
    </Page>
  );
};

export default MyHub;
