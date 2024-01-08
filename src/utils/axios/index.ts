import { isString } from 'lodash-es';
import type { AxiosInterceptor, CreateAxiosOptions } from './axiosConfig';
import { checkStatus } from './axiosStatus';
import { errorData } from './errorConfig';
import { iAxios } from './iAxios';
import { createErrorModal, createErrorMsg } from '@/hooks/web/useMessage';
import store from '@/store';

/**
 * @description: Please change all the interceptor according to your own usage scenario
 */
const interceptor: AxiosInterceptor = {
  /**
   * @description: Process request data.If the data is not an expected format, you can directly throw an error
   */
  requestHook: (res, options) => {
    /**
     * The method here is to process the data requested.
     * Change according to your own use scenario
     */
    const { data } = res;
    const { errorMessageMode } = options;
    if (data) {
      if (data.code === -1) {
        if (errorMessageMode === 'modal') {
          createErrorModal(data.message);
        } else if (errorMessageMode === 'message') {
          createErrorMsg(data.message);
        }
        return errorData(res);
      } else {
        const { code, data: dataInfo, message } = data;
        if (!code && !dataInfo && !message) {
          const toData = {
            code: 1,
            data: data,
            message: 'ok',
          };
          return toData;
        }
      }
    }
    return data;
  },

  /**
   * @description: Error handling of request failure
   */
  requestCatchHook: (e, _options) => {
    return Promise.reject(e);
  },

  /**
   * @description: CONFIG before request
   */
  beforeRequestHook: (config, options) => {
    const { urlPrefix } = options;
    if (urlPrefix && isString(urlPrefix)) config.url = `${urlPrefix}${config.url}`;
    return config;
  },

  /**
   * @description: Request interceptor processing
   */
  requestInterceptors: (config) => {
    const { requestOptions } = config;
    if (requestOptions?.withToken) {
      // access redux store to get token
      const token = store.getState().user.token;
      (config as Recordable).headers.Authorization = token;
      if (requestOptions?.specialToken)
        (config as Recordable).headers.Authorization = requestOptions?.specialToken;
    }

    return config;
  },

  /**
   * @description: Request interceptor error treatment
   */
  requestInterceptorsCatch: (error) => {
    return error;
  },

  /**
   * @description: Response interceptor processing
   */
  responseInterceptors: (res) => {
    return res;
  },

  /**
   * @description: Response interceptor error treatment
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, message, config } = error || {};
    const errorMessageMode = config.requestOptions.errorMessageMode || 'none';
    checkStatus(response ? response.status : 404, message, errorMessageMode);
    return error;
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new iAxios({
    ...{
      // Request time
      timeout: 10 * 1000,
      // (Interceptor) Data processing method
      interceptor,
      headers: { 'Content-Type': 'application/json' },
      // Configuration items (need to be processed in the interceptor), the following options can be covered in independent interface requests
      requestOptions: {
        withToken: true,
        errorMessageMode: 'message',
      },
    },
    ...(opt || {}),
  });
}
export const defHttp = createAxios();
