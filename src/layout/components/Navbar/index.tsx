import AppLocale from '@/components/AppLocale';
import AppTheme from '@/components/AppTheme';
import { useAppSelector } from '@/store/hooks';
import { useResponsive } from 'ahooks';
import { Layout, theme } from 'antd';
import { memo } from 'react';
import { shallowEqual } from 'react-redux';
import AppAccount from '../AppAccount';
import AppLogo from '../AppLogo';
import './index.less';

const { Header } = Layout;

const Navbar = memo(() => {
  const { sidebarMode } = useAppSelector(
    (state) => ({
      collapsed: state.app.collapsed,
      sidebarMode: state.app.sidebarMode,
    }),
    shallowEqual,
  );
  const thme = theme.useToken();
  const responsive = useResponsive();

  const render = () => {
    return (
      <Header
        className="site-layout-sub-header"
        style={{
          padding: 0,
          backgroundColor: thme.token.colorBgContainer,
          borderBottom: `1px solid ${thme.token.colorBorder}`,
        }}
      >
        <div className="layout-header">
          {sidebarMode !== 'blend' && (
            <div className="layout-header-left">
              {sidebarMode === 'horizontal' && responsive.sm && <AppLogo />}
            </div>
          )}
          <div className="layout-header-right">
            <AppTheme />
            <AppLocale />
            <AppAccount />
            {/* <Setting /> */}
          </div>
        </div>
      </Header>
    );
  };

  return render();
});

export default Navbar;
