import { api, transformFactory } from '@/server/index';
import { APIs } from '@/utils/constant';
import type { IDevice, IDeviceType, IFloor, IPagination } from './apiTypes';

export interface IGetHotelResult {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  medias?: any[];
  status?: number;
  customer_id?: number;
  is_deleted?: number;
  created_at?: number;
  updated_at?: number;
  domain?: string;
  ip_local?: string;
  url_api_local?: string;
  floors?: IFloor[];
  deviceType?: IDeviceType[];
}

export interface IGetDevicesResult {
  items?: IDevice[];
  pagination?: IPagination;
}

export interface IGetDevicesParams {
  floor_id?: string;
  hotel_id?: string;
}

export const devicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query<IGetHotelResult[], void>({
      query: () => APIs.GET_HOTELS,
      ...transformFactory<IGetHotelResult[]>(),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Hotel' as const, id })),
        { type: 'Hotel' as const, id: 'LIST' },
      ],
    }),
    getDevices: builder.query<IGetDevicesResult, IGetDevicesParams>({
      query: (params) => ({
        url: APIs.GET_DEVICES,
        method: 'GET',
        params,
      }),
      ...transformFactory<IGetDevicesResult>(),
      providesTags: [{ type: 'Device' as const, id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHotelsQuery, useGetDevicesQuery } = devicesApi;
