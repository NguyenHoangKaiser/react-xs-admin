import SvgIcon from '@/components/SvgIcon';
import type { IDevicesListItem, IListIconItem } from '@/utils/constant';
import { Card, Flex, Typography } from 'antd';
import type { CardProps } from 'antd/es/card';
import { useIntl } from 'react-intl';

interface DeviceCardProps extends CardProps {
  device: IDevicesListItem;
  icon: IListIconItem;
}

const DeviceCard = ({ device, icon, ...rest }: DeviceCardProps) => {
  // const { token } = theme.useToken();
  const { locale } = useIntl();
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
        {/* <div
          style={{
            color: device.status ? token.colorPrimary : token.colorError,
          }}
          className="flex justify-between items-center w-full h-5"
        >
          <LightningBoltIcon width={20} height={20} />
          <InfoCircledIcon width={20} height={20} />
        </div> */}
        <div className="h-[60px]">
          {/* {icon.id === 3 ? (
            // <Image
            //   width={60}
            //   src={icon.on}
            //   fallback={icon.name}
            //   preview={false}
            // />
            <Typography.Text
              ellipsis
              style={{
                fontSize: 20,
                border: '1px solid cyan',
                borderRadius: '100%',
                width: 55,
                height: 55,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: `0 0 10px 0 ${token.colorSuccess}`,
              }}
            >
              28.0°
            </Typography.Text>
          ) : (
            // <Badge count={28} title={28 + ' °C'} color="cyan">
            <span style={{ fontSize: '60px' }}>
              <SvgIcon name="light-bulb" />
            </span>
            // </Badge>
          )} */}
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
          {device.name || 'Name'}
        </Typography.Title>
        <Typography.Text ellipsis>
          Description: {locale === 'en-US' ? icon.name_en : icon.name}
        </Typography.Text>
      </Flex>
    </Card>
  );
};

export default DeviceCard;
