<template>
  <q-tree
    ref="main"
    v-model:ticked="computedValue"
    default-expand-all
    :label-key="optionLabel"
    :node-key="optionValue"
    :nodes="options"
    :tick-strategy="tickStrategy"
    :no-nodes-label="t('messages.noData')"
  >
    <template #default-header="scope">
      <div class="q-tree-label-wrapper">
        <j-q-tooltip :content="scope.node[optionLabel]" style="max-width: 320px">
          <div class="q-tree-label-truncate">
            {{ scope.node[optionLabel] }}
          </div>
        </j-q-tooltip>
      </div>
    </template>
  </q-tree>
</template>
<script lang="ts">
import { QTree, type QTreeProps } from 'quasar';
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { useI18n } from 'src/composables/useI18n.ts';
import JQTooltip from 'components/j-q-tooltip/index.vue';

type ModelValue = (string | number)[];
type Option = any;
type TickStrategy = QTreeProps['tickStrategy'];

export default defineComponent({
  name: 'jCTree',
  components: { JQTooltip },
  props: {
    modelValue: { type: Array as PropType<ModelValue> },
    multiple: { type: Boolean, default: false },
    options: { type: Array as PropType<Option[]>, default: () => [] },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    tickStrategy: { type: String as PropType<TickStrategy>, default: 'strict' },
    readonly: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const mainRef = ref<QTree | null>(null);
    const { t } = useI18n();

    const innerValue = ref<ModelValue>(props.modelValue ?? []);
    const isStrictSingle = computed(() => props.tickStrategy === 'strict' && !props.multiple);
    const computedValue = computed<ModelValue>({
      get() {
        return props.modelValue ?? innerValue.value;
      },
      set(val) {
        let finalVal = val;
        if (isStrictSingle.value) {
          const valArray = Array.isArray(val) ? val : [];
          const lastItem = valArray.length > 0 ? valArray[valArray.length - 1] : undefined;
          finalVal = lastItem ? [lastItem] : [];
        }
        innerValue.value = finalVal;
        emit('update:modelValue', finalVal);
      },
    });

    watch(
      () => props.modelValue,
      (val) => {
        innerValue.value = val ?? [];
      }
    );

    expose({
      qTreeRef: mainRef,
    });

    return {
      t,
      mainRef,
      computedValue,
    };
  },
});
</script>