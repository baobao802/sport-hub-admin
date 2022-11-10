import { Button, DatePicker, Form, Select } from 'antd';
import { useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import _ from 'lodash';
import { BookingStatus, FilterParams } from '../../types';
import moment from 'moment';
import { DATE_FORMAT } from 'src/constants';

type Props = {};

const BookingFilter = (props: Props) => {
  const [form] = Form.useForm<FilterParams>();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj = qs.parse(searchParams.toString());
  const initialValues = {
    status: paramsObj.status,
    date: paramsObj.date
      ? moment(paramsObj.date as any, DATE_FORMAT)
      : undefined,
  };

  const onFinish = (values: FilterParams) => {
    values.date = values.date && moment(values.date).format(DATE_FORMAT);
    const newSearchParams = {
      page: paramsObj.page as any,
      ...values,
    };
    setSearchParams(_.omitBy(newSearchParams, _.isNil));
  };

  return (
    <Form
      form={form}
      name='booking_filter'
      layout='inline'
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <div style={{ flex: 1 }}></div>
      <Form.Item name='date'>
        <DatePicker format={DATE_FORMAT} placeholder='Chọn ngày' />
      </Form.Item>
      <Form.Item name='status'>
        <Select style={{ width: 120 }} placeholder='Trạng thái' allowClear>
          <Select.Option value={BookingStatus.DONE}>Hoàn thành</Select.Option>
          <Select.Option value={BookingStatus.CANCEL}>Đã hủy</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookingFilter;
