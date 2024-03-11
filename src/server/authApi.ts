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
export interface IForgotPasswordParams {
  email: string;
}

export interface IForgotPasswordResult {
  data: [];
}
export interface VForgotPasswordParams {
  email: string;
  opt: string;
}

export interface VForgotPasswordResult {
  data: [];
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
    forgot: builder.mutation<IForgotPasswordResult, IForgotPasswordParams>({
      query: (params) => ({
        url: APIs.FORGOT_PASSWORD,
        method: 'POST',
        body: {
          email: params.email,
          type: 0,
          domain: DOMAIN,
        },
      }),
      ...transformFactory<IForgotPasswordResult>(),
      invalidatesTags: () => [{ type: 'Forgot' }],
    }),
    verify: builder.mutation<VForgotPasswordResult, VForgotPasswordParams>({
      query: (params) => ({
        url: APIs.FORGOT_PASSWORD,
        method: 'POST',
        body: {
          email: params.email,
          type: 0,
          domain: DOMAIN,
        },
      }),
      ...transformFactory<IForgotPasswordResult>(),
      invalidatesTags: () => [{ type: 'Forgot' }],
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

export const { useLoginMutation, useForgotMutation, useVerifyMutation, useLogoutMutation } =
  authApi;
