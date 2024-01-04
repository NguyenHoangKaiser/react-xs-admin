/**
 * Axios data processing class
 */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestOptions, Result } from '#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  interceptor?: AxiosInterceptor;
}

type RequestInterceptorsConfig = Pick<CreateAxiosOptions, 'requestOptions' | 'interceptor'> &
  InternalAxiosRequestConfig;

export abstract class AxiosInterceptor {
  /**
   * @description: Configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description: Request successful treatment
   */
  requestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: Request failure treatment
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: Request the previous interceptor
   */
  requestInterceptors?: (config: RequestInterceptorsConfig) => RequestInterceptorsConfig;

  /**
   * @description: Request the previous interceptor error processing
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: The interceptor after request
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: After the request, the interceptor is wrong
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
