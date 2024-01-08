import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IUserInfo } from '@/server/authApi';

interface UserSlice {
  userInfo?: IUserInfo;
  power?: IUserInfo['power'];
  token?: string;
}

const initialState: UserSlice = {};

export const UserSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
      state.power = action.payload.power;
    },
    setPower: (state, action: PayloadAction<IUserInfo['power']>) => {
      state.power = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setSignOut: (state) => {
      delete state.userInfo;
      delete state.power;
      delete state.token;
    },
  },
});

export const { setUserInfo, setPower, setToken, setSignOut } = UserSlice.actions;

export default UserSlice.reducer;
