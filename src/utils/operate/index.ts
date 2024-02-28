import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { isString } from 'lodash';
import { checkStatus } from '../axios/axiosStatus';
import { isErrorWithMessage, isFetchBaseQueryError } from '../is';

export const hasClass = (ele: RefType<any>, cls: string): any => {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

export const addClass = (ele: RefType<any>, cls: string, extracls?: string): any => {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
  if (extracls) {
    if (!hasClass(ele, extracls)) ele.className += ' ' + extracls;
  }
};

export const removeClass = (ele: RefType<any>, cls: string, extracls?: string): any => {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ').trim();
  }
  if (extracls) {
    if (hasClass(ele, extracls)) {
      const regs = new RegExp('(\\s|^)' + extracls + '(\\s|$)');
      ele.className = ele.className.replace(regs, ' ').trim();
    }
  }
};

export const toggleClass = (flag: boolean, clsName: string, target?: RefType<any>): any => {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, '');
  targetEl.className = flag ? `${className} ${clsName} ` : className;
};

/**
 * @description: Catch error and show error message box
 * @param fn {Function} Function to be executed
 * @returns {Promise<T | FetchBaseQueryError | { message: string } | undefined>}
 * @example
 *
 * ```ts
 * const [data, setData] = useState<ITodo[]>([]);
 * const [loading, setLoading] = useState<boolean>(false);
 *
 * const getTodos = async () => {
 *   setLoading(true);
 *   const res = await catchErr(() => getTodosApi());
 *   if (res) {
 *     setData(res);
 *   }
 *   setLoading(false);
 * };
 * ```
 */

export async function catchErr<T>(
  fn: () => Promise<T>,
): Promise<T | FetchBaseQueryError | { message: string } | undefined> {
  try {
    return await fn();
  } catch (err) {
    if (isFetchBaseQueryError(err)) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

      if (typeof err.status === 'number') {
        checkStatus(err.status, errMsg, 'modal');
      } else if (typeof err.status === 'string') {
        checkStatus(404, err.status, 'modal');
      }
      return err;
    } else if (isErrorWithMessage(err)) {
      // you can access a string 'message' property here
      checkStatus(404, err.message, 'modal');
      return err;
    }
  }
}

/**
 * @description: Get error message from error
 * @param err {FetchBaseQueryError | { message: string } | SerializedError} Error object
 * @param alert Whether to pop up the error message box (default: false)
 * @returns {string} Error message
 */
export function getErrMsg(
  err: FetchBaseQueryError | { message: string } | SerializedError,
  alert: boolean = false,
): string {
  if (isFetchBaseQueryError(err)) {
    // you can access all properties of `FetchBaseQueryError` here
    const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

    if (typeof err.status === 'number') {
      alert && checkStatus(err.status, errMsg, 'modal');
      return errMsg;
    } else if (typeof err.status === 'string') {
      alert && checkStatus(404, err.status, 'modal');
      return errMsg;
    }
  } else if (isErrorWithMessage(err)) {
    // you can access a string 'message' property here
    alert && checkStatus(404, err.message, 'modal');
    return err.message;
  } else if (isString(err)) {
    alert && checkStatus(404, err, 'modal');
    return err;
  }
  alert && checkStatus(404, 'Unexpected error', 'modal');
  return 'Unexpected error';
}
