import type { LocaleType } from '@/locales';
import { COLORS } from '@/utils/constant';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ThemeMode = 'dark' | 'light';
export type SidebarMode = 'vertical' | 'horizontal' | 'blend';

export interface AppConfigMode {
  collapsed: boolean;
  locale: LocaleType;
  themeMode: ThemeMode;
  sidebarMode: SidebarMode;
  color: string;
  toggleNotice: boolean;
  tabActiveKey: string;
}

const initialState: AppConfigMode = {
  collapsed: true,
  locale: 'vi-VN',
  themeMode: 'dark',
  sidebarMode: 'vertical',
  color: COLORS.PrimaryColor,
  toggleNotice: false,
  tabActiveKey: 'info',
};

export const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAppCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setAppLocale: (state, action: PayloadAction<LocaleType>) => {
      state.locale = action.payload;
    },
    setAppThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setAppSidebarMode: (state, action: PayloadAction<SidebarMode>) => {
      state.sidebarMode = action.payload;
    },
    setAppColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setToggleNotice: (state, action: PayloadAction<boolean>) => {
      state.toggleNotice = action.payload;
    },
    setTabActiveKey: (state, action: PayloadAction<string>) => {
      state.tabActiveKey = action.payload;
    },
  },
});
// Each case reducer function generates the corresponding Action Creators
export const {
  setAppCollapsed,
  setAppColor,
  setAppLocale,
  setAppSidebarMode,
  setAppThemeMode,
  setToggleNotice,
  setTabActiveKey,
} = appSlice.actions;

export default appSlice.reducer;
