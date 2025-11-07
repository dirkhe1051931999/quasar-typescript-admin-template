<template>
  <component :is="activeComponent" :color="color" :size="size" :style="style" />
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';

// --- 动态导入所有 SVG 组件 ---
const svgDeveloperActive = defineAsyncComponent(() => import('./svgDeveloperActive.vue'));
const svgDeveloper = defineAsyncComponent(() => import('./svgDeveloper.vue'));
const svgEsimActive = defineAsyncComponent(() => import('./svgEsimActive.vue'));
const svgEsim = defineAsyncComponent(() => import('./svgEsim.vue'));
const svgOrganizationActive = defineAsyncComponent(() => import('./svgOrganizationActive.vue'));
const svgOrganization = defineAsyncComponent(() => import('./svgOrganization.vue'));
const svgRecordActive = defineAsyncComponent(() => import('./svgRecordActive.vue'));
const svgRecord = defineAsyncComponent(() => import('./svgRecord.vue'));

// 组件映射表：'name' prop值 -> 对应组件
const componentMap:any = {
  'developeractive': svgDeveloperActive,
  'developer': svgDeveloper,
  'esimactive': svgEsimActive,
  'esim': svgEsim,
  'organizationactive': svgOrganizationActive,
  'organization': svgOrganization,
  'recordactive': svgRecordActive,
  'record': svgRecord,
};

export default defineComponent({
  name: 'JCvgIcon', // 统一的组件名

  // 禁用属性继承，由我们手动透传给动态组件
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
