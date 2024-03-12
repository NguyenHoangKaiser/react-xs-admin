import type { IDevicesListItem } from '@/utils/constant';
import { Card } from 'antd';
const { Meta } = Card;

const DeviceCard = ({ device }: { device: IDevicesListItem }) => {
  return (
    <Card
      hoverable
      style={{}}
      onClick={() => {}}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Meta title={device.name || 'Name'} description={device.description || 'Description'} />
    </Card>
  );
};

export default DeviceCard;
