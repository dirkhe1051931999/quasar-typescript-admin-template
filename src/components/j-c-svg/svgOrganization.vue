<template>
<svg :style="cStyle" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>编组 4备份</title>
    <defs>
        <path
            d="M9,13 C10.927,13 12.673,13.783 13.94,15.046 C14.809,14.374 15.879,14 17,14 C19.757,14 22,16.243 22,19 C22,19.552 21.553,20 21,20 L21,20 L16,20 C16,20.552 15.553,21 15,21 L15,21 L3,21 C2.447,21 2,20.552 2,20 C2,16.14 5.141,13 9,13 Z M17,7 C18.654,7 20,8.346 20,10 C20,11.654 18.654,13 17,13 C15.346,13 14,11.654 14,10 C14,8.346 15.346,7 17,7 Z M9,3 C11.206,3 13,4.794 13,7 C13,9.206 11.206,11 9,11 C6.794,11 5,9.206 5,7 C5,4.794 6.794,3 9,3 Z"
            id="path-1"></path>
    </defs>
    <g id="quasar-custom-svg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="console设计规范" transform="translate(-105.000000, -488.000000)">
            <g id="编组" transform="translate(105.000000, 488.000000)">
                <rect id="矩形" x="0" y="0" width="24" height="24"></rect>
                <mask id="mask-2" fill="white">
                    <use xlink:href="#path-1"></use>
                </mask>
                <use id="🎨-Icon-Сolor" fill="currentColor" fill-rule="nonzero" xlink:href="#path-1"></use>
            </g>
        </g>
    </g>
</svg>
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties } from 'vue';

export default defineComponent({
  // 组件名称基于文件名自动生成
  name: 'svgOrganization',
  
  props: {
    // 颜色 props，允许外部传入颜色
    color: {
      type: String,
      default: 'currentColor', // 默认使用 currentColor
    },
    // 尺寸 props，允许外部传入尺寸
    size: {
      type: [String, Number],
      default: '24px', // 默认 24px
    },
    // 额外的样式，用于覆盖或添加
    style: {
      type: [String, Object] as any, // 允许 String 或 CSSProperties
      default: () => ({}),
    }
  },

  setup(props) {
    // 计算样式，用于绑定到 SVG 根元素的 :style
    const cStyle = computed(() => {
      const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size;
      const baseStyle: CSSProperties = {
        width: sizeValue,
        height: sizeValue,
        fill: props.color,
        stroke: props.color,
        color: props.color,
      };
      
      // 合并外部传入的 style
      return { ...baseStyle, ...(props.style as CSSProperties) };
    });

    return {
      cStyle,
    };
  },
});
</script>
