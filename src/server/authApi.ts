import type { IRSuccess } from './apiTypes';
import { api } from '@/server/index';
import { APIs } from '@/utils/constant';
import { transformErrorResponse } from '@/server';

export interface IUserInfo {
  userId: string;
  username: string;
  realName: string;
  avatar: string;
  desc: string;
  password: string;
  token: string;
  homePath: string;
  power: string[];
}

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResult {
  power: string[];
  userId: string;
  username: string;
  token: string;
  realName: string;
  desc: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IRSuccess<ILoginResult>, ILoginParams>({
      query: (body) => ({
        url: APIs.LOGIN,
        method: 'POST',
        body,
      }),
      transformErrorResponse,
      invalidatesTags: (result) => [{ type: 'User', id: result?.data.userId }],
    }),
    getUserInfo: builder.query<IRSuccess<IUserInfo>, void>({
      query: () => APIs.GET_USER_INFO,
      transformErrorResponse,
      providesTags: (result) => [{ type: 'User', id: result?.data.userId }],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetUserInfoQuery } = authApi;
