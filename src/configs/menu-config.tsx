import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  DeliveredProcedureOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const menuConfigAsDefault: MenuProps['items'] = [
  getItem('Dashboard', 'dashboard', <DashboardOutlined />),

  getItem('Navigation One', 'items1', <MailOutlined />, [
    getItem(
      'Item 1',
      'g1',
      null,
      [
        getItem('Option 1', '/items1/item1'),
        getItem('Option 2', '/items1/item2'),
      ],
      'group',
    ),
    getItem(
      'Item 2',
      'g2',
      null,
      [
        getItem('Option 3', '/items1/item3'),
        getItem('Option 4', '/items1/item4'),
      ],
      'group',
    ),
  ]),

  getItem('Navigation Two', 'items2', <AppstoreOutlined />, [
    getItem('Option 5', '/items2/item1'),
    getItem('Option 6', '/items2/item2'),
    getItem('Submenu', '/items2/item3', null, [
      getItem('Option 7', '/items2/item3/sub-item1'),
      getItem('Option 8', '/items2/item3/sub-item2'),
    ]),
  ]),

  getItem('Navigation Three', 'items3', <SettingOutlined />, [
    getItem('Option 9', '/items3/item1'),
    getItem('Option 10', '/items3/item2'),
    getItem('Option 11', '/items3/item3'),
    getItem('Option 12', '/items3/item4'),
  ]),
];

// export const menuConfigAsAdmin: MenuProps['items'] = [
//   getItem('Dashboard', 'dashboard', <DashboardOutlined />),

//   getItem('Users', 'users', <UserOutlined />),

//   getItem('hubs', 'hubs', <AppstoreOutlined />),
// ];

export const menuConfigAsAdmin: MenuProps['items'] = [
  // getItem('Dashboard', 'dashboard', <DashboardOutlined />),

  getItem('My Hub', 'my-hub', <AppstoreAddOutlined />),

  getItem('My Account', 'account', <UserOutlined />),

  getItem('Lịch sử đặt sân', 'booking-history', <DeliveredProcedureOutlined />),
];
