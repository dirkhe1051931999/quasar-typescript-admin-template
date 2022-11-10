/** 统一处理 localStorage */
import setting from 'src/setting.json';

export const getSidebarStatus = () => {
  return localStorage.getItem(`${setting.title}-sidebar-status-key`);
};
export const setSidebarStatus = (sidebarStatus: 'opened' | 'closed') => {
  localStorage.setItem(`${setting.title}-sidebar-status-key`, sidebarStatus);
};
