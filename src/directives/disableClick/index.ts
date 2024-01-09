import { Directive } from 'vue';

export const disableClick: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    el.addEventListener('click', (e: any) => {
      if (value) {
        e.stopPropagation();
      }
    });
  },
};
