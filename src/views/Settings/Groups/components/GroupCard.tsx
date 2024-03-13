import SvgIcon from '@/components/SvgIcon';
import type { IGroupDevices, IListIconItem } from '@/utils/constant';
import { Card, Flex, Typography } from 'antd';
import type { CardProps } from 'antd/es/card';

interface DeviceCardProps extends CardProps {
  group: IGroupDevices;
  icon: IListIconItem;
}

const GroupCard = ({ group, icon, ...rest }: DeviceCardProps) => {
  return (
    <Card
      hoverable
      styles={{
        body: {
          padding: 8,
          paddingTop: 18,
        },
      }}
      {...rest}
    >
      <Flex vertical justify="center" align="center">
        <div className="h-[60px]">
          <span style={{ fontSize: '60px' }}>
            <SvgIcon name={icon.type} />
          </span>
        </div>
        <Typography.Title
          style={{
            margin: 0,
          }}
          level={5}
        >
          {group.group_name || 'Name'}
        </Typography.Title>
      </Flex>
    </Card>
  );
};

export default GroupCard;
