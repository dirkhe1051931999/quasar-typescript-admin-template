import { type Directive } from 'vue';
import { ref } from 'vue';

// 内部状态管理：用来控制 tooltip 的显示
export const tooltipClass = ref('hide-tooltip');

/** tooltip 指令：根据内容是否溢出来控制 tooltip 显示 */
export const tooltip: Directive = {
  mounted(el, binding) {
    const lines = binding.arg === 'lines' ? binding.value : 1;
    
    el.addEventListener('mouseenter', () => {
      const isOverflowing = checkOverflow(el, lines);
      
      if (isOverflowing) {
        // 内容溢出，显示 tooltip
        tooltipClass.value = '';
      } else {
        // 内容未溢出，隐藏 tooltip
        tooltipClass.value = 'hide-tooltip';
      }
    });
  },
};

/**
 * 检查元素是否溢出
 * @param el 要检查的元素
 * @param lines 行数（1为单行，>1为多行）
 */
function checkOverflow(el: HTMLElement, lines: number): boolean {
  if (lines === 1) {
    // 单行：比较 scrollWidth 和 clientWidth
    return el.scrollWidth > el.clientWidth;
  } else {
    // 多行：比较 scrollHeight 和 clientHeight
    return el.scrollHeight > el.clientHeight;
  }
}
