import AppLocale from '@/components/AppLocale';
import AppTheme from '@/components/AppTheme';
import { useLocale } from '@/locales';
import { initAsyncRoute } from '@/router/utils';
import { useLoginMutation } from '@/server/authApi';
import { useAppSelector } from '@/store/hooks';
import { AlipayOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Divider, Space, theme } from 'antd';
import type { CSSProperties } from 'react';
import { memo, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import type { LoginForm } from './type';
const Login = memo(() => {
  const { formatMessage } = useLocale();

  const thme = theme.useToken();

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const { access_token } = useAppSelector((state) => state.user);
  const [autoPlay, isAutoPlay] = useState(true);

  // skip this query if the user is not logged in (the token is not available)
  // const { data: userInfo } = useGetUserInfoQuery(undefined, {
  //   skip: !userStore.access_token,
  // });
  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  useEffect(() => {
    if (access_token) {
      navigate('/home');
    }
  }, [access_token]);

  const onFinish = async (values: LoginForm) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      // dispatch(setToken(res.access_token));
      await initAsyncRoute(res.access_token);
      // Info: we can use the following code to get user information or use the useGetUserInfoQuery hook like above
      // const userInfo = await getUserInfo(res.token);
      // if (userInfo.code === 1) {
      //   dispatch(setUserInfo(userInfo.data));
      //   navigate('/home');
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://wallpapercave.com/wp/wp4756877.jpg"
        logo="src/assets/luci_logo.png"
        backgroundVideoUrl={
          autoPlay
            ? 'https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
            : ''
        }
        title={formatMessage({ id: 'common.login' })}
        onFinish={onFinish}
        containerStyle={{
          backgroundColor: thme.token.colorBgBase,
          backdropFilter: 'blur(4px)',
        }}
        subTitle=" "
        actions={
          <div className="flex justify-center items-center flex-col">
            <Divider plain>
              <span
                style={{
                  color: thme.token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                {formatMessage({ id: 'common.other' })}
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div
                className="flex justify-center items-center flex-col h-10 w-10 rounded-full"
                style={{
                  border: '1px solid ' + thme.token.colorPrimaryBorder,
                }}
              >
                <AlipayOutlined
                  style={{ ...iconStyles, color: '#1677FF' }}
                  onClick={() => isAutoPlay(!autoPlay)}
                />
              </div>
            </Space>
            <div className="flex justify-center items-center flex-col h-10 w-10 absolute top-1 right-3">
              <AppTheme />
            </div>
            <div className="flex justify-center items-center flex-col h-10 w-10 absolute top-1 left-3">
              <AppLocale />
            </div>
          </div>
        }
      >
        <>
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: (
                <UserOutlined
                  style={{
                    color: thme.token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={formatMessage({ id: 'login.username' })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="login.userNameRules"
                    defaultMessage="Please input the name"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: thme.token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            placeholder={formatMessage({ id: 'login.password' })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="common.requirePassword" />,
              },
            ]}
          />
        </>

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="remember" valuePropName="checked">
            {formatMessage({ id: 'common.rememberPassword' })}
          </ProFormCheckbox>
          <a
            href={'/forgot'}
            style={{
              float: 'right',
            }}
          >
            {formatMessage({ id: 'login.forgotPassword' })}
          </a>
        </div>
      </LoginFormPage>

      <div
        className="-translate-x-1/2 absolute bottom-3 left-1/2 z-[666] text-white text-lg"
        style={{
          display: 'ruby',
        }}
      >
        {formatMessage({ id: 'common.license' })}
        <a
          style={{ color: 'white', paddingLeft: 4 }}
          href="http://luci.vn"
          rel="noopener noreferrer"
          target="_blank"
        >
          LUCI .,JSC
        </a>
      </div>
    </div>
  );
});

export default Login;
