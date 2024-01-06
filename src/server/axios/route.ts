import type { AsyncRouteType } from '@/store/modules/route';
import { defHttp } from '@/utils/axios';
import { APIs } from '@/utils/constant';

interface Param {
  name: string;
}

export const getRouteApi = (data: Param) =>
  defHttp.post<AsyncRouteType[]>({ url: APIs.ROUTE_LIST, data });
