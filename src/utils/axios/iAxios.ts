import { isFunction } from '@/utils/is';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import type { RequestOptions, Result } from '../../../types/axios';
import type { CreateAxiosOptions } from './axiosConfig';

/**
 * @description: axios module
 */
export class iAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  Create AXIOS
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /**
   * @description Get the interceptor configuration
   */
  private getInterceptor() {
    const { interceptor } = this.options;
    return interceptor;
  }

  /**
   * @description: Re -configure AXIOS
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description Mount interceptor
   */
  private setupInterceptors() {
    const interceptor = this.getInterceptor();
    if (!interceptor) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = interceptor;

    // In order to filter the interceptor that the interceptor is not configured

    // Request interceptor configuration
    requestInterceptors &&
      isFunction(requestInterceptors) &&
      this.axiosInstance.interceptors.request.use(requestInterceptors, undefined);

    // The failure configuration of the request interceptor
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // Response interceptor configuration
    responseInterceptors &&
      isFunction(responseInterceptors) &&
      this.axiosInstance.interceptors.response.use(responseInterceptors, undefined);

    // Response interceptor failure configuration
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  /**
   * @description GET request (config: Axios request configuration, Options: special processing of data)
   */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request<T>({ ...config, method: 'GET' }, options);
  }

  /**
   * @description Post request (config: axios request configuration, Options: special processing of data)
   */
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request<T>({ ...config, method: 'POST' }, options);
  }

  /**
   * @description PUT request (config: Axios request configuration, Options: special processing of data)
   */
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request<T>({ ...config, method: 'PUT' }, options);
  }

  /**
   * @description delete request (config: Axios request configuration, Options: special processing of data)
   */
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request<T>({ ...config, method: 'DELETE' }, options);
  }

  /**
   * @description Request
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    let conf: CreateAxiosOptions = cloneDeep(config);

    const interceptor = this.getInterceptor();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, requestHook } = interceptor || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf.requestOptions = opt;

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<T, AxiosResponse<Result<T>>>(conf)
        .then((res: AxiosResponse<Result<T>> | Error | AxiosError) => {
          if (res instanceof Error || axios.isAxiosError(res)) {
            reject(res);
          } else {
            if (requestHook && isFunction(requestHook)) {
              try {
                resolve(requestHook(res, opt));
              } catch (err) {
                reject(err || new Error('request error!'));
              }
              return;
            }
            resolve(res as unknown as Promise<Result<T>>);
          }
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
