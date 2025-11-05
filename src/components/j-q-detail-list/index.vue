<template>
  <div class="row" :class="gutter">
    <template v-for="item in items" :key="item.name">
      <div :class="[`col-${item.span || 6}`]" class="detail-item-container">
        <div class="q-mb-xs text-grey text-caption">
          {{ item.label }}
        </div>
        <div class="detail-value text-body2" :class="[`text-${item.align || 'left'}`]">
          <template v-if="slots[`item-value-${item.name}`]">
            <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" />
          </template>
          <template v-else>
            {{ getDefaultValue(item) }}
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';

// --- 类型定义 ---
export interface DetailItem {
  name: string;
  label: string;
  span?: number;
  align?: 'left' | 'right' | 'center';
}

// v-model 是数据对象，但这里我们使用 data prop
type TDetailData = Record<string, any>;

export default defineComponent({
  name: 'JQDetailList',
  props: {
    items: {
      type: Array as PropType<DetailItem[]>,
      required: true,
    },
    data: {
      type: Object as PropType<TDetailData>,
      required: true,
    },
    gutter: {
      type: String,
      default: 'q-col-gutter-md',
    },
  },
  setup(props, { slots }) {
    // 1. 计算需要使用 Slot 定制的列表项
    const computedSlotItems = computed(() => {
      return props.items.filter((item) => {
        // 检查 slots 对象中是否存在名为 item-value-字段名 的插槽
        return Reflect.has(slots, `item-value-${item.name}`);
      });
    });

    // 2. 获取默认文本值 (安全访问)
    const getDefaultValue = (item: DetailItem) => {
      // 安全地从 data 对象中获取值
      const value = props.data[item.name];

      // 如果值是 null 或 undefined，则显示 '-' 或空字符串
      if (value === null || value === undefined || value === '') {
        return '--';
      }

      return value;
    };

    return {
      computedSlotItems,
      getDefaultValue,
      slots,
    };
  },
});
</script>

<style lang="scss" scoped>
.detail-item-container {
  min-width: 0;
}
</style>