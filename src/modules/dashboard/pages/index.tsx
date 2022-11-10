import { PageHeader } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/components/page';

type Props = {};

const Dashboard = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Page pageHeader={{ title: 'Dashboard | SportHub' }}>
      <PageHeader title=''>
        <div>{t('welcome', { username: 'Bob' })}</div>
      </PageHeader>
    </Page>
  );
};

export default Dashboard;
