import { type Directive } from 'vue';
// import { useUserStoreHook } from "@/store/modules/user"

/** 权限指令 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    console.log(123123);
  },
};
