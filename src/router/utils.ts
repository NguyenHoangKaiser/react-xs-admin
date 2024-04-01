import type { MenuItem, RouteList } from '@/router/route';
import store from '@/store';
import type { AsyncRouteType } from '@/store/modules/route';
import { setStoreAsyncRouter } from '@/store/modules/route';
import { cloneDeep } from 'lodash-es';
import type { Key } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { defaultRoute } from './modules';
// import { getRouteApi } from '@/server/axios';

// import { HomeOutlined } from '@ant-design/icons';

export enum RouteEnum {
  Home = '/home',
  Login = '/login',
  // Nested = '/nested',
  // Menu1 = '/nested/menu1',
  // Menu1_1 = '/nested/menu1/menu1-1',
  // Menu1_2 = '/nested/menu1/menu1-2',
  // Power = '/power',
  // Permissions = '/power/permissions',
  // TestPermissionsA = '/power/test-permissions-a',
  // TestPermissionsB = '/power/test-permissions-b',
  // DetailsPage = '/details-page',
  // DetailPageIndex = '/details-page/index',
  // DetailsInfo = '/details-page/details-info',
  // DetailsParams = '/details-page/details-params',
  Forgot = '/forgot',
  ManageAccount = '/manage-account',
  Settings = '/setting',
  SettingsDevices = '/setting/devices',
  SettingsScenes = '/setting/scenes',
  SettingsGroups = '/setting/groups',
  Statistical = '/statistical',
  Notification = '/notification',
  SettingsArea = '/setting/area',
  SettingsScenesList = '/setting/scenes/list',
  SettingsScenesAdd = '/setting/scenes/add',
  SettingsScenesEdit = '/setting/scenes/edit',
  SettingsScenesDetail = '/setting/scenes/detail',
  Calendar = '/calendar',
  CalendarAdd = '/calendar/add',
}

const arr = [
  {
    path: RouteEnum.Home,
    id: 'Home',
  },
  // {
  //   path: RouteEnum.Nested,
  //   id: 'Nested',
  //   redirect: RouteEnum.Menu1,
  //   children: [
  //     {
  //       path: 'menu1',
  //       id: 'Menu1',
  //       redirect: RouteEnum.Menu1_1,
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           id: 'Menu1-1',
  //         },
  //         {
  //           path: 'menu1-2',
  //           id: 'Menu1-2',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: RouteEnum.Power,
  //   id: 'Power',
  //   redirect: RouteEnum.Permissions,
  //   children: [
  //     {
  //       path: 'permissions',
  //       id: 'Permissions',
  //     },
  //     {
  //       path: 'test-permissions-a',
  //       id: 'TestPermissionsA',
  //     },
  //     {
  //       path: 'test-permissions-b',
  //       id: 'TestPermissionsB',
  //     },
  //   ],
  // },
  // {
  //   path: RouteEnum.DetailsPage,
  //   id: 'DetailsPage',
  //   redirect: RouteEnum.DetailPageIndex,
  //   children: [
  //     {
  //       path: 'index',
  //       id: 'INDEX',
  //     },
  //     {
  //       path: 'details-info',
  //       id: 'DetailsInfo',
  //     },
  //     {
  //       path: 'details-params/:id',
  //       id: 'DetailsParams',
  //     },
  //   ],
  // },
  {
    path: RouteEnum.ManageAccount,
    id: 'ManageAccount',
  },
  {
    path: RouteEnum.Settings,
    id: 'Settings',
    redirect: RouteEnum.SettingsDevices,
    children: [
      { path: 'devices', id: 'SettingsDevices' },
      {
        path: 'scenes',
        id: 'SettingsScenes',
        redirect: RouteEnum.SettingsScenesList,
        children: [
          { path: 'list', id: 'SettingsScenesList' },
          { path: 'add', id: 'SettingsScenesAdd' },
          { path: 'edit/:id', id: 'SettingsScenesEdit' },
          { path: 'detail/:id', id: 'SettingsScenesDetail' },
        ],
      },
      {
        path: 'groups',
        id: 'SettingsGroups',
      },
      {
        path: 'area',
        id: 'SettingsArea',
      },
    ],
  },
  {
    path: RouteEnum.Statistical,
    id: 'Statistical',
  },
  {
    path: RouteEnum.Notification,
    id: 'Notification',
  },
  {
    path: RouteEnum.Calendar,
    id: 'Calendar',
  },
  {
    path: RouteEnum.CalendarAdd,
    id: 'CalendarAdd',
  },
];

export async function initAsyncRoute(_token: string) {
  store.dispatch(setStoreAsyncRouter(arr));

  // const res = await getRouteApi(token);
  // if (res.data.length) {
  //   store.dispatch(setStoreAsyncRouter(res.data));
  // }
  return '';
}

export function handlePowerRoute(
  dataRouter: AsyncRouteType[],
  routerList: RouteList[] = defaultRoute,
) {
  const newRouteList: RouteList[] = [];
  routerList.forEach((i) => {
    const item = cloneDeep(i);
    if (!item.meta.whiteList) {
      const rItem = dataRouter.find((r) => r.id === item.id);
      if (rItem) {
        if (rItem.children && rItem.children.length && item.children && item.children.length) {
          const children = handlePowerRoute(rItem.children, item.children);
          item.children = children;
          if (children) newRouteList.push(item);
        } else {
          newRouteList.push(item);
        }
      }
    } else {
      newRouteList.push(item);
    }
  });
  return newRouteList;
}

export function createRouterList(routeList: RouteObject[]) {
  return createBrowserRouter(routeList);
}

// Get the parent -level path through PATH
export function getParentPaths(routePath: string, routes: MenuItem[]): string[] {
  // Deep traversal search
  function dfs(routes: MenuItem[], key: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // Find key and return to the parent level key
      if (item.key === key) return [item.key];
      // Children does not exist or is empty if it is empty
      if (!item.children || !item.children.length) continue;
      // When you look down, put the current key into the stack
      parents.push(item.key as string);

      if (dfs(item.children, key, parents).length) return parents;
      // Deep traversal finds the current PATH out of the stack when it is not found
      parents.pop();
    }
    // Back to the empty array when not found
    return [];
  }
  return dfs(routes, routePath, []);
}

export function getBreadcrumbArr(
  path: Key,
  routes: MenuItem[],
): {
  title: React.ReactNode;
  path: string;
}[] {
  const parentPaths = getParentPaths(path as string, routes);
  if (parentPaths[0] === path)
    return [
      {
        title: findRouteByPath(path, routes)?.label,
        path: path.toString() || '',
      },
    ];
  const breadcrumbArr = parentPaths
    .map((i) => {
      const route = findRouteByPath(i, routes);
      return {
        title: route?.label,
        path: route?.key?.toString() || '',
      };
    })
    .concat({
      title: findRouteByPath(path, routes)?.label,
      path: path.toString() || '',
    });
  return breadcrumbArr;
}

// Find the routing information of the corresponding path
export function findRouteByPath(path: Key, routes: MenuItem[]): MenuItem | null {
  const res = routes.find((item) => item.key == path) || null;
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children?.length) {
        const miRes = findRouteByPath(path, routes[i].children as MenuItem[]);
        if (miRes) {
          return miRes;
        } else {
          if (routes[i].key == path) return routes[i];
        }
      }
    }
    return null;
  }
}

// Pseudo -pseudo Path RESOLVE
function pathResolve(...paths: string[]) {
  let resolvePath = '';
  let isAbsolutePath = false;
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i];
    if (isAbsolutePath) {
      break;
    }
    if (!path) {
      continue;
    }
    resolvePath = path + '/' + resolvePath;
    isAbsolutePath = path.charCodeAt(0) === 47;
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/');
  } else {
    resolvePath = resolvePath
      .replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '');
  }
  return resolvePath;
}

// Set the full routing Path,
export function setUpRoutePath(routeList: AsyncRouteType[], pathName = '') {
  for (const node of routeList) {
    if (pathName) {
      node.path = pathResolve(pathName, node.path || '');
    }
    if (node.children && node.children.length) {
      setUpRoutePath(node.children, node.path);
    }
  }
  return routeList;
}

// Flat route
export function formatFlatteningRoutes(routesList: AsyncRouteType[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = routesList;
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children || [], hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}
