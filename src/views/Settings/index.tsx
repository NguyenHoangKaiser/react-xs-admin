import { RouteEnum } from '@/router/utils';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Typography, theme } from 'antd';
import { memo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getSettingCss } from './style';
const { Sider, Content } = Layout;
const menuItems: MenuProps['items'] = [
  {
    key: RouteEnum.SettingsDevices,
    label: '1. Devices',
  },
  {
    key: RouteEnum.SettingsScenes,
    label: '2. Scenes',
  },
  {
    key: RouteEnum.SettingsGroups,
    label: '3. Groups',
  },
  {
    key: RouteEnum.SettingsArea,
    label: '4. Area',
  },
];
const SettingLayout = memo(() => {
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="55"
        width={230}
        theme="light"
        collapsed={collapsed}
        trigger={null}
        collapsible
        css={{
          backgroundColor: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
          height: 'calc(100vh - 110px)',
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
            Settings
          </Typography.Title>
        )}
        <Menu
          mode="inline"
          selectedKeys={menuItems.find((item) => item?.key === pathname) ? [pathname] : []}
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
          height: 'calc(100vh - 110px)',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
});

export default SettingLayout;
