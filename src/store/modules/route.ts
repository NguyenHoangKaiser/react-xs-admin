import type { LocaleId } from '@/locales';
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
  key: string;
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
        case 'add':
          if (tabIndex === -1) state.multiTabs.push(tabs);
          break;
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
export const { setStoreAsyncRouter, setStoreMultiTabs } = routeSlice.actions;

export default routeSlice.reducer;
