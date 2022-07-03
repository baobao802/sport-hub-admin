import { useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Menu,
  MenuProps,
  Avatar,
  Badge,
  Button,
} from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './PrimaryLayout.module.css';
import { menuConfig } from '../../configs';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const PrimaryLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className={styles.logo} />
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['/items1/item1']}
          defaultOpenKeys={['items1']}
          mode='inline'
          theme='dark'
          items={menuConfig}
        />
      </Sider>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Badge size='small' count={5} offset={[-2, 2]}>
            <Button
              shape='circle'
              type='default'
              icon={<BellOutlined />}
              ghost
            />
          </Badge>

          <Avatar icon={<UserOutlined />} />
        </Header>
        <Content className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.innerContent}>
            <Outlet />
          </div>
        </Content>
        <Footer className={styles.footer}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PrimaryLayout;
