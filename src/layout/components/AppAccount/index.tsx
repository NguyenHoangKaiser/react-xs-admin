import avatar from '@/assets/avatar.png';
import { FormattedMessage } from '@/locales';
import { useAppDispatch } from '@/store/hooks';
import { setSignOut } from '@/store/modules/user';
import { removeStorage } from '@/utils/storage';
import type { MenuProps } from 'antd';
import { Dropdown, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAccountStyle } from './style';

const AppAccount = () => {
  const { AccountDiv } = getAccountStyle();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: FormattedMessage({ id: 'login.signOut' }),
    },
  ];

  const menuChange: MenuProps['onClick'] = (_e) => {
    removeStorage('userInfo');
    dispatch(setSignOut());

    navigate('/login');
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
