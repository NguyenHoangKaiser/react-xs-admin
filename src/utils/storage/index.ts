import CryptoJS from 'crypto-js';
import type { StorageConfig, StorageType, StorageValue } from './types';

// Sixteen hexadecimal numbers as the key
const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161');
// Sixteen hexadecimal numbers are used as key offset
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a');

// type window.localStorage,window.sessionStorage,
let config: StorageConfig = {
  prefix: 'xiaosiAdmin', // Name prefix suggestion: project name + project version
  expire: 0, // Expired time unit: second
  isEncrypt: false, // The default encryption is convenient for debugging, and it can not be encrypted during the development process
};

// Replace the default config according to the request configuration
export const setStorageConfig = (info: StorageConfig) => {
  config = { ...config, ...info };
};

// Determine whether to support storage
export const isSupportStorage = () => {
  return typeof Storage !== 'undefined' ? true : false;
};

// Set setstorage
export const setStorage = <T>(
  key: string,
  value: StorageValue<T>,
  expire = 0,
  type: StorageType = 'localStorage',
) => {
  if (value === null || value === undefined) {
    value = null;
  }

  if (isNaN(expire) || expire < 0) throw new Error('Expire Must be numbers');

  if (config.expire > 0 || expire > 0) expire = (expire ? expire : config.expire) * 1000;
  const data = {
    value: value, // Storage value
    time: Date.now(), // Stamp tissue stamp
    expire: expire, // Expiration
  };

  const encryptString = config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data);

  window[type].setItem(autoAddPrefix(key), encryptString);
};

// Obtain getStorage
export const getStorage = <T>(key: string, type: StorageType = 'localStorage'): StorageValue<T> => {
  key = autoAddPrefix(key);
  // Key does not have judgment
  if (!window[type].getItem(key) || JSON.stringify(window[type].getItem(key)) === 'null') {
    return null;
  }

  // Optimize the mid -term and renewal
  const storage = config.isEncrypt
    ? JSON.parse(decrypt(window[type].getItem(key) || ''))
    : JSON.parse(window[type].getItem(key) || '');

  const nowTime = Date.now();

  // Expire
  if (storage.expire && config.expire * 6000 < nowTime - storage.time) {
    removeStorage(key);
    return null;
  } else {
    // During the period, it is automatically renewed to keep renewal
    setStorage(autoRemovePrefix(key), storage.value);
    return storage.value;
  }
};

// does it exist hasStorage
export const hasStorage = (key: string): boolean => {
  key = autoAddPrefix(key);
  const arr = getStorageAll().filter((item) => {
    return item.key === key;
  });
  return arr.length ? true : false;
};

// Get all key
export const getStorageKeys = (): (string | null)[] => {
  const items = getStorageAll();
  const keys = [];
  for (let index = 0; index < items.length; index++) {
    keys.push(items[index].key);
  }
  return keys;
};

// Get KEY according to the index
export const getStorageForIndex = (index: number, type: StorageType = 'localStorage') => {
  return window[type].key(index);
};

// Get LocalStorage length
export const getStorageLength = (type: StorageType = 'localStorage') => {
  return window[type].length;
};

// Get all getAllStorage
export const getStorageAll = (type: StorageType = 'localStorage') => {
  const len = window[type].length; // 获取长度
  const arr = []; // 定义数据集
  for (let i = 0; i < len; i++) {
    // Get KEY index starting from 0
    const getKey = window[type].key(i) || '';
    // Get the value corresponding to the key
    const getVal = window[type].getItem(getKey);
    // Put into the array
    arr[i] = { key: getKey, val: getVal };
  }
  return arr;
};

// delete removeStorage
export const removeStorage = (key: string, type: StorageType = 'localStorage') => {
  window[type].removeItem(autoAddPrefix(key));
};

// Empty clearStorage
export const clearStorage = (type: StorageType = 'localStorage') => {
  window[type].clear();
};

// Automatically add prefix in front of the name
const autoAddPrefix = (key: string): string => {
  const prefix = config.prefix ? config.prefix + '_' : '';
  return prefix + key;
};

// Remove the added prefix
const autoRemovePrefix = (key: string) => {
  const len = config.prefix ? config.prefix.length + 1 : 0;
  return key.substr(len);
};

/** SessionStorage */

export const setSessionStorage = <T>(key: string, value: StorageValue<T>, expire = 0) => {
  return setStorage<T>(key, value, expire, 'sessionStorage');
};

export const getSessionStorage = <T>(key: string): StorageValue<T> => {
  return getStorage<T>(key, 'sessionStorage');
};

export const getSessionStorageForIndex = (index: number) => {
  return getStorageForIndex(index, 'sessionStorage');
};

export const getSessionStorageLength = () => {
  return getStorageLength('sessionStorage');
};

export const getSessionStorageAll = () => {
  return getStorageAll('sessionStorage');
};

export const removeSessionStorage = (key: string) => {
  return removeStorage(key, 'sessionStorage');
};

export const clearSessionStorage = () => {
  return clearStorage('sessionStorage');
};

/**
 * Encryption method
 * @param data
 * @returns {string}
 */
const encrypt = (data: string): string => {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      console.error('encrypt error:', error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};

/**
 * Decrypture
 * @param data
 * @returns {string}
 */
const decrypt = (data: string): string => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
