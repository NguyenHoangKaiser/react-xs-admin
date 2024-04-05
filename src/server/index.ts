import type { RootState } from '@/store';
import { getErrMsg } from '@/utils/operate';
import type { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { IRSuccess } from './apiTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).user.access_token;
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('X-Luci-Language', 'vi-VN');
    headers.set('X-Luci-Api-Key', API_KEY);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  validateStatus(response, body) {
    // When the server always returns a 200, even for internal errors so we have to validate the response data
    return response.status === 200 && body.success;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'splitApi',
  /**
   * `keepUnusedDataFor` is optional and defaults to `60` if not specified
   */
  keepUnusedDataFor: 60,
  /**
   * `refetchOnFocus` is optional and defaults to `false` if not specified
   */
  refetchOnMountOrArgChange: 30,
  refetchOnReconnect: true,
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['Todos', 'User', 'Forgot', 'Hotel', 'Device', 'Calendar', 'Section'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

// export const enhancedApi = api.enhanceEndpoints({
//   endpoints: () => ({
//     getPost: () => 'test',
//   }),
// });

function transformErrorResponse(
  baseQueryReturnValue: FetchBaseQueryError,
  _meta: FetchBaseQueryMeta | undefined,
  _arg: any,
) {
  getErrMsg(baseQueryReturnValue, true);
  return baseQueryReturnValue;
}

function transformResponse<T = Recordable>(response: IRSuccess<T>) {
  return response.data;
}

const transformFactory = <T = any>() => {
  return {
    transformResponse: transformResponse<T>,
    transformErrorResponse,
  };
};

export { transformErrorResponse, transformFactory };
