import { StarOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import _ from 'lodash';
import { LabelInValueType } from 'rc-select/lib/Select';
import { useState } from 'react';
import { useGetCitiesQuery } from 'src/services/placeApi';
import { City } from 'src/types';

export type FormValues = {
  name: string;
  city: number;
  district: LabelInValueType;
  street: string;
};

interface Props {
  isSubmitting?: boolean;
  onSubmit?: (values: FormValues) => void;
}

const CreateHubForm = (props: Props) => {
  const { isSubmitting, onSubmit } = props;
  const { data: cities } = useGetCitiesQuery({});
  const [selectedCity, setSelectedCity] = useState<City>();

  const onChangeCity = (value: number) => {
    const found = _.find(cities, (city) => city.id === value);
    setSelectedCity(found);
  };

  return (
    <Form<FormValues>
      name='create-hub'
      onFinish={onSubmit}
      size='large'
      autoComplete='off'
    >
      <Form.Item
        name='name'
        rules={[
          {
            required: true,
            message: 'Không hợp lệ!',
          },
        ]}
      >
        <Input placeholder='Tên hub' prefix={<StarOutlined />} />
      </Form.Item>

      <Form.Item
        name='city'
        rules={[{ required: true, message: 'Không hợp lệ!' }]}
      >
        <Select
          showSearch
          placeholder='Chọn Thành phố'
          optionFilterProp='children'
          onChange={onChangeCity}
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {_.map(cities, (city) => (
            <Select.Option key={city.id} value={city.id}>
              {city.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='district'
        rules={[{ required: true, message: 'Không hợp lệ!' }]}
      >
        <Select
          showSearch
          labelInValue
          placeholder='Chọn quận/huyện'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option!.children as unknown as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {_.map(selectedCity?.districts, (district) => (
            <Select.Option key={district.id} value={district.id}>
              {district.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='street'
        rules={[{ required: true, message: 'Không hợp lệ!' }]}
      >
        <Input placeholder='Số nhà, đường phố' autoComplete='off' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' block loading={isSubmitting}>
          Tạo mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateHubForm;
