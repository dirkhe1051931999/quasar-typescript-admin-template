import { ref } from 'vue';
import { getPagePermissionID } from 'src/utils/storage';

/**
 * 全局响应式的页面权限ID列表
 * 用于 rtcpt 组件的权限控制
 * 
 * 在应用启动时从 localStorage 初始化（如果用户之前登录过）
 * 在用户登录/退出时动态更新
 */
export const pagePermissionIds = ref<string[]>(getPagePermissionID() || []);

