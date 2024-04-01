import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import type { IGroupDevices, IconVariant } from '@/utils/constant';
import { Card, Flex, Typography } from 'antd';
import type { CardProps } from 'antd/es/card';

interface DeviceCardProps extends CardProps {
  group: IGroupDevices;
  icon: IconVariant;
}

const GroupCard = ({ group, icon, ...rest }: DeviceCardProps) => {
  const { formatMessage } = useLocale();
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
            <SvgIcon name={icon} />
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
        <Typography.Text>
          {group.devices?.length} {formatMessage({ id: 'common.devices' })}
        </Typography.Text>
      </Flex>
    </Card>
  );
};

export default GroupCard;
