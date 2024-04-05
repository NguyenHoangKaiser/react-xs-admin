import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import type { IDevicesListItem1, IListIconItem } from '@/utils/constant';
import { Button, Drawer, Flex, Slider, Switch, Typography, theme, type DrawerProps } from 'antd';
import { useIntl } from 'react-intl';

interface DrawerControlProps extends DrawerProps {
  device: IDevicesListItem1 | undefined | null;
  icon: IListIconItem | undefined | null;
}

const DrawerControl = ({ device, icon, ...rest }: DrawerControlProps) => {
  const { locale } = useIntl();
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();

  return (
    <Drawer
      title={formatMessage({ id: 'common.controlPanel' })}
      placement="right"
      open={!!device}
      getContainer={false}
      {...rest}
    >
      <Flex vertical justify="center" align="center">
        <div className="mb-4">
          {icon && (
            <span style={{ fontSize: '60px' }}>
              <SvgIcon name={icon.type} />
            </span>
          )}
        </div>
        <Typography.Title level={3}>{device?.name}</Typography.Title>
        <Typography.Text>
          {formatMessage({ id: 'common.description' })}:{' '}
          {locale === 'en-US' ? icon?.name_en : icon?.name}
        </Typography.Text>
        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.powerSwitch' })}
          </Typography.Title>
          <Switch checked={!!device?.status} />
        </div>
        <div className="w-full mt-3 flex justify-between items-center">
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.brightness' })}
          </Typography.Title>
        </div>
        <Slider
          style={{
            width: '100%',
            borderBottom: `1px solid ${token.colorBorder}`,
            paddingBottom: 22,
          }}
          tooltip={{
            formatter(value) {
              return `${value}%`;
            },
          }}
        />
        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.consumption' })}
          </Typography.Title>
          <Typography.Text>0.0 W</Typography.Text>
        </div>
        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.totalEnergyUse' })}
          </Typography.Title>
          <Typography.Text>0.0 kWh</Typography.Text>
        </div>
      </Flex>
      <div className="mt-4 align-bottom justify-end flex">
        <Button danger>{formatMessage({ id: 'common.deleteDevice' })}</Button>
      </div>
    </Drawer>
  );
};

export default DrawerControl;
