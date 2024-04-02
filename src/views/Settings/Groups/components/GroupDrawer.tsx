import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import type { IGroupDevices, IconVariant } from '@/utils/constant';
import { SettingOutlined } from '@ant-design/icons';
import type { DrawerProps, MenuProps } from 'antd';
import { Drawer, Dropdown, Flex, Slider, Space, Switch, Typography, theme } from 'antd';

interface ControlDrawerProps extends DrawerProps {
  group: IGroupDevices | undefined | null;
  icon: IconVariant | undefined | null;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const GroupDrawer = ({ group, icon, onClickEdit, onClickDelete, ...rest }: ControlDrawerProps) => {
  const { formatMessage } = useLocale();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'group.edit' }),
    },

    {
      key: '2',
      danger: true,
      label: formatMessage({ id: 'common.delete' }),
    },
  ];

  const menuChange: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        onClickEdit();
        break;
      case '2':
        onClickDelete();
        break;
      default:
        break;
    }
  };
  const { token } = theme.useToken();
  return (
    <Drawer
      title={formatMessage({ id: 'common.controlPanel' })}
      placement="right"
      open={!!group}
      getContainer={false}
      extra={
        <Dropdown menu={{ items, onClick: menuChange }} placement="bottom">
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SettingOutlined />
            </Space>
          </a>
        </Dropdown>
      }
      {...rest}
    >
      <Flex vertical justify="center" align="center">
        <div className="mb-4">
          {icon && (
            <span style={{ fontSize: '60px' }}>
              <SvgIcon name={icon} />
            </span>
          )}
        </div>
        <Typography.Title level={3}>{group?.group_name}</Typography.Title>

        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.powerSwitch' })} :
          </Typography.Title>
          <Switch />
        </div>
        <div className="w-full mt-3 flex justify-between items-center">
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.brightness' })} :
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
        {group?.category === 'ww' ? (
          <>
            <div className="w-full mt-3 flex justify-between items-center">
              <Typography.Title level={5}>
                {formatMessage({ id: 'common.color' })} :
              </Typography.Title>
            </div>
            <Slider
              style={{
                width: '100%',
                borderBottom: `1px solid ${token.colorBorder}`,
                paddingBottom: 22,
              }}
              styles={{
                track: {
                  background: 'linear-gradient(45deg, rgb(255,255,255), rgb(248,252,0))',
                },
              }}
              tooltip={{
                formatter(value) {
                  return `${value}`;
                },
              }}
            />
          </>
        ) : (
          <></>
        )}
        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>
            {formatMessage({ id: 'common.consumption' })} :
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
            {formatMessage({ id: 'group.totalEnergyUse' })} :
          </Typography.Title>
          <Typography.Text>0.0 kWh</Typography.Text>
        </div>
      </Flex>
    </Drawer>
  );
};

export default GroupDrawer;
