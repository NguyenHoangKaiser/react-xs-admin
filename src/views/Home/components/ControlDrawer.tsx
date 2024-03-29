import LayoutSpin from '@/components/LayoutSpin';
import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import type { IGetDeviceInfoResult } from '@/server/devicesApi';
import { useControlDeviceMutation, useGetDeviceInfoQuery } from '@/server/devicesApi';
import type { TIconType } from '@/utils/constant';
import { SettingOutlined } from '@ant-design/icons';
import type { DrawerProps, SliderSingleProps } from 'antd';
import { Button, ConfigProvider, Drawer, Flex, Slider, Switch, Typography, theme } from 'antd';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';

interface ControlDrawerProps extends DrawerProps {
  id: string | undefined;
}

const TitleRender = ({
  name,
  description,
  icon,
}: {
  name?: string;
  description?: string;
  icon: TIconType;
}) => {
  return (
    <>
      <div className="mb-4">
        <span style={{ fontSize: '60px' }}>
          <SvgIcon name={icon} />
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
  const { formatMessage } = useLocale();

  return (
    <>
      <PropertyRender title={`${formatMessage({ id: 'common.consumption' })} :`}>
        <Typography.Text>0.0 W</Typography.Text>
      </PropertyRender>
      <PropertyRender title={`${formatMessage({ id: 'common.totalEnergyUse' })} :`}>
        <Typography.Text>0.0 kWh</Typography.Text>
      </PropertyRender>
    </>
  );
};

const ColorMarks: SliderSingleProps['marks'] = {
  0: {
    // style: {
    //   color: '#f50',
    // },
    label: <strong>0°C</strong>,
  },
  // 100: '100°C',
  100: {
    label: <strong>100°C</strong>,
  },
};

const BrightnessMarks: SliderSingleProps['marks'] = {
  0: {
    // style: {
    //   color: '#f50',
    // },
    label: <strong>0%</strong>,
  },
  100: {
    label: <strong>100%</strong>,
  },
};

const ControlDrawer = ({ id, ...rest }: ControlDrawerProps) => {
  const { locale } = useIntl();
  const { formatMessage } = useLocale();

  const { token } = theme.useToken();
  const [controlDevice] = useControlDeviceMutation();
  const { data, isFetching } = useGetDeviceInfoQuery(
    {
      id: id || '',
    },
    {
      skip: !id,
      // refetchOnFocus: true,
    },
  );

  const onControlDevice = useCallback(
    (checked: boolean) => {
      if (data?.devid && data?.floor_id) {
        try {
          controlDevice({
            devid: data?.devid,
            floor_id: data?.floor_id,
            id: data?._id,
            state: {
              OnOff: {
                on: checked,
              },
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [controlDevice, data?.devid, data?.floor_id],
  );

  const getControlPanel = useCallback(
    (pDevice: IGetDeviceInfoResult | undefined) => {
      if (pDevice) {
        const { device_status, traits } = pDevice;
        const { states } = device_status || {};
        const disabled = !device_status?.status;
        // const mainTrait = traits?.find((trait) => trait.is_main);
        switch (pDevice?.type) {
          case 'LIGHT':
            return (
              <Flex vertical justify="center" align="center">
                <TitleRender
                  icon="light-bulb"
                  name={pDevice?.name}
                  description={formatMessage({ id: 'common.deviceLight' })}
                />
                {traits?.find((trait) => trait.name === 'OnOff') && (
                  <PropertyRender title={formatMessage({ id: 'common.powerSwitch' })}>
                    <Switch
                      onChange={onControlDevice}
                      disabled={disabled}
                      checked={states?.OnOff?.on}
                    />
                  </PropertyRender>
                )}
                {traits?.find((trait) => trait.name === 'Brightness') && (
                  <div
                    style={{
                      width: '100%',
                      borderBottom: `1px solid ${token.colorBorder}`,
                    }}
                  >
                    <div className="w-full mt-3 flex justify-between items-center">
                      <Typography.Title level={5}>
                        {formatMessage({ id: 'common.brightness' })} :
                      </Typography.Title>
                    </div>
                    <Slider
                      disabled={disabled}
                      style={{
                        width: '95%',
                      }}
                      marks={BrightnessMarks}
                      value={states?.Brightness?.brightness}
                      tooltip={{
                        formatter(value) {
                          return `${value}%`;
                        },
                      }}
                    />
                  </div>
                )}
                {traits?.find((trait) => trait.name === 'ColdWarmColor') && (
                  <div
                    style={{
                      width: '100%',
                      borderBottom: `1px solid ${token.colorBorder}`,
                    }}
                  >
                    <div className="w-full mt-3 flex justify-between items-center">
                      <Typography.Title level={5}>
                        {formatMessage({ id: 'common.color' })}:
                      </Typography.Title>
                    </div>
                    <ConfigProvider
                      theme={{
                        components: {
                          Slider: {
                            handleColor: 'rgb(255,239,0)',
                            // handleActiveColor: 'rgb(255,239,0)',
                            // colorPrimaryBorderHover: 'rgb(255,239,0)',
                          },
                        },
                      }}
                    >
                      <Slider
                        disabled={disabled}
                        styles={{
                          rail: {
                            backgroundImage: `linear-gradient(90deg, rgb(113,112,12) 0%, rgb(199,193,26) 20%, rgb(255,239,0) 100%)`,
                          },
                          track: {
                            backgroundColor: 'transparent',
                          },
                        }}
                        style={{
                          width: '95%',
                        }}
                        marks={ColorMarks}
                        value={states?.ColdWarmColor?.coldWarmColor}
                        tooltip={{
                          formatter(value) {
                            return `${value}%`;
                          },
                        }}
                      />
                    </ConfigProvider>
                  </div>
                )}
                <EnergyConsumption />
              </Flex>
            );
          default:
            return (
              <Flex vertical justify="center" align="center">
                <TitleRender
                  icon="maintenance"
                  name={pDevice?.name}
                  description={formatMessage({ id: 'common.deviceType' })}
                />
                <PropertyRender title={formatMessage({ id: 'common.powerSwitch' })}>
                  {/* <Switch checked={!!pDevice?.status} /> */}
                </PropertyRender>
                <EnergyConsumption />
              </Flex>
            );
        }
      }
      return null;
    },
    [locale, token.colorBorder, onControlDevice],
  );

  return (
    <Drawer
      title={formatMessage({ id: 'common.controlPanel' })}
      placement="right"
      getContainer={false}
      extra={<Button type="text" shape="circle" icon={<SettingOutlined />} />}
      style={{ position: 'relative' }}
      {...rest}
    >
      {isFetching ? <LayoutSpin position="absolute" /> : <>{getControlPanel(data)}</>}
    </Drawer>
  );
};

export default ControlDrawer;
