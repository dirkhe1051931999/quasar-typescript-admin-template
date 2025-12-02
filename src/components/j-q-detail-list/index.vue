<template>
  <div class="row" :class="gutter">
    <template v-for="item in items" :key="item.name">
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
        <div class="detail-value text-body2" :class="[`text-${item.align || 'left'}`]">
          <template v-if="slots[`item-value-${item.name}`]">
            <slot :name="`item-value-${item.name}`" :value="data[item.name]" :item="item" :data="data" :field-name="item.name" />
          </template>
          <template v-else>
            <j-q-tooltip :content="getDefaultValue(item)"></j-q-tooltip>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
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
  format: (value: any) => any;
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
  },
  setup(props, { slots }) {
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
