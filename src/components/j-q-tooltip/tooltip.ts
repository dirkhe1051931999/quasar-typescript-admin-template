import { type Directive } from 'vue';
import { ref } from 'vue';

// 内部状态管理：用于控制 tooltip 的显示
export const tooltipClass = ref('hide-tooltip');

/** tooltip 指令：根据内容是否溢出来控制 tooltip 显示 */
export const tooltip: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    el.addEventListener('mouseenter', () => {
      const cWidth = el.clientWidth;
      const sWidth = el.scrollWidth;
      if (sWidth > cWidth) {
        // 内容溢出，显示 tooltip
        tooltipClass.value = '';
      } else {
        // 内容未溢出，隐藏 tooltip
        tooltipClass.value = 'hide-tooltip';
      }
    });
  },
};
