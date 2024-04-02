import { FormatMessage } from '@/locales';
import { Tabs } from 'antd';
import React from 'react';
import StatisticEcology from './component/StatisticEcology';
import StatisticGeneral from './component/StatisticGeneral';
import StatisticSavings from './component/StatisticSavings';

const Statistical: React.FC = () => {
  const items = [
    {
      label: FormatMessage({ id: 'statistic.general' }),
      key: 'general',
      children: <StatisticGeneral />,
    },
    {
      label: FormatMessage({ id: 'statistic.savings' }),
      key: 'savings',
      children: <StatisticSavings />,
    },
    {
      label: FormatMessage({ id: 'statistic.ecology' }),
      key: 'ecology',
      children: <StatisticEcology />,
    },
  ];

  return (
    <Tabs
      style={{ minHeight: '88vh', paddingLeft: 8, paddingRight: 8 }}
      tabPosition={'top'}
      tabBarStyle={{ paddingLeft: 16 }}
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

export default Statistical;
