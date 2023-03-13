export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/;
  return reg.test(path);
};

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
};

export function isString(str: any) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

export const isValidURL = (url: string) => {
  const reg =
    /^(?:(?:https?|ftp|file):\/\/|www\.|ftp\.|sftp\.)?[a-zA-Z0-9\-\.]+(?:\.[a-zA-Z]{2,})+(?::\d+)?(?:\/[\w\-\.\?\,\'\/\\\+&amp;%\$#\=~]*)*(?:#[\w\-]*)?(?:\?[^\s]*)?(?:(?:\:|\/)[^\s]*)?$/;
  const reg2 =
    /^(?:https?:\/\/)?(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/[\w\-.?,'\/\\\+&amp;%\$#\=~]*)*(?:#[\w\-]*)?(?:\?[^\s]*)?(?:(?:\:|\/)[^\s]*)?$/;
  return reg.test(url) || reg2.test(url);
};

export const isValidPassword = (value: string) => {
  //  Contains 10 - 20 characters
  //  Includes uppercase and lowercase letters
  //  Includes numbers and special characters
  const reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@+.$%^&*\-,:;"])[a-zA-Z\d#?!@+.$%^&*\-,:;"]{10,20}$/;
  // 中文
  const zhReg = /[\u4e00-\u9fa5]/gi;
  // 中文特殊字符
  const zhSymbol =
    /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/gi;
  // 空格
  const space = /\s+/gi;
  return reg.test(value);
};

export const isValidEmail = (value: string): boolean => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi;
  return reg.test(value);
};
export const isValidMobilePhone = (value: string): boolean => {
  const reg =
    /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  return reg.test(value);
};
export const isValidUsername = (value: string): boolean => {
  const reg = /^\w{5,32}$/;
  return reg.test(value) || isValidEmail(value) || isValidMobilePhone(value);
};
export const isValidIp = (value: string | undefined | null): boolean => {
  const reg =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return reg.test(String(value));
};
export const isValidPort = (
  value: string | number | null | undefined
): boolean => {
  const reg =
    /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return reg.test(String(value));
};
export const isVailidNormalString = (
  value: string | number | null | undefined
): boolean => {
  const reg = /^[A-Za-z0-9_]+$/;
  return reg.test(String(value));
};
export const isNormalName = (
  value: string | number | null | undefined
): boolean => {
  const reg = /^(?![_0-9])[a-zA-Z0-9_]{2,}$/;
  return reg.test(String(value));
};
export const isValidCIDR = (
  value: string | number | null | undefined
): boolean => {
  const reg = /^(\d{1,3}\.){3}\d{1,3}\/(1\d|2\d|3[0-2]|[1-9])$/;
  return reg.test(String(value));
};
export const isValidDomain = (
  value: string | number | null | undefined
): boolean => {
  const reg = /^((?=[a-z0-9-]{1,63}\.)[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/;
  return reg.test(String(value));
};
export const isValidIdCard = (
  value: string | number | null | undefined
): boolean => {
  const reg =
    /^[1-9]\d{5}\d{4}(0[1-9]|10|11|12)(0[1-9]|[1-2][0-9]|3[0-1])\d{3}[0-9Xx]$/;
  return reg.test(String(value));
};
export const isValidNumber = (
  value: string | number | null | undefined
): boolean => {
  const reg = /[-+]?(\d+\.?\d*|\.\d+)$/;
  return reg.test(String(value));
};
export const isValidJSONString = (
  value: string | number | null | undefined
): boolean => {
  try {
    JSON.parse(String(value));
    return true;
  } catch (e) {
    return false;
  }
};
export const isValidSecret = (
  value: string | number | null | undefined
): boolean => {
  const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@%#*])[A-Za-z\d@%#*]{8}$/;
  return reg.test(String(value));
};
export const isValidMoreIp = (
  value: string | number | null | undefined
): boolean => {
  const reg =
    /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?:;(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))*$/;
  return reg.test(String(value));
};
export const isValidFTPAddress = (
  value: string | number | null | undefined
): boolean => {
  const reg =
    /^ftp:\/\/([a-zA-Z0-9]+:?[a-zA-Z0-9]+?@)?([a-zA-Z0-9.-]+)(:[0-9]+)?\/?.*$/;
  return reg.test(String(value));
};
export const isValidFTPPath = (
  value: string | number | null | undefined
): boolean => {
  const reg = /^\/.*$/;
  return reg.test(String(value));
};
