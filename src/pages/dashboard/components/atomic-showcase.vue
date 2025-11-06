<template>
  <div class="row q-col-gutter-sm">
    <div v-for="item in showcases" :key="item.className" class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="showcase-card q-pa-sm q-mb-sm b-1 bs-solid bg-grey-2">
        <div class="class-desc">{{ item.description }}</div>
        <div class="demo-sample bg-white" :class="item.className" :style="item.previewStyle">
          {{ item.className }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface ShowcaseItem {
  className: string;
  description: string;
  previewStyle?: CSSProperties;
}

const showcases: ShowcaseItem[] = [];

const addShowcase = (className: string, description: string, previewStyle?: CSSProperties) => {
  showcases.push({ className, description, previewStyle });
};

const boxSizes: Record<string, string> = {
  '10': '10px',
  '20': '20px',
  '30': '30px',
  '40': '40px',
  '50': '50px',
  '60': '60px',
  '100': '100px',
  '150': '150px',
  '200': '200px',
  '25p': '25%',
  '33p': '33.333333%',
  '50p': '50%',
  '66p': '66.666667%',
  '75p': '75%',
  '100p': '100%',
};

Object.entries(boxSizes).forEach(([key, value]) => {
  addShowcase(`w-${key}`, `宽度设置为 ${value}`);
  addShowcase(`h-${key}`, `高度设置为 ${value}`);
});

const maxWidthSizes: Record<string, string> = {
  '100p': '100%',
  '500': '500px',
  '800': '800px',
};

Object.entries(maxWidthSizes).forEach(([key, value]) => {
  addShowcase(`max-w-${key}`, `最大宽度不超过 ${value}`);
});

const minHeightSizes: Record<string, string> = {
  '0': '0',
  '100': '100px',
};

Object.entries(minHeightSizes).forEach(([key, value]) => {
  addShowcase(`min-h-${key}`, `最小高度保持为 ${value}`);
});

addShowcase('box-border', '采用 border-box 盒模型计算尺寸');
addShowcase('box-content', '采用 content-box 盒模型计算尺寸');

const gapSizes: Record<string, string> = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '5': '5px',
  '12': '12px',
  '40': '40px',
};

Object.entries(gapSizes).forEach(([key, value]) => {
  addShowcase(`gap-${key}`, `通用子元素间距 ${value}`);
  addShowcase(`gap-x-${key}`, `水平方向间距 ${value}`);
  addShowcase(`gap-y-${key}`, `垂直方向间距 ${value}`);
});

const radiusSizes: Record<string, string> = {
  '0': '0',
  '4': '4px',
  '8': '8px',
  '10': '10px',
  '50p': '50%',
};

Object.entries(radiusSizes).forEach(([key, value]) => {
  addShowcase(`r-${key}`, `四个角统一圆角 ${value}`);
  addShowcase(`r-t-${key}`, `仅顶部圆角 ${value}`);
  addShowcase(`r-b-${key}`, `仅底部圆角 ${value}`);
  addShowcase(`r-l-${key}`, `仅左侧圆角 ${value}`);
  addShowcase(`r-r-${key}`, `仅右侧圆角 ${value}`);
});

const zIndexValues: Record<string, string> = {
  '1': '1',
  '10': '10',
  '100': '100',
  max: '9999',
};

Object.entries(zIndexValues).forEach(([key, value]) => {
  addShowcase(`z-${key}`, `层级提升至 ${value}`);
});

const opacityValues: Record<string, number> = {
  '0': 0,
  '10': 0.1,
  '20': 0.2,
  '50': 0.5,
  '80': 0.8,
  '100': 1,
};

Object.entries(opacityValues).forEach(([key, value]) => {
  const desc = `不透明度设置为 ${value}`;
  const previewStyle: CSSProperties = value === 0 ? { opacity: 0.15 } : { opacity: value };
  addShowcase(`op-${key}`, desc, previewStyle);
});

const borderWidthValues: Record<string, string> = {
  '0': '0',
  '1': '1px',
  '2': '2px',
  '4': '4px',
};

Object.entries(borderWidthValues).forEach(([key, value]) => {
  addShowcase(`bw-${key}`, `边框宽度 ${value}`);
  addShowcase(`bw-t-${key}`, `上边框宽度 ${value}`);
  addShowcase(`bw-b-${key}`, `下边框宽度 ${value}`);
});

addShowcase('bs-solid', '边框样式：实线');
addShowcase('bs-dotted', '边框样式：点状线');
addShowcase('bs-dashed', '边框样式：虚线');

addShowcase('b-1', '四周 1px 实线边框');
addShowcase('b-none', '移除全部边框');
addShowcase('b-t-1', '顶部 1px 实线边框');
addShowcase('b-b-1', '底部 1px 实线边框');
addShowcase('b-l-1', '左侧 1px 实线边框');
addShowcase('b-r-1', '右侧 1px 实线边框');

// ------------------ Quasar 内置原子类 ------------------
const quasarSpacingClasses: { className: string; description: string }[] = [
  { className: 'q-pa-xs', description: 'Quasar 预设：元素内边距为 xs (4px)' },
  { className: 'q-pa-md', description: 'Quasar 预设：元素内边距为 md (16px)' },
  { className: 'q-ma-sm', description: 'Quasar 预设：元素外边距为 sm (8px)' },
  { className: 'q-mt-lg', description: 'Quasar 预设：元素顶部外边距为 lg (24px)' },
];

quasarSpacingClasses.forEach(({ className, description }) => addShowcase(className, description));

const quasarTextClasses: { className: string; description: string }[] = [
  { className: 'text-primary', description: 'Quasar 预设：文字颜色使用主题 Primary 色' },
  { className: 'text-negative', description: 'Quasar 预设：文字颜色使用 Negative 色' },
  { className: 'text-caption', description: 'Quasar 预设：字号缩小为 caption 样式' },
  { className: 'text-uppercase', description: 'Quasar 预设：文本全部转为大写' },
  { className: 'text-center', description: 'Quasar 预设：文本水平居中' },
];

quasarTextClasses.forEach(({ className, description }) => addShowcase(className, description));

const quasarBgClasses: { className: string; description: string; previewStyle?: CSSProperties }[] = [
  { className: 'bg-primary', description: 'Quasar 预设：背景色使用主题 Primary 色', previewStyle: { color: '#ffffff' } },
  { className: 'bg-positive', description: 'Quasar 预设：背景色使用 Positive 色', previewStyle: { color: '#ffffff' } },
  { className: 'bg-grey-2', description: 'Quasar 预设：背景色为浅灰色（grey-2）' },
];

quasarBgClasses.forEach(({ className, description, previewStyle }) => addShowcase(className, description, previewStyle));

const quasarEffectClasses: { className: string; description: string }[] = [
  { className: 'rounded-borders', description: 'Quasar 预设：为元素添加圆角边框' },
  { className: 'shadow-2', description: 'Quasar 预设：应用轻微阴影 (shadow-2)' },
  { className: 'shadow-8', description: 'Quasar 预设：应用较强阴影 (shadow-8)' },
  { className: 'bordered', description: 'Quasar 预设：添加 1px 边框（默认颜色)' },
  { className: 'ellipsis', description: 'Quasar 预设：单行文本溢出时显示省略号' },
];

quasarEffectClasses.forEach(({ className, description }) => addShowcase(className, description));

const quasarLayoutClasses: { className: string; description: string; previewStyle?: CSSProperties }[] = [
  { className: 'row', description: 'Quasar 预设：启用 flex 布局并沿水平方向排列' },
  { className: 'column', description: 'Quasar 预设：启用 flex 布局并沿垂直方向排列' },
  { className: 'items-center', description: 'Quasar 预设：flex 项在交叉轴上居中对齐（需配合 flex 容器）', previewStyle: { display: 'flex', height: '72px' } },
  { className: 'justify-between', description: 'Quasar 预设：flex 项在主轴上两端对齐（需多个子元素时更明显）', previewStyle: { display: 'flex', width: '100%' } },
  { className: 'fit', description: 'Quasar 预设：元素充满父容器（需父元素限制尺寸）', previewStyle: { minHeight: '80px' } },
];

quasarLayoutClasses.forEach(({ className, description, previewStyle }) => addShowcase(className, description, previewStyle));

// 排序让视觉更稳定（按类名字典序）
showcases.sort((a, b) => a.className.localeCompare(b.className));
</script>

<style scoped lang="scss">
.showcase-card {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  min-height: 140px;
}

.class-desc {
  font-size: 13px;
  line-height: 1.45;
  color: #4a4a4a;
}

.demo-sample {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  min-height: 52px;
  min-width: 120px;
  word-break: break-all;
  transition: transform 0.2s ease;
}

.demo-sample:hover {
  transform: translateY(-2px);
}
</style>