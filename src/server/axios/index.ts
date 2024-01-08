import type { IUserInfo } from '../authApi';
import type { AsyncRouteType } from '@/store/modules/route';
import { defHttp } from '@/utils/axios';
import { APIs } from '@/utils/constant';

export const getRouteApi = (token?: string) =>
  defHttp.get<AsyncRouteType[]>({ url: APIs.ROUTE_LIST }, { withToken: true, specialToken: token });

export const getUserInfo = (token: string) =>
  defHttp.get<IUserInfo>(
    {
      url: APIs.GET_USER_INFO,
    },
    { withToken: true, specialToken: token },
  );
