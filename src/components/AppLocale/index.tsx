import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { memo, useMemo } from 'react';
import SvgIcon from '../SvgIcon';
import { setAppLocale } from '@/store/modules/app';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { LocaleType } from '@/locales';

const Locale = memo(() => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      { label: 'Vietnamese', key: 'vi-VN', disabled: locale === 'vi-VN' }, // Be sure to fill in the menu item key
      { label: 'English', key: 'en-US', disabled: locale === 'en-US' },
    ];
  }, [locale]);

  const menuClick: MenuProps['onClick'] = (info) => {
    dispatch(setAppLocale(info.key as LocaleType));
  };

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: menuClick }}
      placement="bottom"
      trigger={['hover']}
    >
      <span style={{ fontSize: '1em' }}>
        <SvgIcon name="locales" />
      </span>
    </Dropdown>
  );
});

export default Locale;
