import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { Booking, BookingResponse, BookingStatus } from '../../types';
import BookingFilter from './BookingFilter';
// import styles from './BookingTable.module.css';

interface Props {
  data?: BookingResponse;
}

const columns: ColumnsType<Booking> = [
  {
    title: 'Người thuê',
    dataIndex: 'customer',
    width: 180,
    render(value) {
      return value.fullName;
    },
  },
  // {
  //   title: 'Số điện thoại',
  //   dataIndex: 'customer',
  //   width: 150,
  //   render(value) {
  //     return value.telephone;
  //   },
  // },
  {
    title: 'Email',
    dataIndex: 'customer',
    width: 180,
    render(value) {
      return value.email;
    },
  },
  {
    title: 'Tên Sân',
    dataIndex: 'pitch',
    width: 120,
    render(value) {
      return value.name;
    },
  },
  {
    title: 'Khung giờ',
    dataIndex: 'time',
    width: 150,
    render(value, record) {
      return `${record.time}, ${record.date}`;
    },
  },
  {
    title: 'Giá thuê (VNĐ)',
    dataIndex: 'cost',
    width: 100,
    align: 'right',
    render(value) {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 80,
    render: (_, record) => {
      if (record.status === BookingStatus.CANCEL) {
        return <Tag color='error'>Đã hủy</Tag>;
      }
      return <Tag color='success'>Hoàn thành</Tag>;
    },
  },
  {
    title: 'Thời gian thuê',
    dataIndex: 'createdAt',
    width: 150,
    render(value) {
      return moment(value).format('DD/MM/YYYY, HH:mm:ss');
    },
  },
  {
    title: 'Thời gian hủy',
    dataIndex: 'deletedAt',
    width: 150,
    render(value) {
      return value && moment(value).format('DD/MM/YYYY, HH:mm:ss');
    },
  },
];

const BookingTable = (props: Props) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <BookingFilter />
      </div>
      <Table
        columns={columns}
        dataSource={props.data?.items}
        scroll={{
          x: 1200,
        }}
        pagination={{
          total: props.data?.meta?.totalItems,
          defaultCurrent: props.data?.meta?.currentPage,
          defaultPageSize: props.data?.meta?.itemsPerPage,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page) => {
            setSearchParams({
              page: String(page),
            });
          },
        }}
      />
    </div>
  );
};

export default BookingTable;
