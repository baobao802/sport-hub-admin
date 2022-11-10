import { EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  message,
  PageHeader,
  Row,
  Space,
  Statistic,
  Tag,
  Upload,
  UploadProps,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Page } from 'src/components/page';
import { HubCard } from '../components';
import { HubModal } from '../components/modal';
import { MY_HUBS } from './_mock';

type Props = {};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const routes = [
  {
    path: '/hubs',
    breadcrumbName: 'Hubs',
  },
  {
    path: '',
    breadcrumbName: "Hub's Name",
  },
];

const HubDetails = (_props: Props) => {
  const { id } = useParams();
  const [coverImage, setCoverImage] = useState<UploadFile>();
  const [previewCoverImage, setPreviewCoverImage] = useState('');
  const [visibleHubModal, setVisibleHubModal] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: async (info) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        setCoverImage(info.file);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        if (!info.file.url && !info.file.preview) {
          info.file.preview = await getBase64(
            info.file.originFileObj as RcFile,
          );
        }
        setPreviewCoverImage(info.file.url || (info.file.preview as string));
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
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

  return (
    <Page pageHeader={{ title: 'Hub Details | SportHub' }}>
      <PageHeader
        onBack={() => window.history.back()}
        title="Hub's name"
        breadcrumb={{
          routes,
          itemRender(route) {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? (
              <span>{route.breadcrumbName}</span>
            ) : (
              <Link to={route.path}>{route.breadcrumbName}</Link>
            );
          },
        }}
        extra={[
          <Button
            key='edit'
            icon={<EditOutlined />}
            title="Edit user's information"
            onClick={openHubModal}
          >
            Edit
          </Button>,
        ]}
      >
        <HubModal visible={visibleHubModal} onCancel={cancelHubModal} />
        <Row gutter={[20, 20]}>
          <Col sm={24} md={16}>
            <Descriptions column={2}>
              <Descriptions.Item label='Status'>
                <Tag color='success'>Open</Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Telephone'>
                1810000000
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                sporthub@gmail.com
              </Descriptions.Item>
              <Descriptions.Item label='Open Time'>
                5:30AM - 8:30AM, 4:30PM - 21:30PM
              </Descriptions.Item>
              <Descriptions.Item label='Address'>
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col sm={24} md={8}>
            <Space size={'large'}>
              <Statistic title='Price' prefix='$' value={568.08} />
              <Statistic title='Balance' prefix='$' value={3345.08} />
            </Space>
          </Col>
        </Row>

        <div style={{ height: 280, position: 'relative' }}>
          <Image
            src={previewCoverImage}
            width='100%'
            height={280}
            style={{ objectFit: 'cover' }}
          />
          <span style={{ position: 'absolute', top: 0, right: 0 }}>
            <ImgCrop aspect={3 / 2}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </ImgCrop>
          </span>
        </div>

        <div>
          <Card
            title='My assets'
            extra={
              <Button key='add' icon={<PlusOutlined />} title='Add a new pitch'>
                Add
              </Button>
            }
            bordered={false}
            headStyle={{ padding: 0, border: 'none' }}
            bodyStyle={{ padding: 0 }}
          >
            <Row gutter={[20, 20]}>
              {MY_HUBS.map((hub) => (
                <Col sm={24} md={12} lg={8} xl={6} key={hub.id}>
                  <HubCard hub={hub} path={`/hubs/mine/${hub.id}`} />
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </PageHeader>
    </Page>
  );
};

export default HubDetails;
