import SvgIcon from '@/components/SvgIcon';
import type { IGroupDevices, IListIconItem } from '@/utils/constant';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Slider, Switch, Typography, theme, type DrawerProps } from 'antd';

interface ControlDrawerProps extends DrawerProps {
  group: IGroupDevices | undefined | null;
  icon: IListIconItem | undefined | null;
}

const GroupDrawer = ({ group, icon, ...rest }: ControlDrawerProps) => {
  const { token } = theme.useToken();
  return (
    <Drawer
      title="Control Panel"
      placement="right"
      open={!!group}
      getContainer={false}
      extra={<Button type="text" shape="circle" icon={<SettingOutlined />} />}
      {...rest}
    >
      <Flex vertical justify="center" align="center">
        <div className="mb-4">
          {icon && (
            <span style={{ fontSize: '60px' }}>
              <SvgIcon name={icon.type} />
            </span>
          )}
          {/* {device?.status ? (
              <Image
                width={60}
                src={icon.on}
                fallback={icon.name}
                preview={false}
              />
            ) : (
              <Typography.Text ellipsis style={{ fontSize: 28, marginTop: 5 }}>
                {locale === 'en-US' ? icon.name_en : icon.name}
              </Typography.Text>
            )} */}
        </div>
        <Typography.Title level={3}>{group?.group_name}</Typography.Title>

        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>Power switch :</Typography.Title>
          <Switch />
        </div>
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
        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>Current consumption :</Typography.Title>
          <Typography.Text>0.0 W</Typography.Text>
        </div>
        <div
          style={{
            borderBottom: `1px solid ${token.colorBorder}`,
          }}
          className="w-full mt-3 pb-3 flex justify-between items-center"
        >
          <Typography.Title level={5}>Total energy use :</Typography.Title>
          <Typography.Text>0.0 kWh</Typography.Text>
        </div>
      </Flex>
    </Drawer>
  );
};

export default GroupDrawer;
