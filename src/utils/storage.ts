/** 统一处理 localStorage */
import setting from 'src/setting.json';

const localstorageKey = setting.localstorageKey;

/* 用户信息 */
const userinfoKey = `${localstorageKey}_userinfo`;
export const getUserinfo = (): string | null => {
  return localStorage.getItem(userinfoKey);
};
export const setUserinfo = (data: any) => {
  localStorage.setItem(userinfoKey, data);
};
export const removeUserinfo = () => {
  localStorage.removeItem(userinfoKey);
};

const tokenKey = `${localstorageKey}_token`;
export const getToken = () => localStorage.getItem(tokenKey);
export const setToken = (token: string) => localStorage.setItem(tokenKey, token);
export const removeToken = () => localStorage.removeItem(tokenKey);

const usernameKey = `${localstorageKey}_username`;
export const getUsername = (): any => localStorage.getItem(usernameKey);
export const setUsername = (username: string) => localStorage.setItem(usernameKey, username);
export const removeUsername = () => localStorage.removeItem(usernameKey);

const pagePermissionIDKey = `${localstorageKey}_pagePermissionID`;
export const getPagePermissionID = (): any => (localStorage.getItem(pagePermissionIDKey) ? localStorage.getItem(pagePermissionIDKey)?.split(',') : []);
export const setPagePermissionID = (data: any) => localStorage.setItem(pagePermissionIDKey, data);
export const removePagePermissionID = () => localStorage.removeItem(pagePermissionIDKey);

const dynamicRoutesKey = `${localstorageKey}_dynamicRoutes`;
export const getDynamicRoutes = (): any => localStorage.getItem(dynamicRoutesKey);
export const setDynamicRoutes = (data: any) => localStorage.setItem(dynamicRoutesKey, data);
export const removeDynamicRoutes = () => localStorage.removeItem(dynamicRoutesKey);