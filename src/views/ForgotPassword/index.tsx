import AppLocale from '@/components/AppLocale';
import AppTheme from '@/components/AppTheme';
import { useLocale } from '@/locales';
import { authApi } from '@/server/authApi';
import { AlipayOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, Space, theme } from 'antd';
import type { CSSProperties } from 'react';
import { memo, useState } from 'react';
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
  const [emailT, setEmailT] = useState('1');
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
        title="Quên mật khẩu"
        onFinish={forgotStep == 'verify' ? onVerify : onFinish}
        containerStyle={{
          backgroundColor: thme.token.colorBgBase,
          backdropFilter: 'blur(4px)',
        }}
        submitter={{
          searchConfig: {
            submitText: forgotStep == 'verify' ? 'Tiếp tục' : 'Thay đổi mật khẩu',
          },
        }}
        onValuesChange={(changeValues) => setEmailT(changeValues.email)}
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
              Quay lại Đăng nhập
            </Button>
            <Divider plain>
              <span
                style={{
                  color: thme.token.colorTextPlaceholder,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}
              >
                Khác
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
            rules={[{ required: true, message: formatMessage({ id: 'login.userNameRules' }) }]}
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
              phoneName="otp"
              placeholder={'Mã OTP: 1234'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'Còn'}`;
                }
                return 'Gửi mã';
              }}
              name="otp"
              rules={[
                {
                  required: true,
                  message: 'Mã OTP không được để trống',
                },
              ]}
              onGetCaptcha={async () => {
                try {
                  await forgot({
                    email: emailT,
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
                placeholder={'Mật khẩu mới'}
                rules={[
                  {
                    required: true,
                    message: 'Mật khẩu không được để trống',
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
                placeholder={'Nhập lại mật khẩu mới'}
                rules={[
                  {
                    required: true,
                    message: 'Mật khẩu không được để trống',
                  },
                  ({ getFieldValue }) => ({
                    validator(_) {
                      if (getFieldValue('rPassword') != getFieldValue('password')) {
                        return Promise.reject('Mật khẩu không trùng khớp');
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
        Bản quyền thuộc © 2024
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
