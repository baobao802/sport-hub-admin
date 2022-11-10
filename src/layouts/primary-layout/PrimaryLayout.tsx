import { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  MenuProps,
  Avatar,
  Badge,
  Button,
  Dropdown,
  message,
} from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './PrimaryLayout.module.css';
import { menuConfigAsDefault, menuConfigAsAdmin } from '../../configs';
import {
  DeliveredProcedureOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Role } from 'src/types';
import {
  getListUnreadNotifications,
  markAsReadNotification,
} from 'src/services/notification-firebase';
import { selectNotifications, setNotifications } from 'src/services/appSlice';
import _ from 'lodash';
import { useAuthentication } from 'src/contexts/authContext';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from 'src/modules/auth/services/authApi';
import { useGetMyHubQuery } from 'src/modules/hubs/services/hubApi';

const { Header, Content, Footer, Sider } = Layout;

const PrimaryLayout = () => {
  const { userInfo } = useAuthentication();
  const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation();
  const [collapsed, setCollapsed] = useState(false);
  const { data: myhub } = useGetMyHubQuery({});
  const unreadNotifications = useSelector(selectNotifications);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedKeys = location.pathname.split('/').splice(1, 1);
  const openKeys = location.pathname.split('/').splice(1, 1);

  const getMenuConfig = () => {
    if (_.includes(userInfo?.roles, Role.APP_ADMIN)) {
      return menuConfigAsAdmin;
    }
    return menuConfigAsDefault;
  };

  const menuAccountControl = (
    <Menu
      items={[
        {
          key: 'account',
          label: (
            <Button
              type='link'
              icon={<UserOutlined />}
              onClick={() => navigate('/account')}
            >
              Account
            </Button>
          ),
        },
        {
          key: 'logout',
          label: (
            <Button
              type='link'
              icon={<LogoutOutlined />}
              onClick={() => logout({})}
            >
              Logout
            </Button>
          ),
        },
      ]}
    />
  );

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    if (myhub) {
      getListUnreadNotifications(myhub.id as string, (values) => {
        dispatch(setNotifications(values));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myhub]);

  useEffect(() => {
    if (isLogoutSuccess) {
      navigate('/login');
      message.success('Logout successful!!!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogoutSuccess]);

  return (
    <div className={styles.root}>
      <Layout hasSider style={{ minHeight: '100vh' }}>
        <Sider
          className={styles.slider}
          width={220}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className={styles.logo} />
          <Menu
            onClick={onClick}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            mode='inline'
            theme='dark'
            items={getMenuConfig()}
          />
        </Sider>
        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <Badge
              size='small'
              count={_.size(unreadNotifications)}
              offset={[-2, 2]}
            >
              <Button
                shape='circle'
                type='default'
                icon={<DeliveredProcedureOutlined />}
                ghost
                onClick={() => {
                  _.size(unreadNotifications) > 0 &&
                    markAsReadNotification(
                      myhub?.id as string,
                      unreadNotifications,
                    );
                  navigate('/booking-history');
                }}
              />
            </Badge>

            <Dropdown
              overlay={menuAccountControl}
              placement='bottomRight'
              arrow
            >
              <Link to='/account'>
                <Avatar icon={<UserOutlined />} />
              </Link>
            </Dropdown>
          </Header>
          <Content className={styles.content}>
            <div className={styles.innerContent}>
              <Outlet />
            </div>
          </Content>
          <Footer className={styles.footer}>
            {/* Ant Design ©2018 Created by Ant UED */}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default PrimaryLayout;
