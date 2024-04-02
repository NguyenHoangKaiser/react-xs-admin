import LayoutSpin from '@/components/LayoutSpin';
import { Layout, theme } from 'antd';
import { Suspense, memo, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { KeepAlive } from './KeepAlive';
import TabsPage from './TabsPage';
import { getAppMainStyle } from './style';

const { Content } = Layout;

const AppMain = memo(() => {
  const thme = theme.useToken();
  const ref = useRef(null);
  const isKeepAlive = import.meta.env.VITE_KEY_ALIVE === 'TRUE';
  const maxLen = 10;
  console.log('isKeepAlive', isKeepAlive);
  return (
    <Content css={getAppMainStyle(thme.token)}>
      <div className="main-content">
        <TabsPage maxLen={maxLen} />
        <div ref={ref} className="main-section" id="main-section">
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
