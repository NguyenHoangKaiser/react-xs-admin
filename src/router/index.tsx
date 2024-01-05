import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { baseRouter, whiteList } from './modules';
import { handlePowerRoute } from './utils';
import type { AsyncRouteType } from '@/store/modules/route';
import { useAppSelector } from '@/store/hooks';
import { useRouteList } from '@/hooks/useRouteList';

const RouteView = memo(() => {
  const asyncRouter = useAppSelector((state) => state.route.asyncRouter);
  const { handleRouteList } = useRouteList();

  // Add the directional routing to the "/" root routing
  const handleRedirect = (asyncRouter: AsyncRouteType[]) => {
    const routerList = handleRouteList(handlePowerRoute(asyncRouter));
    if (routerList.length) {
      routerList.push({
        path: '',
        element: <Navigate to={routerList[0].path || ''} />,
      });
    }
    return [...routerList, ...whiteList];
  };

  const mapBaseRouter = (baseRouter: RouteObject[], asyncRouter: AsyncRouteType[]) => {
    return baseRouter.map((i) => {
      const routeItem = i;
      if (routeItem.path === '/') {
        routeItem.children = handleRedirect(asyncRouter);
      }
      return routeItem;
    });
  };

  const [route, setRoute] = useState<RouteObject[]>(mapBaseRouter(baseRouter, asyncRouter));

  // Update route list
  useEffect(() => {
    setRoute(mapBaseRouter(baseRouter, asyncRouter));
  }, [asyncRouter]);

  const routeElement = createBrowserRouter(route);

  return <RouterProvider router={routeElement} />;
});

export default RouteView;
