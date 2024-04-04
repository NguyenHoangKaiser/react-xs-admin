import { message } from '@/layout';
import type { LocaleId } from '@/locales';
import type { RouteEnum } from '@/router/utils';
import { authApi } from '@/server/authApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
// import { formatFlatteningRoutes, setUpRoutePath } from '@/router/utils';

export interface AsyncRouteType {
  path: string;
  id: string;
  children?: AsyncRouteType[];
  meta?: {
    hideMenu?: boolean;
    hideBreadcrumb?: boolean;
    title?: string;
    currentActiveMenu?: string;
    icon?: string;
  };
  component?: string;
  redirect?: string;
}

export interface MultiTabsType {
  label?: string;
  localeLabel?: LocaleId;
  key: string | RouteEnum;
}

interface RouteState {
  asyncRouter: AsyncRouteType[];
  // levelAsyncRouter: AsyncRouteType[];
  multiTabs: MultiTabsType[];
}

const initialState: RouteState = {
  asyncRouter: [],
  // levelAsyncRouter: [],
  multiTabs: [],
};

export const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setStoreAsyncRouter: (state, action: PayloadAction<AsyncRouteType[]>) => {
      state.asyncRouter = action.payload;
      // state.levelAsyncRouter = formatFlatteningRoutes(setUpRoutePath(action.payload));
    },
    setStoreMultiTabs: (
      state,
      action: PayloadAction<{ type: 'add' | 'delete' | 'update'; tabs: MultiTabsType }>,
    ) => {
      const { type, tabs } = action.payload;
      const tabIndex = state.multiTabs.findIndex((i) => i.key === tabs.key);
      switch (type) {
        case 'add': {
          const maxLen = import.meta.env.VITE_KEY_ALIVE_MAX_LEN || 10;
          if (state.multiTabs.length >= maxLen) {
            message.error(`Has reached the limit of ${maxLen} tabs`);
          }
          if (tabIndex === -1) state.multiTabs.push(tabs);
          break;
        }
        case 'delete':
          if (tabIndex !== -1) state.multiTabs.splice(tabIndex, 1);
          break;
        case 'update':
          if (tabIndex !== -1) state.multiTabs[tabIndex] = tabs;
          break;
        default:
          break;
      }
    },
    deleteExceedTabs: (state) => {
      if (state.multiTabs.length > 0) {
        state.multiTabs.splice(0, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (_state, { payload }) => {
      if (payload) {
        return initialState;
      }
    });
  },
});
// Each case reducer function generates the corresponding Action Creators
export const { setStoreAsyncRouter, setStoreMultiTabs, deleteExceedTabs } = routeSlice.actions;

export const routeSelector = (state: { route: RouteState }) => state.route;
export const asyncRouterSelector = (state: { route: RouteState }) => state.route.asyncRouter;
export const multiTabsSelector = (state: { route: RouteState }) => state.route.multiTabs;

export default routeSlice.reducer;
