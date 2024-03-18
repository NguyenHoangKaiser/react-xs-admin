import { api, transformFactory } from '@/server/index';
import { APIs } from '@/utils/constant';
import type {
  IDevice,
  IDeviceType,
  IFloor,
  IPagination,
  ISchedule,
  IStates,
  TTrait,
} from './apiTypes';

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

export interface IGetDeviceInfoParams {
  id: string;
}

export interface IGetDeviceInfoResult extends IDevice {
  rule_maintenance?: string | null;
  schedule?: ISchedule | null;
  duration_day?: number;
  duration?: number;
}

export interface IControlDeviceParams {
  floor_id: string;
  id: string;
  devid: string;
  state: IStates;
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
    getDeviceInfo: builder.query<IGetDeviceInfoResult, IGetDeviceInfoParams>({
      query: (params) => ({
        url: APIs.GET_DEVICE_INFO,
        method: 'GET',
        params,
      }),
      ...transformFactory<IGetDeviceInfoResult>(),
      providesTags: (result) => [{ type: 'Device' as const, id: result?.devid }],
    }),
    controlDevice: builder.mutation<string, IControlDeviceParams>({
      query: ({ devid, floor_id, state }) => {
        const command = Object.keys(state)[0] as TTrait;
        return {
          url: APIs.CONTROL_DEVICE,
          method: 'POST',
          body: {
            floor_id: floor_id,
            payload: {
              cmd: 'set',
              reqid: Date.now(),
              objects: [
                {
                  type: 'devices',
                  data: [`${devid}`],
                  execution: [
                    {
                      command,
                      params: state[command],
                    },
                  ],
                },
              ],
            },
          },
        };
      },
      // Perform an optimistic update by updating the query cache with the new value immediately
      async onQueryStarted({ state, id }, { dispatch, queryFulfilled }) {
        // const { OnOff } = state;
        //TODO: add more traits
        // if (OnOff) {
        const patchResult = dispatch(
          devicesApi.util.updateQueryData('getDeviceInfo', { id }, (draft) => {
            draft.device_status = {
              ...draft.device_status,
              states: {
                ...draft.device_status?.states,
                ...state,
              },
            };
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
          // }
        }
      },
      ...transformFactory<string>(),
      invalidatesTags: (_result, _error, { devid }) => [
        { type: 'Device' as const, id: devid },
        { type: 'Device' as const, id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHotelsQuery,
  useGetDevicesQuery,
  useGetDeviceInfoQuery,
  useControlDeviceMutation,
} = devicesApi;
