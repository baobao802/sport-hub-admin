import { Button, Col, Form, Input, Modal, ModalProps, Row, Select } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { telephoneRegExp } from 'src/constants';
import { useGetCitiesQuery } from 'src/services/placeApi';
import { City, District } from 'src/types';
import { Hub } from '../../types';

export type FormValues = Pick<Hub, 'name'> & {
  street: string;
  district: District;
  city: Omit<City, 'districts'>;
};

interface Props extends ModalProps {
  initialValues?: FormValues;
  onSubmit?: (values: FormValues) => void;
  isSubmitting?: boolean;
}

const HubFormModal = (props: Props) => {
  const { isSubmitting, initialValues, onSubmit, ...rest } = props;
  const { data: cities } = useGetCitiesQuery({});
  const [selectedCity, setSelectedCity] = useState<City>();

  const onChangeCity = (value: number) => {
    const found = _.find(cities, (city) => city.id === value);
    setSelectedCity(found);
  };

  const handleOnSubmit = (values: any) => {
    if (onSubmit) {
      onSubmit({
        ...values,
        district: {
          id: values.district.value,
          name: values.district.label,
        },
      });
    }
  };

  useEffect(() => {
    if (cities) {
      const found = _.find(
        cities,
        (city) => city.id === initialValues?.city.id,
      );
      found && setSelectedCity(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  return (
    <Modal {...rest} footer={false}>
      <Form<FormValues>
        layout='vertical'
        initialValues={{
          ...initialValues,
          district: {
            value: initialValues?.district.id,
            label: initialValues?.district.name,
          },
          city: initialValues?.city.id,
        }}
        onFinish={handleOnSubmit}
      >
        <Form.Item
          name='name'
          label='Tên sân bóng'
          rules={[{ required: true, message: 'Không hợp lệ' }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={[20, 20]}>
          <Col sm={24} md={12}>
            <Form.Item
              name='city'
              label='Thành phố'
              rules={[{ required: true, message: 'Không hợp lệ!' }]}
            >
              <Select
                showSearch
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
          </Col>
          <Col sm={24} md={12}>
            <Form.Item
              name='district'
              label='Quận/huyện'
              rules={[{ required: true, message: 'Không hợp lệ!' }]}
            >
              <Select
                showSearch
                labelInValue
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
          </Col>
        </Row>
        <Form.Item
          name='street'
          label='Số nhà, đường phố'
          rules={[{ required: true, message: 'Không hợp lệ!' }]}
        >
          <Input autoComplete='off' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block loading={isSubmitting}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HubFormModal;
