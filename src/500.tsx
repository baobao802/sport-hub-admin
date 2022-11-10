import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {};

const InternalServerError = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, something went wrong.'
      extra={
        <Button type='primary' onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  );
};

export default InternalServerError;
