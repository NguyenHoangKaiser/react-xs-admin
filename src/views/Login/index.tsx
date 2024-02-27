import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, Input, theme } from 'antd';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginForm } from './type';
import logo from '@/assets/logo.png';
import AppLocale from '@/components/AppLocale';
import AppTheme from '@/components/AppTheme';
import { useLocale } from '@/locales';
import { initAsyncRoute } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setToken, setUserInfo } from '@/store/modules/user';
// import { getUserInfo } from '@/server/axios';
import { useGetUserInfoQuery, useLoginMutation } from '@/server/authApi';
// import { createErrorMsg } from '@/hooks/web/useMessage';

const Login = memo(() => {
  const { formatMessage } = useLocale();

  const thme = theme.useToken();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const userStore = useAppSelector((state) => state.user);

  // skip this query if the user is not logged in (the token is not available)
  const { data: userInfo } = useGetUserInfoQuery(undefined, {
    skip: !userStore.token,
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(setUserInfo(userInfo));
      navigate('/home');
    }
  }, [userInfo]);

  const onFinish = async (values: LoginForm) => {
    try {
      const res = await login({ username: values.username, password: values.password }).unwrap();
      dispatch(setToken(res.token));
      await initAsyncRoute(res.token);
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
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{ backgroundColor: thme.token.colorBgContainer, color: thme.token.colorText }}
    >
      <div className="flex flex-row justify-center items-center absolute top-3 right-3 gap-3">
        <AppLocale />
        <AppTheme />
      </div>
      <div className="p-10" style={{ boxShadow: '0 15px 25px #0009' }}>
        <div className="mb-10 flex flex-row items-center justify-center ">
          <Image src={logo} width={44} height={44} preview={false} />
          <h2 className="m-0 ml-4">React Xs Admin</h2>
        </div>
        <Form
          className="w-[360px]"
          name="normal_login"
          size="large"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item<LoginForm>
            name="username"
            rules={[{ required: true, message: formatMessage({ id: 'login.userNameRules' }) }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={formatMessage({ id: 'login.username' })}
              allowClear
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item<LoginForm>
            name="password"
            rules={[{ required: true, message: formatMessage({ id: 'login.passwordRules' }) }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={formatMessage({ id: 'login.password' })}
              allowClear
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item<LoginForm>>
            <div className="flex flex-row justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{formatMessage({ id: 'login.rememberPassword' })}</Checkbox>
              </Form.Item>

              <Button type="link" className="p-0" style={{ color: thme.token.colorPrimary }}>
                {formatMessage({ id: 'login.forgotPassword' })}
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
              {formatMessage({ id: 'login.button' })}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Login;
