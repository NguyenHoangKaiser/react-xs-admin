import { SettingOutlined } from '@ant-design/icons';
import { Divider, Drawer, theme, Tooltip } from 'antd';
import classNames from 'classnames';
import { memo, useState } from 'react';

import { getSidebarMode } from './style';
import ThemeSettings from './ThemeSettings';
import { useLocale } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { AppConfigMode } from '@/store/modules/app';
import { setAppSidebarMode } from '@/store/modules/app';

const Setting = memo(() => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const sidebarMode = useAppSelector((state) => state.app.sidebarMode);

  const thme = theme.useToken();

  const intl = useLocale();

  const sidebarSetting: { label: string; value: AppConfigMode['sidebarMode'] }[] = [
    {
      label: 'Left menu mode',
      value: 'vertical',
    },
    {
      label: 'Top menu mode',
      value: 'horizontal',
    },
    {
      label: 'Mixed menu mode',
      value: 'blend',
    },
  ];

  return (
    <>
      <SettingOutlined onClick={() => setDrawerOpen(true)} />
      <Drawer
        width={300}
        title={intl.formatMessage({ id: 'layout.setting.title' })}
        placement="right"
        styles={{ body: { padding: 0, height: '100%' } }}
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div className="setting" css={getSidebarMode(thme.token)}>
          <Divider>{intl.formatMessage({ id: 'layout.setting.layoutSettings' })}</Divider>
          <div className="sidebar_setting">
            {sidebarSetting.map((i) => {
              return (
                <Tooltip placement="bottom" title={i.label} key={i.value}>
                  <div
                    className={classNames('cursor', 'sidebar_mode', {
                      'sidebar_mode-select': sidebarMode === i.value,
                    })}
                    onClick={() => {
                      dispatch(setAppSidebarMode(i.value));
                    }}
                  >
                    <div />
                    <div />
                  </div>
                </Tooltip>
              );
            })}
          </div>
          <Divider>{intl.formatMessage({ id: 'layout.setting.themeSettings' })}</Divider>

          <ThemeSettings />
        </div>
      </Drawer>
    </>
  );
});

export default Setting;
