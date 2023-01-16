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
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
};

export const isValidPassword = (value: string) => {
  //  Contains 10 - 20 characters
  //  Includes uppercase and lowercase letters
  //  Includes numbers and special characters
  const reg =
    /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@+.$%^&*-]).{10,20}/g;
  // 中文
  const zhReg = /[\u4e00-\u9fa5]/gi;
  // 中文特殊字符
  const zhSymbol =
    /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/gi;
  // 空格
  const space = /\s+/gi;
  return (
    reg.test(value) &&
    !zhReg.test(value) &&
    !zhSymbol.test(value) &&
    !space.test(value) &&
    value.length >= 10 &&
    value.length <= 20
  );
};

export const isValidEmail = (value: string) => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi;
  return reg.test(value);
};
