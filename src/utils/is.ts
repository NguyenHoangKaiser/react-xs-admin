import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { DataType } from './constant';

const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 *
 * @example
 *
 * ```ts
 * async function handleAddPost() {
 *    try {
 *      await addPost(name).unwrap()
 *     setName('')
 *    } catch (err) {
 *      if (isFetchBaseQueryError(err)) {
 *        // you can access all properties of `FetchBaseQueryError` here
 *        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
 *        enqueueSnackbar(errMsg, { variant: 'error' })
 *      } else if (isErrorWithMessage(err)) {
 *       // you can access a string 'message' property here
 *      enqueueSnackbar(err.message, { variant: 'error' })
 *     }
 *   }
 * }
 * ```
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 *
 * @example
 *
 * ```ts
 * async function handleAddPost() {
 *    try {
 *      await addPost(name).unwrap()
 *     setName('')
 *    } catch (err) {
 *      if (isFetchBaseQueryError(err)) {
 *        // you can access all properties of `FetchBaseQueryError` here
 *        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
 *        enqueueSnackbar(errMsg, { variant: 'error' })
 *      } else if (isErrorWithMessage(err)) {
 *       // you can access a string 'message' property here
 *      enqueueSnackbar(err.message, { variant: 'error' })
 *     }
 *   }
 * }
 * ```
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

/**
 * Type predicate to narrow an unknown error to an expected error shape from the server
 * @param error unknown
 * @returns error is { status: number; data: { statusCode: number; message: string; success: boolean } }
 *
 * @example
 *
 * ```ts
 * const error = {
 * status: 200,
 * data: {
 *    statusCode: 400,
 *    message: 'Bad Request',
 *    success: false,
 *  },
 * ```
 */
export function isExpectedError(error: unknown): error is {
  status: number;
  data: {
    statusCode: number;
    message: string;
    success: boolean;
  };
} {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    typeof (error as any).data === 'object' &&
    error.status === 200 &&
    'statusCode' in (error as any).data &&
    'message' in (error as any).data &&
    'success' in (error as any).data
  );
}
export function compareByPower(a: DataType, b: DataType): number {
  if (a.power === null && b.power === null) {
    return 0;
  } else if (a.power === null) {
    return 1; // Null values go to the end
  } else if (b.power === null) {
    return -1; // Null values go to the end
  } else {
    return a.power - b.power;
  }
}
export function isNumeric(value: number | null | string): value is number {
  return typeof value === 'number' && !isNaN(value as number);
}
