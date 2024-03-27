import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import { memo, useEffect, useMemo } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
// import { CaretDownFilled, ReloadOutlined } from '@ant-design/icons';
import { defaultRoute } from '@/router/modules';
import { findRouteByPath, RouteEnum } from '@/router/utils';
import { useAppSelector } from '@/store/hooks';
// import { useRefresh } from '@/hooks/web/useRefresh';
import { useRouteList } from '@/hooks/useRouteList';
import { FormattedMessage } from '@/locales';
import { sceneSelector } from '@/store/modules/scene';
import TabsItemLabel from './components/TabsItemLabel';
import { useTabsChange } from './hooks/useTabsChange';
import { getTabsStyle } from './style';

interface Props {
  maxLen?: number;
}

const TabsPage = memo((_props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mark = useMatch(location.pathname);
  const { routeListToTab } = useRouteList();
  const menuList = routeListToTab(defaultRoute);
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const multiTabs = useAppSelector((state) => state.route.multiTabs);
  const { addingScene } = useAppSelector(sceneSelector);
  const { addRouteTabs, removeTab } = useTabsChange();
  // const { refresh } = useRefresh();

  const thme = theme.useToken();

  const tabsItem = useMemo(() => {
    return multiTabs.map((i) => {
      let routeBy = null;
      if (!i.label) routeBy = findRouteByPath(i.key, menuList);
      return {
        key: i.key,
        label: (
          <TabsItemLabel pathKey={i.key}>
            <div className="tabs-tab-label">
              {i.localeLabel ? FormattedMessage({ id: i.localeLabel }) : ''}
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
        route: [RouteEnum.SettingsScenesAdd],
        title: 'Are you sure you want to leave? Any unsaved changes will be lost.',
        trigger: addingScene,
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
      // tabBarExtraContent={{
      //   right: (
      //     <div className="tabs-right-content">
      //       <div className="right-down-more" onClick={() => refresh()}>
      //         <ReloadOutlined />
      //       </div>
      //       <TabsItemLabel
      //         eventType="click"
      //         pathKey={location.pathname + location.search}
      //         className="right-down-more"
      //       >
      //         <CaretDownFilled />
      //       </TabsItemLabel>
      //     </div>
      //   ),
      // }}
      tabBarStyle={{
        margin: 0,
        marginLeft: 11,
        paddingTop: 8,
      }}
      items={tabsItem}
    />
  );
});

export default TabsPage;
