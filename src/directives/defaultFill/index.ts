import { type Directive } from 'vue';
// import { useUserStoreHook } from "@/store/modules/user"

/** 权限指令 */
export const replaceEmpty: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    if ([null, undefined, ''].includes(value)) {
      el.innerHTML = '--';
      el.style = 'cursor:text;color:var(--q-dark); pointer-events: none! important;font-family:inherit';
    }
  },
};
