import { AppModule } from 'src/store/modules/app';
import { type Directive } from 'vue';

/** 权限指令 */
export const tooltip: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    el.addEventListener('mouseenter', () => {
      const cWidth = el.clientWidth;
      const sWidth = el.scrollWidth;
      if (sWidth > cWidth) {
        AppModule.SET_TOOL_TIP_CLASS('');
      } else {
        AppModule.SET_TOOL_TIP_CLASS('hide-tooltip');
      }
    });
  },
};