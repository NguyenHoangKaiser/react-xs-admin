import SvgIcon from '@/components/SvgIcon';
import type { IDevicesListItem, TIconType } from '@/utils/constant';
import { Card, Flex, Typography } from 'antd';
import type { CardProps } from 'antd/es/card';

interface DeviceCardProps extends CardProps {
  device: IDevicesListItem;
}

const IconRender = ({ icon, name }: { icon: TIconType; name: string }) => {
  return (
    <>
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
        {name || 'Name'}
      </Typography.Title>
    </>
  );
};

const DeviceCard = ({ device, ...rest }: DeviceCardProps) => {
  // const { token } = theme.useToken();
  // const { locale } = useIntl();

  const getCardSwitch = (pDevice: IDevicesListItem) => {
    const { device_status, traits } = pDevice;
    const { states } = device_status || {};
    const mainTrait = traits?.find((trait) => trait.is_main);
    switch (pDevice.type) {
      case 'LIGHT':
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={'light-bulb'} name={pDevice.name || ''} />
            {!device_status?.status ? (
              <Typography.Text type="secondary" ellipsis>
                Disconnected
              </Typography.Text>
            ) : (
              <Typography.Text type="success" ellipsis>
                {states?.OnOff ? 'On' : 'Off'}{' '}
                {mainTrait?.name && mainTrait?.name === 'OnOff'
                  ? `(${states?.Brightness?.brightness}%)`
                  : ''}
              </Typography.Text>
            )}
          </Flex>
        );
      // case 'air-conditioner':
      //   return (
      //     <Flex vertical justify="center" align="center">
      //       <IconRender icon={icon} name={device.name || ''} />
      //       {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
      //         {device.status ? 'On' : 'Off'} {device.status ? `(${device.capacity} °C)` : ''}
      //       </Typography.Text> */}
      //     </Flex>
      //   );
      // case 'camera':
      //   return (
      //     <Flex vertical justify="center" align="center">
      //       <IconRender icon={icon} name={device.name || ''} />
      //       {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
      //         {device.status ? 'On' : 'Off'}
      //       </Typography.Text> */}
      //     </Flex>
      //   );
      // case 'temperature':
      //   return (
      //     <Flex vertical justify="center" align="center">
      //       <IconRender icon={icon} name={device.name || ''} />
      //       {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
      //         {device.status ? `${device.capacity} °C` : ''}
      //       </Typography.Text> */}
      //     </Flex>
      //   );
      // case 'smart-meter':
      //   return (
      //     <Flex vertical justify="center" align="center">
      //       <IconRender icon={icon} name={device.name || ''} />
      //       {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
      //         {device.status ? `${device.capacity} kWh` : ''}
      //       </Typography.Text> */}
      //     </Flex>
      //   );
      // case 'pump':
      //   return (
      //     <Flex vertical justify="center" align="center">
      //       <IconRender icon={icon} name={device.name || ''} />
      //       {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
      //         {device.status ? 'On' : 'Off'} {device.status ? `(${device.capacity} m³/h)` : ''}
      //       </Typography.Text> */}
      //     </Flex>
      //   );
      // case 'fan':
      //   return (
      //     <Flex vertical justify="center" align="center">
      //       <IconRender icon={icon} name={device.name || ''} />
      //       {/* <Typography.Text type={device.status ? 'success' : 'secondary'} ellipsis>
      //         {device.status ? 'On' : 'Off'} {device.status ? `(Level ${device.status})` : ''}
      //       </Typography.Text> */}
      //     </Flex>
      //   );
      default:
        return (
          <Flex vertical justify="center" align="center">
            <IconRender icon={'maintenance'} name={pDevice.name || ''} />
          </Flex>
        );
    }
  };

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
      {getCardSwitch(device)}
    </Card>
  );
};

export default DeviceCard;
