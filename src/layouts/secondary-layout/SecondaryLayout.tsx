import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styles from './SecondaryLayout.module.css';

const { Content, Header, Footer } = Layout;

const SecondaryLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}></Header>
      <Content className={styles.content}>
        <div className={styles.innerContent}>
          <Outlet />
        </div>
      </Content>
      <Footer className={styles.footer}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default SecondaryLayout;
