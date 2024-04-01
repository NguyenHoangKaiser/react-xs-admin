import AppLocale from '@/components/AppLocale';
import AppTheme from '@/components/AppTheme';
import { useLocale } from '@/locales';
import { authApi } from '@/server/authApi';
import { AlipayOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, Form, Space, theme } from 'antd';
import type { CSSProperties } from 'react';
import { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { getCss } from './style';
import type { ForgotPasswordForm } from './type';
type ForgotStep = 'verify' | 'reset';

const Forgot = memo(() => {
  const { formatMessage } = useLocale();

  const thme = theme.useToken();

  const navigate = useNavigate();

  const [forgot] = authApi.useForgotMutation();
  const [autoPlay, isAutoPlay] = useState(true);
  const [forgotStep, setForgotStep] = useState<ForgotStep>('verify');

  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  const onVerify = async (values: ForgotPasswordForm) => {
    if (values.otp == '1234') {
      setForgotStep('reset');
    }
  };

  const onFinish = async () => {
    navigate('/login');
    // try {
    //   const res = await forgot({
    //     email: values.email,
    //   }).unwrap();
    //   // Info: we can use the following code to get user information or use the useGetUserInfoQuery hook like above
    //   // const userInfo = await getUserInfo(res.token);
    //   // if (userInfo.code === 1) {
    //   //   dispatch(setUserInfo(userInfo.data));
    //   //   navigate('/home');
    //   // }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const [form] = Form.useForm();
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://wallpapercave.com/wp/wp4756877.jpg"
        logo="src/assets/luci_logo.png"
        backgroundVideoUrl={
          autoPlay
            ? 'https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
            : ''
        }
        title={formatMessage({ id: 'common.forgotPassword' })}
        onFinish={forgotStep == 'verify' ? onVerify : onFinish}
        containerStyle={{
          backgroundColor: thme.token.colorBgBase,
          backdropFilter: 'blur(4px)',
        }}
        submitter={{
          searchConfig: {
            submitText:
              forgotStep == 'verify'
                ? formatMessage({ id: 'common.continue' })
                : formatMessage({ id: 'common.changePassword' }),
          },
        }}
        subTitle=" "
        actions={
          <div className="flex justify-center items-center flex-col pt-4">
            <Button
              css={getCss()}
              className="w-full h-10"
              style={{ color: '#1677FF ' }}
              type="text"
              onClick={() => {
                forgotStep == 'verify' ? navigate('/') : setForgotStep('verify');
              }}
            >
              {formatMessage({ id: 'common.backToLogin' })}
            </Button>
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
            name="email"
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
          {forgotStep == 'verify' && (
            <ProFormCaptcha
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
              captchaProps={{
                size: 'large',
              }}
              placeholder={formatMessage({ id: 'common.otp' })}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'s'}`;
                }
                return formatMessage({ id: 'common.sendCode' });
              }}
              name="otp"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="common.requireOtp" />,
                },
              ]}
              onGetCaptcha={async () => {
                try {
                  await forgot({
                    email: form.getFieldValue('email'),
                  }).unwrap();
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          )}
          {forgotStep == 'reset' && (
            <>
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
                placeholder={formatMessage({ id: 'common.newPassword' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="common.requirePassword" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="rPassword"
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
                placeholder={formatMessage({ id: 'common.reEnterPassword' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="common.requirePassword" />,
                  },
                  ({ getFieldValue }) => ({
                    validator(_) {
                      if (getFieldValue('rPassword') != getFieldValue('password')) {
                        return Promise.reject(formatMessage({ id: 'common.passwordNotMatch' }));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              />
            </>
          )}
        </>
      </LoginFormPage>
      <div
        className="-translate-x-1/2 absolute bottom-3 left-1/2 z-[666] text-white text-base"
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
export default Forgot;
