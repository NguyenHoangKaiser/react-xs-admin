import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { type AxiosError, type AxiosRequestConfig } from 'axios';
import type { TPost } from './apiType';
import { defHttp } from '@/utils/axios';
import type { RequestOptions } from '#/axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    AxiosRequestConfig, // Args
    unknown, // Result
    {
      status: string | undefined;
      data: unknown;
      message: string | undefined;
    }, // Error
    RequestOptions, // DefinitionExtraOptions
    { timestamp: number } // Meta
  > =>
  async ({ url, baseURL: _base, ...rest }, _api, extraOptions = { errorMessageMode: 'modal' }) => {
    try {
      const result = await defHttp.request(
        {
          baseURL: baseUrl + url,
          ...rest,
        },
        extraOptions,
      );
      return { data: result.data };
    } catch (axiosError) {
      const { response, code, message } = axiosError as AxiosError;
      return {
        error: { status: code, data: response?.data, message: message },
      };
    }
  };

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints(build) {
    return {
      getPosts: build.query<TPost[], undefined>({
        query: () => ({ url: '/posts', method: 'get' }),
      }),
    };
  },
});

export const useGetPostsQuery = apiSlice.endpoints.getPosts.useQuery;

export enum APIs {
  ROUTE_LIST = '/mock_api/getRoute',
}
