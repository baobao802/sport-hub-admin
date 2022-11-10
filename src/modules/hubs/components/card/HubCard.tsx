import { Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { LocationIcon } from 'src/components/icons';

type Hub = {
  id: number;
  name: string;
  fullAddress: string;
  cover?: string;
};

type Props = {
  hub: Hub;
  path: string;
};

const HubCard = (props: Props) => {
  const { hub, path } = props;

  let coverImage = <Skeleton.Image style={{ width: 280, height: 180 }} />;
  if (hub.cover) {
    coverImage = (
      <img alt={hub.name} src={hub.cover} width={280} height={180} />
    );
  }

  return (
    <Link to={path}>
      <Card hoverable style={{ width: 280 }} cover={coverImage}>
        <Card.Meta
          title={hub.name}
          description={
            <div>
              <LocationIcon style={{ width: 16 }} />
              {hub.fullAddress}
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default HubCard;
