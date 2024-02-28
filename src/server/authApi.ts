import { api, transformFactory } from '@/server/index';
import { APIs } from '@/utils/constant';
import type { IHotel, IUserInfo } from './apiTypes';

export interface ILoginParams {
  email: string;
  password: string;
  domain: string;
  type: number;
}

export interface ILoginResult {
  access_token: string;
  token_refresh: string;
  domain?: string;
  hotels?: IHotel[];
  role?: number;
  userInfo: IUserInfo;
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
      invalidatesTags: (result) => [{ type: 'User', id: result?.userInfo.id }],
    }),
    // getUserInfo: builder.query<IUserInfo, void>({
    //   query: () => APIs.GET_USER_INFO,
    //   ...transformFactory<IUserInfo>(),
    //   providesTags: (result) => [{ type: 'User', id: result?.userId }], // id is the same as login because info is the same
    // }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
