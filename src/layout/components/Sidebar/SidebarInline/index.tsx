import { findRouteByPath, getParentPaths } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppCollapsed } from '@/store/modules/app';
import { useResponsive } from 'ahooks';
import type { MenuProps, SiderProps } from 'antd';
import { Drawer, Layout, Menu, theme } from 'antd';
import { memo, useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLogo from '../../AppLogo';
import { useMenuList } from '../hooks/useMenuList';
import './index.less';

const { Sider } = Layout;

const Sidebar = memo(() => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { collapsed, sidebarMode } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed,
      sidebarMode: state.app.sidebarMode,
    }),
    shallowEqual,
  );
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const thme = theme.useToken();
  const responsive = useResponsive();
  const navigate = useNavigate();
  const { menuList } = useMenuList();

  useEffect(() => {
    if (!collapsed) {
      setOpenKeys(getParentPaths(pathname, menuList));
    } else {
      setOpenKeys([]);
    }
  }, [collapsed, pathname]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  // auto collapse or expand the sidebar based on the screen size
  const _onBreakpoint: SiderProps['onBreakpoint'] = (broken) => {
    let collapsedValue = collapsed;
    if (broken) collapsedValue = true;
    else collapsedValue = false;
    dispatch(setAppCollapsed(collapsedValue));
  };

  const menuItems = useMemo(() => {
    if (sidebarMode === 'blend') {
      // The array composed of PATH's parent routing
      const parentPathArr = getParentPaths(pathname, menuList);
      // Current route information
      const parentRoute = findRouteByPath(parentPathArr[0], menuList);
      if (parentRoute) {
        if (parentRoute.children) return parentRoute.children;
        else return [parentRoute];
      }
      return [];
    } else {
      return menuList;
    }
  }, [sidebarMode, pathname, menuList]);

  const MenuRender = (
    <>
      <AppLogo />
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[pathname]}
        items={menuItems as MenuProps['items']}
        onClick={(e) => navigate(e.key)}
        style={{ borderWidth: 0 }}
      />
    </>
  );

  return (
    <>
      {(sidebarMode !== 'horizontal' || !responsive.sm) && (
        <>
          {responsive.sm ? (
            <Sider
              className="sidebar"
              breakpoint="lg"
              collapsedWidth="55"
              width={210}
              theme="light"
              collapsed={collapsed}
              // onBreakpoint={onBreakpoint}
              css={{
                backgroundColor: thme.token.colorBgContainer,
                borderRight: `1px solid ${thme.token.colorBorder}`,
              }}
            >
              {MenuRender}
            </Sider>
          ) : (
            <Drawer
              width={210}
              placement="left"
              destroyOnClose={false}
              styles={{ body: { padding: 0, height: '100%' } }}
              closable={false}
              onClose={() => dispatch(setAppCollapsed(!collapsed))}
              open={!collapsed}
            >
              <div className="sidebar">{MenuRender}</div>
            </Drawer>
          )}
        </>
      )}
    </>
  );
});

export default Sidebar;
