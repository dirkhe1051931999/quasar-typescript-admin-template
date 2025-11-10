<template>
  <component :is="activeComponent" :color="color" :size="size" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';

// --- 动态导入所有 SVG 组件 ---
const svgDeveloper = defineAsyncComponent(() => import('./svgDeveloper.vue'));

// 组件映射表：'name' prop值 -> 对应组件
const componentMap: any = {
  'developer': svgDeveloper,
};

export default defineComponent({
  name: 'jCsvg',

  inheritAttrs: false,

  props: {
    // 动态组件的名称，如 'developer', 'esimlist'
    name: {
      type: String,
      required: true,
      validator: (val: string) => Object.keys(componentMap).includes(val.toLowerCase()),
    },
    // 颜色和尺寸 Prop 透传给内部 SVG 组件
    color: String,
    size: [String, Number],
    style: [String, Object],
  },

  setup(props, { attrs }) {
    // 根据 props.name 动态查找对应的组件
    const activeComponent = computed(() => {
      const componentKey = props.name.toLowerCase();
      const component = componentMap[componentKey];

      if (!component) {
        console.error(`[JCSvgIcon Error]: Component "${props.name}" not found in map.`);
      }
      return component;
    });

    return {
      activeComponent,
      // $attrs 会自动包含未声明的props，如 color/size/style，并透传给 <component>
    };
  },
});
</script>
