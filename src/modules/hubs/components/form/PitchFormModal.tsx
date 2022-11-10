import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Row,
  Select,
  Space,
} from 'antd';
import _ from 'lodash';
import { genTimeDurations } from 'src/utils';
import { Pitch, PitchType } from '../../types';

interface Props extends ModalProps {
  initialValues?: Pitch;
  onSubmit?: (values: Pitch) => void;
}

const PitchFormModal = (props: Props) => {
  const { initialValues, onSubmit } = props;
  const [form] = Form.useForm();

  return (
    <Modal footer={false} width={600} {...props}>
      <Form
        form={form}
        layout='vertical'
        autoComplete='off'
        initialValues={{
          ...initialValues,
          cost: _.isEmpty(initialValues?.cost)
            ? [{}]
            : _.map(_.groupBy(initialValues?.cost, 'value'), (items) => ({
                times: _.map(items, (item: any) => item.time),
                value: (items as any)[0]?.value,
              })),
        }}
        onFinish={(values) => {
          onSubmit &&
            onSubmit({
              ...values,
              cost: _.flatten(
                _.map(values.cost, ({ times, value }) =>
                  _.map(times, (time) => ({ time, value })),
                ),
              ),
            });
          !initialValues && form.resetFields(['name', 'type']);
        }}
      >
        <Row gutter={[20, 20]}>
          <Col sm={24} md={16}>
            <Form.Item
              name='name'
              label='Tên sân'
              rules={[{ required: true, message: 'Không hợp lệ!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} md={8}>
            <Form.Item
              name='type'
              label='Loại sân'
              rules={[{ required: true, message: 'Không hợp lệ!' }]}
            >
              <Select>
                <Select.Option value={PitchType.FIVE_A_SIDE}>
                  5 vs 5
                </Select.Option>
                <Select.Option value={PitchType.SEVEN_A_SIDE}>
                  7 vs 7
                </Select.Option>
                <Select.Option value={PitchType.ELEVEN_A_SIDE}>
                  11 vs 11
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.List name='cost'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Row key={key} gutter={[20, 20]}>
                  <Col sm={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'times']}
                      label={index === 0 && 'Khung giờ'}
                      rules={[{ required: true, message: 'Không hợp lệ!' }]}
                    >
                      <Select mode='multiple'>
                        {_.map(genTimeDurations(), (value) => (
                          <Select.Option value={value}>{value}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={12}>
                    <Form.Item label={index === 0 && 'Chi phí (VND)'}>
                      <Space align='start'>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Không hợp lệ!' }]}
                          style={{ marginBottom: 0 }}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            min={1}
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                          />
                        </Form.Item>
                        <Button
                          type='link'
                          style={{ padding: 0 }}
                          onClick={() => add()}
                        >
                          <PlusCircleOutlined style={{ fontSize: '20px' }} />
                        </Button>
                        <Button
                          type='link'
                          style={{ padding: 0 }}
                          disabled={_.size(fields) === 1}
                          onClick={() => remove(name)}
                        >
                          <MinusCircleOutlined style={{ fontSize: '20px' }} />
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit'>
            {initialValues ? 'Lưu' : 'Tạo'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PitchFormModal;
