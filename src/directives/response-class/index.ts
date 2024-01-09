import { Directive } from 'vue';

export const responseClass: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    const documentWidth = document.body.clientWidth;
    let sm = 600;
    let md = 960;
    let lg = 1280;
    let xl = 1920;
    let allClass = value.split(' ');
    let classList: any = [];
    allClass.forEach((item: any) => {
      let classItem = item.split(':');
      classList.push(classItem);
    });
    let classObj: any = {};
    classList.forEach((item: any) => {
      classObj[item[0]] = item[1];
    });
    if (documentWidth < sm) {
      classObj['sm'] && el.classList.add(classObj['sm']);
    } else if (documentWidth < md) {
      classObj['md'] && el.classList.add(classObj['md']);
    } else if (documentWidth < lg) {
      classObj['lg'] && el.classList.add(classObj['lg']);
    } else if (documentWidth < xl) {
      classObj['xl'] && el.classList.add(classObj['xl']);
    } else {
      classObj['xl'] && el.classList.add(classObj['xl']);
    }
  },
};
