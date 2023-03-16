import router from 'src/router';
import { UserModule } from 'src/store/modules/user';
import { type Directive } from 'vue';

/** 权限指令 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding;
  },
};
export const permissionReplace: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    // if (!UserModule.pagePermissionId.includes(value)) {
    //   el.innerHTML = '--';
    //   el.setAttribute(
    //     'style',
    //     'color:#var(--q-dark);pointer-events: none;border:none;box-shadow:none'
    //   );
    // } else {
    //   return 0;
    // }
  },
};
