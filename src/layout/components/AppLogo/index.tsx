import dark_logo from '@/assets/luci_dark.png';
import light_logo from '@/assets/luci_light.jpg';
import logo from '@/assets/luci_logo.png';
import { useAppSelector } from '@/store/hooks';
import { Image, theme } from 'antd';
import { memo } from 'react';
import './index.less';

const AppLogo = memo(() => {
  const thme = theme.useToken();
  const { themeMode, collapsed } = useAppSelector((state) => state.app);

  return (
    <div>
      {collapsed ? (
        <>
          <div className="app-logo">
            <div className="logo">
              <Image width={34} src={logo} preview={false} />
            </div>
            <div className="name" style={{ color: thme.token.colorText }}>
              Smart Building
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center my-1">
          <Image width={140} src={themeMode === 'dark' ? dark_logo : light_logo} preview={false} />
        </div>
      )}
    </div>
  );
});

export default AppLogo;
