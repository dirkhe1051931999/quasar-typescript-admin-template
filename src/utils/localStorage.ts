/** 统一处理 localStorage */

import CacheKey from './cacheKey';

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS);
};
export const setSidebarStatus = (sidebarStatus: 'opened' | 'closed') => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus);
};
