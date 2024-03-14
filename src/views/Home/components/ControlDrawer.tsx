import SvgIcon from '@/components/SvgIcon';
import type { IDevicesListItem, IListIconItem } from '@/utils/constant';
import { SettingOutlined } from '@ant-design/icons';
import type { DrawerProps } from 'antd';
import { Button, Drawer, Flex, Slider, Typography, theme } from 'antd';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';

interface ControlDrawerProps extends DrawerProps {
  device: IDevicesListItem | undefined | null;
  icon: IListIconItem | undefined | null;
}

const TitleRender = ({
  icon,
  name,
  description,
}: {
  icon: IListIconItem;
  name?: string;
  description?: string;
}) => {
  return (
    <>
      <div className="mb-4">
        <span style={{ fontSize: '60px' }}>
          <SvgIcon name={icon.type} />
        </span>
      </div>
      <Typography.Title level={3}>{name || 'Name'}</Typography.Title>
      <Typography.Text>{description || 'Description'}</Typography.Text>
    </>
  );
};

const PropertyRender = ({ title, children }: { title: string; children?: ReactNode }) => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        borderBottom: `1px solid ${token.colorBorder}`,
      }}
      className="w-full mt-3 pb-3 flex justify-between items-center"
    >
      <Typography.Title level={5}>{title}</Typography.Title>
      {children}
    </div>
  );
};

const EnergyConsumption = () => {
  return (
    <>
      <PropertyRender title="Current consumption :">
        <Typography.Text>0.0 W</Typography.Text>
      </PropertyRender>
      <PropertyRender title="Total energy use :">
        <Typography.Text>0.0 kWh</Typography.Text>
      </PropertyRender>
    </>
  );
};

const ControlDrawer = ({ device, icon, ...rest }: ControlDrawerProps) => {
  const { locale } = useIntl();
  const { token } = theme.useToken();

  const getControlPanel = useCallback(
    (pIcon: IListIconItem | undefined | null, pDevice: IDevicesListItem | undefined | null) => {
      if (pIcon) {
        switch (pIcon?.type) {
          case 'light-bulb':
            return (
              <Flex vertical justify="center" align="center">
                <TitleRender
                  icon={pIcon}
                  name={pDevice?.name}
                  description={`Device type: ${locale === 'en-US' ? pIcon?.name_en : pIcon?.name}`}
                />
                <PropertyRender title="Power switch :">
                  {/* <Switch checked={!!pDevice?.status} /> */}
                </PropertyRender>
                <div className="w-full mt-3 flex justify-between items-center">
                  <Typography.Title level={5}>Brightness :</Typography.Title>
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
                <EnergyConsumption />
              </Flex>
            );
          default:
            return (
              <Flex vertical justify="center" align="center">
                <TitleRender
                  icon={pIcon}
                  name={pDevice?.name}
                  description={`Device type: ${locale === 'en-US' ? pIcon?.name_en : pIcon?.name}`}
                />
                <PropertyRender title="Power switch :">
                  {/* <Switch checked={!!pDevice?.status} /> */}
                </PropertyRender>
                <EnergyConsumption />
              </Flex>
            );
        }
      }
      return null;
    },
    [locale, token.colorBorder],
  );

  return (
    <Drawer
      title="Control Panel"
      placement="right"
      // open={!!device}
      getContainer={false}
      extra={<Button type="text" shape="circle" icon={<SettingOutlined />} />}
      {...rest}
    >
      {getControlPanel(icon, device)}
    </Drawer>
  );
};

export default ControlDrawer;
