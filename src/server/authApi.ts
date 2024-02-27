import { api, transformFactory } from '@/server/index';
import { APIs } from '@/utils/constant';

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
    login: builder.mutation<ILoginResult, ILoginParams>({
      query: (body) => ({
        url: APIs.LOGIN,
        method: 'POST',
        body,
      }),
      ...transformFactory<ILoginResult>(),
      invalidatesTags: (result) => [{ type: 'User', id: result?.userId }],
    }),
    getUserInfo: builder.query<IUserInfo, void>({
      query: () => APIs.GET_USER_INFO,
      ...transformFactory<IUserInfo>(),
      providesTags: (result) => [{ type: 'User', id: result?.userId }], // id is the same as login because info is the same
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetUserInfoQuery } = authApi;
