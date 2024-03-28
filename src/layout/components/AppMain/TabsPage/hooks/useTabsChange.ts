import { useRefresh } from '@/hooks/web/useRefresh';
import type { RouteEnum } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { MultiTabsType } from '@/store/modules/route';
import { setStoreMultiTabs } from '@/store/modules/route';

import { App } from 'antd';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { RightClickTags } from './useTabsState';
interface IConfirmRemoveTab {
  callback?: () => void;
  title: ReactNode;
  content: ReactNode;
  route: string[];
  trigger: boolean;
  slice?: [number, number];
}
export const useTabsChange = () => {
  const { modal } = App.useApp();
  const multiTabs = useAppSelector((state) => state.route.multiTabs);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { refresh } = useRefresh();

  const handleTabsList = (pathName: string, type: 'add' | 'delete') => {
    dispatch(
      setStoreMultiTabs({
        type,
        tabs: {
          key: pathName,
        },
      }),
    );
  };

  const getCurrentPathname = (): string => {
    return location.pathname + location.search;
  };

  // Add tabs
  const addRouteTabs = () => {
    handleTabsList(getCurrentPathname(), 'add');
  };

  // Turn off the current navigation
  const removeTab = (pathKey: string, confirm?: IConfirmRemoveTab) => {
    const item = multiTabs.findIndex((i) => i.key === pathKey);
    const tabsLength = multiTabs.length;
    const pathRoute = confirm?.slice
      ? pathKey.split('/').slice(confirm.slice[0], confirm.slice[1]).join('/')
      : pathKey.split('/').slice(0, 4).join('/');
    if (confirm && confirm.trigger && confirm.route.includes(pathRoute as RouteEnum)) {
      const { callback, title, content } = confirm;
      modal.confirm({
        title,
        content,
        onOk() {
          let value: MultiTabsType;
          if (multiTabs[item].key === getCurrentPathname()) {
            if (item === tabsLength - 1) {
              value = multiTabs[item - 1];
            } else {
              value = multiTabs[tabsLength - 1];
            }
            navigate(value.key);
          }

          handleTabsList(pathKey, 'delete');
          callback && callback();
        },
        onCancel() {
          return;
        },
      });
    } else {
      let value: MultiTabsType;
      if (multiTabs[item].key === getCurrentPathname()) {
        if (item === tabsLength - 1) {
          value = multiTabs[item - 1];
        } else {
          value = multiTabs[tabsLength - 1];
        }
        navigate(value.key);
      }

      handleTabsList(pathKey, 'delete');
    }
  };

  const closeTabsRoute = (
    pathKey: string,
    type: 'other' | 'left' | 'right',
    confirm?: IConfirmRemoveTab,
  ) => {
    const selectItemIndex = multiTabs.findIndex((i) => i.key === pathKey);
    const mapList = multiTabs.filter((i, index) => {
      if (i.key !== pathKey && type === 'other') return true;
      else if (index < selectItemIndex && type === 'left') return true;
      else if (index > selectItemIndex && type === 'right') return true;
      return false;
    });
    if (mapList.find((i) => i.key === getCurrentPathname())) {
      const { key } = multiTabs[selectItemIndex];
      navigate(key);
    }
    if (
      confirm &&
      confirm.trigger &&
      mapList.find((i) => {
        const pathRoute = confirm?.slice
          ? i.key.split('/').slice(confirm.slice[0], confirm.slice[1]).join('/')
          : i.key.split('/').slice(0, 4).join('/');
        return confirm.route.includes(pathRoute as RouteEnum);
      })
    ) {
      modal.confirm({
        title: confirm.title,
        content: confirm.content,
        onOk() {
          mapList.forEach((i) => {
            handleTabsList(i.key, 'delete');
          });
          confirm.callback && confirm.callback();
        },
        onCancel() {
          return;
        },
      });
      return;
    } else {
      mapList.forEach((i) => {
        handleTabsList(i.key, 'delete');
      });
    }
  };

  const onTabsDropdownChange = (
    code: RightClickTags['code'],
    pathKey: string,
    confirm?: IConfirmRemoveTab,
  ) => {
    switch (code) {
      case 'refresh':
        refresh(pathKey);
        break;
      case 'close':
        removeTab(pathKey, confirm);
        break;
      case 'closeLeftOther':
        closeTabsRoute(pathKey, 'left', confirm);
        break;
      case 'closeRightOther':
        closeTabsRoute(pathKey, 'right', confirm);
        break;
      case 'closeOther':
        closeTabsRoute(pathKey, 'other', confirm);
        break;
      default:
        break;
    }
  };

  return { onTabsDropdownChange, addRouteTabs, removeTab };
};
