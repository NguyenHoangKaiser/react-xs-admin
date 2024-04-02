import { useLocale } from '@/locales';
import { RouteEnum } from '@/router/utils';
import { defaultDimension } from '@/utils/constant';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import { memo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getSettingCss } from './style';
const { Sider, Content } = Layout;

const SettingLayout = memo(() => {
  const { formatMessage } = useLocale();

  const menuItems: MenuProps['items'] = [
    {
      key: RouteEnum.SettingsDevices,
      label: `1. ${formatMessage({ id: 'common.devices' })}`,
    },
    {
      key: RouteEnum.SettingsScenes,
      label: `2. ${formatMessage({ id: 'common.scenes' })}`,
    },
    {
      key: RouteEnum.SettingsGroups,
      label: `3. ${formatMessage({ id: 'common.groups' })}`,
    },
    {
      key: RouteEnum.SettingsArea,
      label: `4. ${formatMessage({ id: 'common.area' })}`,
    },
  ];
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  // take only 2 parts of the pathname
  const path = pathname.split('/').slice(0, 3).join('/');
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        className="sidebar"
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
          else setCollapsed(false);
        }}
        collapsedWidth="55"
        width={230}
        theme="light"
        collapsed={collapsed}
        trigger={null}
        collapsible
        style={{
          backgroundColor: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
          height: defaultDimension.height,
        }}
      >
        {collapsed ? (
          <div className="flex m-auto justify-center items-center pt-6 pb-4">
            <SettingOutlined />
          </div>
        ) : (
          <Typography.Title
            level={5}
            style={{ marginLeft: 16, marginTop: 16, color: token.colorTextBase }}
          >
            {formatMessage({ id: 'common.settings' })}
          </Typography.Title>
        )}
        <Menu
          mode="inline"
          selectedKeys={menuItems.find((item) => item?.key === path) ? [path] : []}
          style={{ borderWidth: 0 }}
          onClick={(e) => navigate(e.key)}
          items={menuItems}
          css={getSettingCss(token, collapsed)}
        />
        <Button
          style={{
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTop: `1px solid ${token.colorBorder}`,
          }}
          block
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </Sider>
      <Content
        style={{
          overflowY: 'auto',
          height: defaultDimension.height,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
});

export default SettingLayout;
