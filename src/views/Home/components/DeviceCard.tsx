import SvgIcon from '@/components/SvgIcon';
import type { IDevicesListItem, IListIconItem } from '@/utils/constant';
import { Card, Flex, Typography } from 'antd';
import type { CardProps } from 'antd/es/card';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';

interface DeviceCardProps extends CardProps {
  device: IDevicesListItem;
  icon: IListIconItem;
}

const IconRender = ({ icon, name }: { icon: IListIconItem; name: string }) => {
  return (
    <>
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
        {name || 'Name'}
      </Typography.Title>
    </>
  );
};

const DeviceCard = ({ device, icon, ...rest }: DeviceCardProps) => {
  // const { token } = theme.useToken();
  const { locale } = useIntl();

  const getCardSwitch = useCallback(() => {
    switch (icon.type) {
      case 'light-bulb':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? 'On' : 'Off'} {device.status ? `(${device.capacity}%)` : ''}
            </Typography.Text> */}
          </Flex>
        );
      case 'air-conditioner':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? 'On' : 'Off'} {device.status ? `(${device.capacity} °C)` : ''}
            </Typography.Text> */}
          </Flex>
        );
      case 'camera':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? 'On' : 'Off'}
            </Typography.Text> */}
          </Flex>
        );
      case 'temperature':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? `${device.capacity} °C` : ''}
            </Typography.Text> */}
          </Flex>
        );
      case 'smart-meter':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? `${device.capacity} kWh` : ''}
            </Typography.Text> */}
          </Flex>
        );
      case 'pump':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? 'On' : 'Off'} {device.status ? `(${device.capacity} m³/h)` : ''}
            </Typography.Text> */}
          </Flex>
        );
      case 'fan':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
              {device.status ? 'On' : 'Off'} {device.status ? `(Level ${device.status})` : ''}
            </Typography.Text> */}
          </Flex>
        );
      default:
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={icon} name={device.name || ''} />
            <Typography.Text ellipsis>
              {locale === 'en-US' ? icon.name_en : icon.name}
            </Typography.Text>
          </Flex>
        );
    }
  }, [device, icon, locale]);

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
      {getCardSwitch()}
    </Card>
  );
};

export default DeviceCard;
