import SvgIcon from '@/components/SvgIcon';
import { useLocale, type LocaleType } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppLocale, setAppThemeMode, setToggleNotice } from '@/store/modules/app';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Row, Space, Switch, theme, type MenuProps } from 'antd';
import { memo, useMemo } from 'react';

const OtherSetting = memo(() => {
  const thme = theme.useToken();
  const { formatMessage } = useLocale();
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);
  const themeMode = useAppSelector((state) => state.app.themeMode);
  const toggleNotice = useAppSelector((state) => state.app.toggleNotice);
  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      {
        label: formatMessage({ id: 'common.vietnamese' }),
        key: 'vi-VN',
        disabled: locale === 'vi-VN',
      }, // Be sure to fill in the menu item key
      {
        label: formatMessage({ id: 'common.english' }),
        key: 'en-US',
        disabled: locale === 'en-US',
      },
    ];
  }, [locale]);

  const menuClick: MenuProps['onClick'] = (info) => {
    dispatch(setAppLocale(info.key as LocaleType));
  };

  console.log(toggleNotice);
  return (
    <div className="flex-1">
      <span className="text-2xl font-semibold">
        {formatMessage({ id: 'manageAccount.setting' })}
      </span>
      <Row gutter={[0, 12]} className="mt-8 flex flex-col">
        <div className="flex flex-row items-center">
          <Col xs={8} xl={6} xxl={4}>
            <span>{formatMessage({ id: 'manageAccount.settingNotice' })}</span>
          </Col>
          <Col span={8}>
            <Switch
              size="default"
              onChange={() => dispatch(setToggleNotice(!toggleNotice))}
              value={toggleNotice}
            />
          </Col>
        </div>
        <div className="flex flex-row items-center">
          <Col xs={8} xl={6} xxl={4}>
            <span>{formatMessage({ id: 'manageAccount.changeTheme' })}</span>
          </Col>
          <Col span={8}>
            <div
              className={`app-theme cursor ${themeMode === 'dark' && 'app-theme-dark'}`}
              style={{ border: `1px solid ${thme.token.colorBorder}` }}
              onClick={() => {
                dispatch(setAppThemeMode(themeMode === 'dark' ? 'light' : 'dark'));
              }}
            >
              <div className="theme-inner" style={{ backgroundColor: thme.token.colorBorder }} />
              <SvgIcon name="sun" />
              <SvgIcon name="moon" />
            </div>
          </Col>
        </div>
        <div className="flex flex-row items-center">
          <Col xs={8} xl={6} xxl={4}>
            <span>{formatMessage({ id: 'manageAccount.changeLanguage' })}</span>
          </Col>
          <Col span={8}>
            <Dropdown menu={{ items: menuItems, onClick: menuClick }}>
              <Button>
                <Space>
                  {locale === 'en-US'
                    ? formatMessage({ id: 'common.english' })
                    : formatMessage({ id: 'common.vietnamese' })}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </div>
      </Row>
    </div>
  );
});

export default OtherSetting;
