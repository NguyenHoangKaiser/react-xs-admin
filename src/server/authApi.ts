import { api, transformFactory } from '@/server/index';
import { APIs } from '@/utils/constant';
import type { IHotel, IUserInfo } from './apiTypes';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginResult {
  access_token: string;
  token_refresh: string;
  domain?: string;
  hotels?: IHotel[];
  role?: number;
  userInfo: IUserInfo;
}

const DOMAIN = import.meta.env.VITE_DOMAIN;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResult, ILoginParams>({
      query: (params) => ({
        url: APIs.LOGIN,
        method: 'POST',
        body: {
          email: params.email,
          password: params.password,
          type: 0,
          domain: DOMAIN,
        },
      }),
      ...transformFactory<ILoginResult>(),
      invalidatesTags: (result) => [{ type: 'User', id: result?.userInfo.id }],
    }),
    logout: builder.mutation<boolean, void>({
      query: () => ({
        url: APIs.LOGOUT,
        method: 'POST',
      }),
      ...transformFactory<boolean>(),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = authApi;
