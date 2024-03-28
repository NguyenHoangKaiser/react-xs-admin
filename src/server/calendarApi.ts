import { APIs } from '@/utils/constant';
import { api, transformFactory } from '.';

export interface ICalendarParams {
  begin_at?: number;
  end_at?: number;
  device_type?: string;
  is_owner?: number;
  hotel_id?: number;
}

export interface ICalendarResult {
  _id?: string;
  hotel_id?: number;
  name?: string;
  color?: string;
  schedule?: ISchedule;
  out?: Out;
  type?: number;
  created_at?: number;
  updated_at?: number;
  status?: number;
  owner_id?: number;
  order?: number;
  owner_name?: string;
  run_time?: number;
}

export interface ISchedule {
  start_time?: number;
  end_time?: number;
  repeat_type?: number;
  weekdays?: number[];
  monthdays?: number[];
  month_chosen?: number[];
  run_time?: number; //unix or not
}

export interface Out {
  execution?: Execution[];
  devices?: number[];
  device_type?: string;
}

export interface Execution {
  command?: string;
  params?: Params;
}
export interface Params {
  on?: boolean;
  temperatureSetting?: string;
  temperatureControl?: number;
  speed?: number;
  swingVertical?: string;
  swingHorizontal?: string;
  eco?: boolean;
}

export const calendarApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCalendar: builder.query<ICalendarResult[], ICalendarParams>({
      query: (params) => ({ url: APIs.CALENDAR, method: 'GET', params }),
      ...transformFactory<ICalendarResult[]>(),
      providesTags: [{ type: 'Calendar' as const, id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCalendarQuery } = calendarApi;
