import { Badge, Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useUpdatePitchByIdMutation } from '../../services/hubApi';
import { Pitch, PitchType } from '../../types';
import { PitchFormModal } from '../form';

interface Props {
  data: Pitch;
  refetch: () => void;
}

const PitchCard = (props: Props) => {
  const { data, refetch } = props;
  const [visible, setVisible] = useState(false);
  const [updatePitch, { isSuccess, isError }] = useUpdatePitchByIdMutation();

  const mapPitchRibbonProps = (type: string) => {
    if (type === PitchType.FIVE_A_SIDE) {
      return {
        text: '5 vs 5',
        color: undefined,
      };
    }
    if (type === PitchType.SEVEN_A_SIDE) {
      return {
        text: '7 vs 7',
        color: 'green',
      };
    }
    if (type === PitchType.ELEVEN_A_SIDE) {
      return {
        text: '7 vs 7',
        color: 'yellow',
      };
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success('Cập nhật thành công.');
      setVisible(false);
      refetch();
    }
    if (isError) {
      message.error('Cập nhật không thành công.');
    }
  }, [isSuccess, isError]);

  return (
    <Badge.Ribbon {...mapPitchRibbonProps(props.data.type)}>
      <PitchFormModal
        visible={visible}
        onCancel={() => setVisible(false)}
        initialValues={data}
        onSubmit={(values) => updatePitch({ id: data.id, payload: values })}
      />
      <Card hoverable onClick={() => setVisible(true)}>
        Sân {props.data.name}
      </Card>
    </Badge.Ribbon>
  );
};

export default PitchCard;
