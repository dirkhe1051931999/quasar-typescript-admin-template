<template>
  <!-- 上下布局 -->
  <div v-if="layout === 'vertical'" class="row" :class="gutter">
    <template v-for="item in visibleItems" :key="item.name">
      <div :class="[`col-${item.span || 6}`]" class="detail-item-container">
        <div class="q-mb-xs text-grey text-caption row items-center">
          {{ item.label }}
          <template v-if="item.tip">
            <q-icon name="app:question" size="14px" class="q-ml-xs tip-icon">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" max-width="300px">
                {{ item.tip }}
              </q-tooltip>
            </q-icon>
          </template>
        </div>
        <div class="detail-value text-body2" :class="[`text-${item.align || 'left'}`, { clickable: isClickable(item) }]" @click="handleClick(item)">
          <template v-if="slots[`item-value-${item.name}`]">
            <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
          </template>
          <template v-else>
            <j-q-tooltip :content="getDefaultValue(item)" :lines="item.whiteSpace || 1" :class="getOptionClass(item)"></j-q-tooltip>
          </template>
        </div>
      </div>
    </template>
  </div>

  <!-- 左右布局 - space-between -->
  <div v-else-if="layout === 'horizontal-between'" class="row horizontal-between-container" :class="gutter">
    <template v-for="item in visibleItems" :key="item.name">
      <div :class="[`col-${item.span || 6}`]">
        <div class="item item-between">
          <div class="label row items-center">
            {{ item.label }}
            <template v-if="item.tip">
              <q-icon name="app:question" size="14px" class="q-ml-xs tip-icon">
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" max-width="300px">
                  {{ item.tip }}
                </q-tooltip>
              </q-icon>
            </template>
          </div>
          <div class="value" :class="{ clickable: isClickable(item) }" @click="handleClick(item)">
            <template v-if="slots[`item-value-${item.name}`]">
              <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
            </template>
            <template v-else>
              <j-q-tooltip :content="getDefaultValue(item)" :lines="item.whiteSpace || 1" :class="getOptionClass(item)"></j-q-tooltip>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- 左右布局 - 左对齐 -->
  <div v-else-if="layout === 'horizontal-left'" class="row horizontal-left-container" :class="gutter" :style="containerStyle">
    <template v-for="item in visibleItems" :key="item.name">
      <div :class="[`col-${item.span || 6}`]">
        <div class="item item-left">
          <div class="label row items-center">
            {{ item.label }}
            <template v-if="item.tip">
              <q-icon name="app:question" size="14px" class="q-ml-xs tip-icon">
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" max-width="300px">
                  {{ item.tip }}
                </q-tooltip>
              </q-icon>
            </template>
          </div>
          <div class="value" :class="{ clickable: isClickable(item) }" @click="handleClick(item)">
            <template v-if="slots[`item-value-${item.name}`]">
              <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
            </template>
            <template v-else>
              <j-q-tooltip :content="getDefaultValue(item)" :lines="item.whiteSpace || 1" :class="getOptionClass(item)"></j-q-tooltip>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import type { PropType, SlotsType } from 'vue';
import { computed, defineComponent } from 'vue';
import { QIcon, QTooltip } from 'quasar';
import JQTooltip from 'components/j-q-tooltip/index.vue';
import { formatDate } from 'src/utils/tool.ts';

export interface DetailItem {
  name: string;
  label: string;
  span?: number;
  align?: 'left' | 'right' | 'center';
  date?: boolean | string;
  options?: Record<string, any>[];
  findByKey?: string;
  displayKey?: string;
  tip?: string;
  whiteSpace?: number; // 最大行数，超过后显示省略号，默认为1
  onClick?: (value: string) => void; // 点击监听函数
  clickable?: boolean | ((row: TDetailData) => boolean); // 是否可点击，可以是 boolean 或 Function
  format: (value: any) => any;
  visible?: boolean | ((row: TDetailData) => boolean);
}

type TDetailData = Record<string, any>;

export default defineComponent({
  name: 'JQDetailList',
  components: {
    JQTooltip,
    QIcon,
    QTooltip,
  },
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
    layout: {
      type: String as PropType<'vertical' | 'horizontal-between' | 'horizontal-left'>,
      default: 'vertical',
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
  },
  slots: Object as SlotsType<Record<`item-value-${string}`, { value: any; item: DetailItem; data: TDetailData; fieldName: string }>>,
  setup(props, { slots }) {
    const isItemVisible = (item: DetailItem): boolean => {
      if (item.visible === undefined || item.visible === null) return true;
      if (typeof item.visible === 'boolean') return item.visible;
      if (typeof item.visible === 'function') {
        return item.visible(props.data);
      }
      return true;
    };

    const visibleItems = computed(() => {
      return props.items.filter((item) => isItemVisible(item));
    });

    const containerStyle = computed(() => {
      if (props.layout === 'horizontal-left') {
        return {
          '--label-width': props.labelWidth,
        };
      }
      return {};
    });

    const computedSlotItems = computed(() => {
      return props.items.filter((item) => {
        return Reflect.has(slots, `item-value-${item.name}`);
      });
    });
    const getOptionLabel = (item: DetailItem, value: any): any => {
      const { options, findByKey, displayKey = 'label' } = item;
      if (!options || !findByKey) {
        return value;
      }
      const foundItem = options.find((option) => String(option[findByKey]) === String(value));
      return foundItem ? foundItem[displayKey] : value;
    };

    const getDefaultValue = (item: DetailItem) => {
      let value = props.data[item.name];
      if (value === null || value === undefined || value === '') {
        return '--';
      }
      if (item.options && item.findByKey) {
        value = getOptionLabel(item, value);
      }
      if (item.format && typeof item.format === 'function') {
        value = item.format(value);
      }
      if (item.date) {
        if (item.date === true && typeof item.date === 'boolean') {
          return formatDate(value);
        } else if (typeof item.date === 'string') {
          return formatDate(value, item.date);
        }
      }

      return String(value);
    };

    const getOptionClass = (item: DetailItem): any => {
      let value = props.data[item.name];
      const { options, findByKey } = item;
      if (!options || !findByKey) {
        return '';
      }
      const foundItem = options.find((option) => String(option[findByKey]) === String(value));
      return foundItem ? foundItem.class : '';
    };

    // 判断是否可点击
    const isClickable = (item: DetailItem): boolean => {
      if (!item.onClick) return false;
      if (item.clickable === undefined || item.clickable === null) return true;
      if (typeof item.clickable === 'boolean') return item.clickable;
      if (typeof item.clickable === 'function') {
        return item.clickable(props.data);
      }
      return false;
    };

    // 处理点击事件
    const handleClick = (item: DetailItem) => {
      if (!isClickable(item) || !item.onClick) return;
      const value = getDefaultValue(item);
      item.onClick(value);
    };

    return {
      visibleItems,
      getOptionClass,
      computedSlotItems,
      getDefaultValue,
      slots,
      containerStyle,
      isClickable,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.detail-item-container {
  min-width: 0;
}

.detail-value.clickable {
  display: inline-block;
  cursor: pointer;
  color: var(--j-color-primary);
}

// 左右布局 - space-between
.horizontal-between-container {
  .item-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }

    .label {
      color: #7e84a3;
      font-size: 12px;
    }

    .value {
      text-align: right;

      &.clickable {
        display: inline-block;
        cursor: pointer;
        color: var(--j-color-primary);
      }
    }
  }
}

// 左右布局 - 左对齐
.horizontal-left-container {
  .item-left {
    display: grid;
    grid-template-columns: var(--label-width, 100px) 1fr;
    align-items: center;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }

    .label {
      color: #7e84a3;
      font-size: 12px;
    }

    .value {
      max-width: 400px;

      &.clickable {
        display: inline-block;
        cursor: pointer;
        color: var(--j-color-primary);
      }
    }
  }
}
</style>
