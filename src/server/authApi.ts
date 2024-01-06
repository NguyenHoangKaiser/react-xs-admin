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
  roles: {
    roleName: string;
    value: string;
  }[];
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserInfo, void>({
      query: () => APIs.GET_TODOS,
      transformErrorResponse,
      providesTags: [{ type: 'User' as const, id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserInfoQuery } = authApi;
