import { useLocale } from '@/locales';
import { useAppSelector } from '@/store/hooks';
import { Tabs } from 'antd';
import React from 'react';
import ChangePassword from './components/ChangePassword';
import InfoAccount from './components/InfoAccount';
import OtherSetting from './components/OtherSetting';

const ManageAccount: React.FC = () => {
  const { formatMessage } = useLocale();
  const { userInfo } = useAppSelector((state) => state.user);

  const items = [
    {
      label: formatMessage({ id: 'manageAccount.info' }),
      key: 'info',
      children: <InfoAccount userInfo={userInfo} />,
    },
    {
      label: formatMessage({ id: 'manageAccount.changePassword' }),
      key: 'changePassword',
      children: <ChangePassword />,
    },
    {
      label: formatMessage({ id: 'manageAccount.setting' }),
      key: 'otherSetting',
      children: <OtherSetting />,
    },
  ];

  return (
    <Tabs
      style={{ minHeight: '85vh', marginTop: 16 }}
      tabBarStyle={{ width: 200 }}
      tabPosition={'left'}
      items={items.map((_) => {
        return {
          label: _.label,
          key: _.key,
          children: _.children,
        };
      })}
    />
  );
};

export default ManageAccount;
