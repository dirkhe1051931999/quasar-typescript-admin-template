/** 统一处理 localStorage */
import setting from 'src/setting.json';
const sidebarKey = `${setting.title}-sidebar-status-key`;
export const getSidebarStatus = () => {
  return localStorage.getItem(sidebarKey);
};
export const setSidebarStatus = (sidebarStatus: 'opened' | 'closed') => {
  localStorage.setItem(sidebarKey, sidebarStatus);
};
export const removeSidebarStatus = () => {
  localStorage.removeItem(sidebarKey);
};
/* 用户信息 */
const userinfoKey = `${setting.title}-userinfo`;
export const getUserinfo = (): string | null => {
  return localStorage.getItem(userinfoKey);
};
export const setUserinfo = (data: any) => {
  localStorage.setItem(userinfoKey, data);
};
export const removeUserinfo = () => {
  localStorage.removeItem(userinfoKey);
};
/* 黑夜模式 */
const darkThemeKey = `${setting.title}-darkTheme`;
export const getDarkTheme = (): string | null => {
  return localStorage.getItem(darkThemeKey);
};
export const setDarkTheme = (data: any) => {
  localStorage.setItem(darkThemeKey, data);
};
export const removeDarkTheme = () => {
  localStorage.removeItem(darkThemeKey);
};
