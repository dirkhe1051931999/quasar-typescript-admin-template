import router from '@/router';
import { DirectiveOptions } from 'vue';
export const permission: DirectiveOptions = {
  inserted(el, binding) {
    const { value } = binding;
    const r: any = router;
    const that: any = r.apps[0];
    !that.$route.meta.modify ? el.remove() : () => 0;
  },
};
