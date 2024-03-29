// Interface data format used to return a unified format
import { ResultEnum } from './enum';

export function resultSuccess<T = Recordable>(result: T) {
  return {
    statusCode: ResultEnum.SUCCESS,
    data: result,
    success: true,
  };
}

export function resultPageSuccess<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function resultError(
  message = 'Request failed',
  { code = ResultEnum.ERROR, result = {} } = {},
) {
  return {
    code,
    data: result,
    message,
    type: 'error',
  };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  const offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize));
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description This function is used to obtain token from the Request data, please modify it according to the actual situation of the project
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}
