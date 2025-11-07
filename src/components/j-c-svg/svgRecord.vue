<template>
<svg :style="cStyle" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>编组 4备份 2</title>
    <defs>
        <path
            d="M14.7139,8 C14.3199,8 13.9999,7.619 13.9999,7.15 L13.9999,3.978 L17.7419,8 L14.7139,8 Z M14.9999,18 L8.9999,18 C8.4479,18 7.9999,17.552 7.9999,17 C7.9999,16.448 8.4479,16 8.9999,16 L14.9999,16 C15.5529,16 15.9999,16.448 15.9999,17 C15.9999,17.552 15.5529,18 14.9999,18 L14.9999,18 Z M8.9999,12 L11.9999,12 C12.5519,12 12.9999,12.448 12.9999,13 C12.9999,13.552 12.5519,14 11.9999,14 L8.9999,14 C8.4479,14 7.9999,13.552 7.9999,13 C7.9999,12.448 8.4479,12 8.9999,12 L8.9999,12 Z M19.7399,7.328 L15.2959,2.328 C15.1069,2.119 14.8379,2 14.5559,2 L6.5559,2 C5.1469,2 3.9999,3.122 3.9999,4.5 L3.9999,19.5 C3.9999,20.878 5.1469,22 6.5559,22 L17.4439,22 C18.8539,22 19.9999,20.878 19.9999,19.5 L19.9999,8 C19.9999,7.751 19.9069,7.512 19.7399,7.328 L19.7399,7.328 Z"
            id="path-1"></path>
    </defs>
    <g id="quasar-custom-svg" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="console设计规范" transform="translate(-137.000000, -488.000000)">
            <g id="编组" transform="translate(137.000000, 488.000000)">
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
  name: 'svgRecord',
  
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
