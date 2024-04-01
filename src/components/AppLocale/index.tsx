import { useLocale, type LocaleType } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppLocale } from '@/store/modules/app';
import { ELocale } from '@/utils/constant';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { memo, useMemo } from 'react';
import SvgIcon from '../SvgIcon';

const Locale = memo(() => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);
  const { formatMessage } = useLocale();

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      {
        label: formatMessage({ id: 'common.vietnamese' }),
        key: ELocale.vi,
        disabled: locale === ELocale.vi,
      }, // Be sure to fill in the menu item key
      {
        label: formatMessage({ id: 'common.english' }),
        key: ELocale.en,
        disabled: locale === ELocale.en,
      },
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
      <span style={{ fontSize: '1.25em' }}>
        <SvgIcon name="locales" />
      </span>
    </Dropdown>
  );
});

export default Locale;
