import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';
import { ProConfigProvider } from '@ant-design/pro-components';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as duration from 'dayjs/plugin/duration';
import * as LocalData from 'dayjs/plugin/localeData';
import { Suspense, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { shallowEqual } from 'react-redux';
import LayoutSpin from './components/LayoutSpin';
import { localeConfig, setIntl } from './locales';
import RouteView from './router';
import { initAsyncRoute } from './router/utils';
import type { TSocket } from './socket';
import { useAppSelector } from './store/hooks';
import { userSelector } from './store/modules/user';
import { ELocale } from './utils/constant';
dayjs.extend(LocalData);
dayjs.extend(duration);

export interface GlobalContent {
  socket?: TSocket;
  setSocket: (socket: TSocket) => void;
}

export const MyGlobalContext = createContext<GlobalContent>({
  setSocket: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);

const px2rem = px2remTransformer({
  rootValue: 16,
});

dayjs.extend(customParseFormat);

function App() {
  const { locale, themeMode } = useAppSelector(
    (state) => ({
      locale: state.app.locale,
      themeMode: state.app.themeMode,
    }),
    shallowEqual,
  );
  const { access_token, user_id: _id } = useAppSelector(userSelector);
  // const { hotel_id, ip_local } = useAppSelector(hotelSelector);
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const [socket, setSocket] = useState<TSocket | undefined>(undefined);

  // useEffect(() => {
  //   if (socket) {
  //     socket.disconnect();
  //     setSocket(undefined);
  //     console.log('SOCKET_CONNECTION::DISCONNECT');
  //   }
  //   if (access_token && user_id && hotel_id && ip_local) {
  //     try {
  //       console.log('::ConnectSocket::');
  //       const getSocketInstance = createSocketFactory({
  //         accessToken: access_token,
  //         userId: user_id,
  //       });
  //       getSocketInstance().then((socket) => {
  //         setSocket(socket);

  //         //TODO: need to verify if access_token is expired
  //         socket.on('connect', () => {
  //           if (socket.connected) {
  //             console.log('SOCKET_CONNECTION::connected');
  //             socket.emit('joinRoom', [`hotel_${hotel_id}`, `room_${hotel_id}_${user_id}`]);
  //           }
  //         });

  //         socket.on('disconnect', () => {
  //           console.log('socket disconnected');
  //         });

  //         socket.on('timeout', (data: any) => {
  //           console.log('SOCKET_CONNECTION::timeout:::', data);
  //         });

  //         socket.on('connect_error', (error: any) => {
  //           console.error('SOCKET_CONNECTION::connect_error:::', error);
  //         });

  //         socket.on('joinRoom', (data: any) => {
  //           console.log('SOCKET_CONNECTION::joinRoom::on', data);
  //         });

  //         socket.on('status', (data: any) => {
  //           console.log('SOCKET_CONNECTION::status::on', data);
  //           // this.onStatus(data, isCloud);
  //         });
  //         socket.on('refreshToken', (data: any) => {
  //           console.log('SOCKET_CONNECTION::refreshToken::on', data);
  //           // this.refreshToken(data, isCloud);
  //         });
  //         socket.on('notifyToUser', (data: any) => {
  //           console.log('SOCKET_CONNECTION::notifyToUser::on', data);
  //           // this.notifyToUser(data, isCloud);
  //         });
  //       });
  //     } catch (error) {
  //       console.error('SOCKET_CONNECTION::ERROR', error);
  //     }
  //   }
  //   return () => {
  //     console.log('make socket disconnected');
  //     if (socket) {
  //       socket.disconnect();
  //       setSocket(undefined);
  //       console.log('SOCKET_CONNECTION::DISCONNECT');
  //     }
  //   };
  // }, [access_token, user_id, hotel_id, ip_local]);

  const getLocale = useMemo(() => {
    setIntl(locale);
    if (locale === ELocale.en) {
      dayjs.locale('en');
      return enUS;
    } else {
      dayjs.locale('vi-VN');
      return viVN;
    }
  }, [locale]);

  useEffect(() => {
    if (!asyncRouter.length && access_token) {
      initAsyncRoute(access_token);
    }
  }, []);

  const loading = useMemo(() => {
    if (!asyncRouter.length && access_token) {
      return true;
    }
    return false;
  }, [asyncRouter]);

  const { token } = theme.useToken();

  return (
    <StyleProvider transformers={[px2rem]}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: token.blue,
            // colorSuccess: color || COLORS.PrimaryColor,
            // fontFamily: 'Arial, apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          },
          components: {
            Table: {
              headerBorderRadius: 0,
            },
          },
          algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          cssVar: true,
          hashed: false,
        }}
        locale={getLocale}
      >
        <ProConfigProvider>
          <AntApp style={{ width: '100vw', height: '100vh' }}>
            <IntlProvider locale={locale} messages={localeConfig[locale]}>
              <MyGlobalContext.Provider
                value={{
                  socket,
                  setSocket,
                }}
              >
                {loading ? (
                  <LayoutSpin position="fixed" />
                ) : (
                  <Suspense fallback={<LayoutSpin />}>
                    <RouteView />
                  </Suspense>
                )}
              </MyGlobalContext.Provider>
            </IntlProvider>
          </AntApp>
        </ProConfigProvider>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
