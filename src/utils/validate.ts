/***
 * @Author:hejian
 * @Date:2020-07-03 16:29:34
 * @LastModifiedBy:hejian
 * @Last Modified time:2020-07-11 17:18:23
 */

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
};

export const isValidURL = (url: string) => {
  const reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
  return reg.test(url);
};
