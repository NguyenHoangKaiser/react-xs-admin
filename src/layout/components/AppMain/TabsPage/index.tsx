import { useRouteList } from '@/hooks/useRouteList';
import { FormatMessage } from '@/locales';
import { defaultRoute } from '@/router/modules';
import { RouteEnum, findRouteByPath } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  asyncRouterSelector,
  deleteExceedTabs,
  multiTabsSelector,
  setSortMultiTabs,
} from '@/store/modules/route';
import { sceneSelector } from '@/store/modules/scene';
import { AppDefault } from '@/utils/constant';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, closestCenter, useSensor } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import React, { memo, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import TabsItemLabel from './components/TabsItemLabel';
import { useTabsChange } from './hooks/useTabsChange';
import { getTabsStyle } from './style';

interface Props {
  maxLen?: number;
}

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
}

const commonStyle: React.CSSProperties = {
  cursor: 'grab',
  transition: 'unset', // Prevent element from shaking after drag
};

// combination of Tags and Tabs draggable example from antd 5
const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-node-key'],
  });

  const style: React.CSSProperties = transform
    ? {
        ...props.style,
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? 'unset' : transition,
        cursor: 'grabbing',
      }
    : {
        ...commonStyle,
        ...props.style,
      };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

const TabsPage = memo(({ maxLen }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const mark = useMatch(location.pathname);
  const { routeListToTab } = useRouteList();
  const menuList = routeListToTab(defaultRoute);
  const asyncRouter = useAppSelector(asyncRouterSelector);
  const multiTabs = useAppSelector(multiTabsSelector);
  const { addingScene, editingScene } = useAppSelector(sceneSelector);
  const { addRouteTabs, removeTab } = useTabsChange();
  const thme = theme.useToken();

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10, delay: 250, tolerance: 5 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = multiTabs.findIndex((i) => i.key === active.id);
      const overIndex = multiTabs.findIndex((i) => i.key === over?.id);
      const newTabs = arrayMove(multiTabs, activeIndex, overIndex);
      dispatch(setSortMultiTabs(newTabs));
      return;
    }
  };

  const tabsItem = useMemo(() => {
    if (!multiTabs.length) return [];
    if (maxLen && multiTabs.length > maxLen) {
      dispatch(deleteExceedTabs());
    }

    return multiTabs.map((i) => {
      let routeBy = null;
      if (!i.label) routeBy = findRouteByPath(i.key, menuList, true);
      return {
        key: i.key,
        label: (
          <TabsItemLabel pathKey={i.key}>
            <span className="tabs-tab-label">
              {i.localeLabel ? FormatMessage({ id: i.localeLabel }) : ''}
              {i.label || routeBy?.label}
            </span>
          </TabsItemLabel>
        ),
        icon: routeBy?.icon,
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
      style={{ width: AppDefault.width }}
      tabBarStyle={{
        margin: 0,
        paddingTop: 8,
      }}
      items={tabsItem}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext
          modifiers={[restrictToHorizontalAxis]}
          sensors={[sensor]}
          onDragEnd={onDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={tabsItem.map((i) => i.key)}
            strategy={horizontalListSortingStrategy}
          >
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode {...node.props} key={node.key}>
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
});

export default TabsPage;
