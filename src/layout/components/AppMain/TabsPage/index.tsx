import { useRouteList } from '@/hooks/useRouteList';
import { FormatMessage } from '@/locales';
import { defaultRoute } from '@/router/modules';
import { RouteEnum, findRouteByPath } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteExceedTabs } from '@/store/modules/route';
import { sceneSelector } from '@/store/modules/scene';
import { defaultDimension } from '@/utils/constant';
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import { memo, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
// import { CaretDownFilled, ReloadOutlined } from '@ant-design/icons';
// import { useRefresh } from '@/hooks/web/useRefresh';
import TabsItemLabel from './components/TabsItemLabel';
import { useTabsChange } from './hooks/useTabsChange';
import { getTabsStyle } from './style';

interface Props {
  maxLen?: number;
}

const TabsPage = memo(({ maxLen }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const mark = useMatch(location.pathname);
  const { routeListToTab } = useRouteList();
  const menuList = routeListToTab(defaultRoute);
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const multiTabs = useAppSelector((state) => state.route.multiTabs);
  const { addingScene, editingScene } = useAppSelector(sceneSelector);
  const { addRouteTabs, removeTab } = useTabsChange();
  const thme = theme.useToken();

  const tabsItem = useMemo(() => {
    if (!multiTabs.length) return [];
    if (maxLen && multiTabs.length > maxLen) {
      dispatch(deleteExceedTabs());
    }

    return multiTabs.map((i) => {
      let routeBy = null;
      if (!i.label) routeBy = findRouteByPath(i.key, menuList);
      return {
        key: i.key,
        label: (
          <TabsItemLabel pathKey={i.key}>
            <div className="tabs-tab-label">
              {i.localeLabel ? FormatMessage({ id: i.localeLabel }) : ''}
              {i.label || routeBy?.label}
            </div>
          </TabsItemLabel>
        ),
      };
    });
  }, [multiTabs]);

  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      removeTab(targetKey as string, {
        route: [RouteEnum.SettingsScenesAdd, RouteEnum.SettingsScenesEdit],
        title: formatMessage({ id: 'common.leavePageConfirm' }),
        content: formatMessage({ id: 'common.scene.lostUnsaved' }),
        trigger: addingScene || editingScene,
      });
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      if (asyncRouter.length) navigate(asyncRouter[0].path);
      return;
    }

    const findRoute = findRouteByPath(location.pathname, menuList);
    if (findRoute && !findRoute.hideTabs) {
      addRouteTabs();
    }
  }, [location.pathname, mark]);

  return (
    <Tabs
      css={getTabsStyle(thme.token)}
      hideAdd
      size="small"
      activeKey={location.pathname + location.search}
      type={tabsItem.length > 1 ? 'editable-card' : 'card'}
      onChange={(key) => navigate(key)}
      onEdit={onEdit}
      tabBarGutter={4}
      tabPosition="top"
      style={{ width: defaultDimension.width }}
      tabBarStyle={{
        margin: 0,
        paddingTop: 8,
      }}
      items={tabsItem}
    />
  );
});

export default TabsPage;
