import { APIs } from '.';
import type { AsyncRouteType } from '@/store/modules/route';
import { defHttp } from '@/utils/axios';

interface Param {
  name: string;
}

export const getRouteApi = (data: Param) =>
  defHttp.post<AsyncRouteType[]>({ url: APIs.ROUTE_LIST, data });
