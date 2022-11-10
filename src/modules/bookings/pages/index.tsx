import { PageHeader } from 'antd';
import { useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { Page } from 'src/components/page';
import { useGetAllHistoryQuery } from '../services/bookingApi';
import { BookingTable } from '../components';

const Bookings = () => {
  const [searchParams] = useSearchParams();
  const paramsObj = qs.parse(searchParams.toString());
  const { data } = useGetAllHistoryQuery(paramsObj, {
    pollingInterval: 5000,
  });
  const title = `Danh sách lịch đặt sân${
    paramsObj.date ? ` - Ngày ${paramsObj.date}` : ''
  }`;

  return (
    <Page pageHeader={{ title: 'Danh sách lịch đặt sân | SportHub' }}>
      <PageHeader title={title}>
        <BookingTable data={data} />
      </PageHeader>
    </Page>
  );
};

export default Bookings;
