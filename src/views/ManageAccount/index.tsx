import { getIntlText } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTabActiveKey } from '@/store/modules/app';
import { Tabs } from 'antd';
import React from 'react';
import ChangePassword from './components/ChangePassword';
import InfoAccount from './components/InfoAccount';
import OtherSetting from './components/OtherSetting';

const ManageAccount: React.FC = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { tabActiveKey } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const items = [
    {
      label: getIntlText({ id: 'manageAccount.info' }),
      key: 'info',
      children: <InfoAccount userInfo={userInfo} />,
    },
    {
      label: getIntlText({ id: 'manageAccount.changePassword' }),
      key: 'changePassword',
      children: <ChangePassword />,
    },
    {
      label: getIntlText({ id: 'manageAccount.setting' }),
      key: 'config',
      children: <OtherSetting />,
    },
  ];

  return (
    <Tabs
      style={{ minHeight: '85vh', marginTop: 16 }}
      tabBarStyle={{ width: 200 }}
      tabPosition={'left'}
      defaultActiveKey={tabActiveKey}
      onChange={(key) => dispatch(setTabActiveKey(key))}
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
