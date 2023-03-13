import Cookies from 'js-cookie';
import setting from 'src/setting.json';
const infiniteTime = new Date(new Date().getTime() + 999999999 * 60 * 1000);
const config = {
  path: '/',
  expires: infiniteTime,
};
// lang
const languageKey = `${setting.title.replace(/\s/g, '_')}_lang`;
export const getLanguage = () => Cookies.get(languageKey) || '';
export const setLanguage = (language: string) =>
  Cookies.set(languageKey, String(language), config);
const sizeKey = 'size';
export const getSize = () => Cookies.get(sizeKey);
export const setSize = (size: string) => Cookies.set(sizeKey, size, config);

// Token
const tokenKey = `${setting.title.replace(/\s/g, '_')}_token`;
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token, config);
export const removeToken = () => Cookies.remove(tokenKey);

// Username
const usernameKey = `${setting.title.replace(/\s/g, '_')}_username`;
export const getUsername = (): any => Cookies.get(usernameKey);
export const setUsername = (username: string) =>
  Cookies.set(usernameKey, username, config);
export const removeUsername = () => Cookies.remove(usernameKey);

const pagePermissionIDKey = `${setting.title.replace(
  /\s/g,
  '_'
)}_pagePermissionID`;
export const getPagePermissionID = (): any =>
  localStorage.getItem(pagePermissionIDKey)
    ? localStorage.getItem(pagePermissionIDKey)?.split(',')
    : [];
export const setPagePermissionID = (data: any) =>
  localStorage.setItem(pagePermissionIDKey, data);
export const removePagePermissionID = () =>
  localStorage.removeItem(pagePermissionIDKey);

const dynamicRoutesKey = `${setting.title.replace(/\s/g, '_')}_dynamicRoutes`;
export const getDynamicRoutes = (): any =>
  localStorage.getItem(dynamicRoutesKey);
export const setDynamicRoutes = (data: any) =>
  localStorage.setItem(dynamicRoutesKey, data);
export const removeDynamicRoutes = () =>
  localStorage.removeItem(dynamicRoutesKey);
