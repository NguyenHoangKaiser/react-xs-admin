import type { IUserInfo } from '@/server/apiTypes';
import { authApi } from '@/server/authApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  userInfo?: IUserInfo;
  email?: string;
  user_id?: number;
  access_token?: string;
  token_refresh?: string;
  verify_code?: string;
}

const initialState: UserSlice = {};

export const UserSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.access_token = payload.access_token;
      state.token_refresh = payload.token_refresh;
      state.email = payload.userInfo.email;
      state.user_id = payload.userInfo.id;
      state.userInfo = payload.userInfo;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state, { payload }) => {
      if (payload) {
        delete state.userInfo;
        delete state.access_token;
        delete state.token_refresh;
        delete state.email;
        delete state.user_id;
      }
    });
  },
});

export const { setUserInfo, setToken } = UserSlice.actions;

export default UserSlice.reducer;
