import avatar from '@/assets/avatar.png';
import { FormatMessage } from '@/locales';
import { RouteEnum } from '@/router/utils';
import { useLogoutMutation } from '@/server/authApi';
import { useAppSelector } from '@/store/hooks';
import { removeStorage } from '@/utils/storage';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Flex, Image, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccountStyle } from './style';

const AppAccount = () => {
  const { AccountDiv } = getAccountStyle();

  const { userInfo } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [logout, { data }] = useLogoutMutation();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: FormatMessage({ id: 'common.profile' }),
    },
    {
      key: '2',
      label: FormatMessage({ id: 'login.signOut' }),
    },
  ];

  useEffect(() => {
    return () => {
      if (data) {
        removeStorage('access_token');
        navigate('/login');
      }
    };
  }, [data, navigate]);

  const menuChange: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case '1':
        navigate(RouteEnum.ManageAccount);
        break;
      case '2':
        logout();
        break;
      default:
        break;
    }
  };

  return (
    <AccountDiv className="cursor">
      <Dropdown
        menu={{
          items,
          onClick: menuChange,
        }}
        placement="bottom"
      >
        <Flex align="center" justify="space-between" gap={5}>
          <Image src={avatar} className="wave" preview={false} />
          <Typography.Text>{userInfo?.name}</Typography.Text>
          <DownOutlined
            style={{
              fontSize: 12,
            }}
          />
        </Flex>
      </Dropdown>
    </AccountDiv>
  );
};

export default AppAccount;
