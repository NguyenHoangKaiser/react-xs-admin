import { Layout, theme } from 'antd';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';
// import Bread from '../Bread';
import LayoutSpin from '@/components/LayoutSpin';
import { KeepAlive } from './KeepAlive';
import TabsPage from './TabsPage';
import { getAppMainStyle } from './style';

const { Content } = Layout;

const AppMain = memo(() => {
  const thme = theme.useToken();
  const isKeepAlive = import.meta.env.VITE_KEY_ALIVE === 'TRUE';
  const maxLen = 10;
  console.log('isKeepAlive', isKeepAlive);
  return (
    <Content css={getAppMainStyle(thme.token)}>
      <TabsPage maxLen={maxLen} />
      <div className="main-content">
        <div className="main-section" id="main-section">
          {isKeepAlive ? (
            <KeepAlive maxLen={maxLen} />
          ) : (
            <Suspense fallback={<LayoutSpin position="fixed" />}>
              <Outlet />
            </Suspense>
          )}
        </div>
      </div>
    </Content>
  );
});

export default AppMain;
