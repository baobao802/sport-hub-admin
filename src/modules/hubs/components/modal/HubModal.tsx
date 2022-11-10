import { Button, Modal } from 'antd';

type Props = {
  visible?: boolean;
  loading?: boolean;
  defaultValues?: any;
  onSave?: (values: any) => void;
  onCancel?: () => void;
};

const HubModal = (props: Props) => {
  const { visible, loading, onSave, onCancel } = props;

  return (
    <Modal
      visible={visible}
      title='Title'
      onOk={onSave}
      onCancel={onCancel}
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' loading={loading} onClick={onSave}>
          Save
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default HubModal;
