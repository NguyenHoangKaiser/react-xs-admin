import avatar from '@/assets/avatar.png';
import { FormattedMessage } from '@/locales';
import { useLogoutMutation } from '@/server/authApi';
import { useAppSelector } from '@/store/hooks';
import { removeStorage } from '@/utils/storage';
import type { MenuProps } from 'antd';
import { Dropdown, Image, message } from 'antd';
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
      label: FormattedMessage({ id: 'login.signOut' }),
    },
    {
      key: '2',
      label: userInfo?.name,
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
        logout();
        break;
      case '2':
        message.info(userInfo?.name);
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
        arrow
      >
        <Image src={avatar} className="wave" preview={false} />
      </Dropdown>
    </AccountDiv>
  );
};

export default AppAccount;
