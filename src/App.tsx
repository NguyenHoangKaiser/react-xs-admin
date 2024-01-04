import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import { Suspense, useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import { shallowEqual } from 'react-redux';
import LayoutSpin from './components/LayoutSpin';
import { localeConfig, setIntl } from './locales';
import RouteView from './router';
import { initAsyncRoute } from './router/utils';
import { useAppSelector } from './store/hooks';

function App() {
  const { locale, color, themeMode } = useAppSelector(
    (state) => ({
      locale: state.app.locale,
      color: state.app.color,
      themeMode: state.app.themeMode,
    }),
    shallowEqual,
  );
  const { userInfo } = useAppSelector((state) => state.user);
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);

  const getLocale = useMemo(() => {
    setIntl(locale);
    if (locale === 'en-US') {
      dayjs.locale('en');
      return enUS;
    } else {
      dayjs.locale('vi-VN');
      return viVN;
    }
  }, [locale]);

  useEffect(() => {
    if (!asyncRouter.length && userInfo) {
      initAsyncRoute(userInfo.power);
    }
  }, []);

  const loading = useMemo(() => {
    if (!asyncRouter.length && userInfo) {
      return true;
    }
    return false;
  }, [asyncRouter]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color || '#409eff',
        },
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
      locale={getLocale}
    >
      <IntlProvider locale={locale} messages={localeConfig[locale]}>
        {loading ? (
          <LayoutSpin position="fixed" />
        ) : (
          // <BrowserRouter>
          <Suspense fallback={<LayoutSpin />}>
            <RouteView />
          </Suspense>
          // </BrowserRouter>
        )}
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
