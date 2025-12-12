<template>
  <q-field
    class="j-c-tree-select"
    :class="{
      'j-c-tree-select--table': label,
      'j-c-tree-select--form': !label,
    }"
    :model-value="computedValue"
    :clearable="false"
    dense
    :label="label"
    no-error-icon
    :outlined="outlined"
    :rules="rules"
    :readonly="readonly"
    :disable="disable"
    @clear="handleClear"
  >
    <div v-show="!label && (computedValue === null || computedValue === void 0 || (Array.isArray(computedValue) && computedValue.length === 0))" class="float-placeholder">
      {{ t('messages.pleaseSelect') }}
    </div>
    <template #control>
      <div class="j-c-tree-select-value-display">
        <slot name="value-display">
          {{ computedValueDisplay }}
        </slot>
      </div>
    </template>

    <template #append>
      <q-icon v-if="clearable && !readonly && !disable && computedValue?.length" :name="clearIcon" class="cursor-pointer q-field__focusable-action" @mousedown.stop="handleClearClick" />
      <q-icon :name="dropdownIcon" :size="label ? '18px' : '20px'" color="grey" v-if="!(readonly || disable)" />
    </template>
    <q-popup-proxy v-model="popupVisible" style="border-top-left-radius: 4px; border-top-right-radius: 4px">
      <div class="j-c-tree-select-popup">
        <div v-if="filterable" class="j-c-tree-select-popup__header">
          <j-q-input
            v-model="inputValue"
            @update:model-value="onUpdateInputValue"
            :placeholder="t('messages.pleaseEnter')"
            :readonly="readonly"
            :disable="disable"
            class="text-to-input"
            sm-input
          ></j-q-input>
        </div>
        <div class="j-c-tree-select-popup__main">
          <j-c-tree
            ref="treeRef"
            v-model="computedValue"
            :multiple="multiple"
            :option-label="optionLabel"
            :option-value="optionValue"
            :options="computedTreeOptions"
            :tick-strategy="tickStrategy"
            :readonly="readonly"
            :disable="disable"
          />
        </div>
      </div>
    </q-popup-proxy>
  </q-field>
</template>

<script lang="ts">
import { type QFieldProps, type QTreeProps, QField, QIcon, QPopupProxy } from 'quasar';
import { computed, defineComponent, type PropType, type SlotsType, ref, watch } from 'vue';
import JCTree from '../j-c-tree/index.vue';
import { useI18n } from 'src/composables/useI18n.ts';
import JQInput from 'components/j-q-input/index.vue';

type ModelValue = (string | number)[];
type Option = Record<string, any>;
type TickStrategy = QTreeProps['tickStrategy'];
type ValueDisplayFn = (value: ModelValue, options: Option[]) => string;

export default defineComponent({
  name: 'JCTreeSelect',
  components: {
    JQInput,
    JCTree,
    QField,
    QIcon,
    QPopupProxy,
  },
  props: {
    modelValue: { type: Array as PropType<ModelValue> },
    clearIcon: { type: String, default: 'app:clear' },
    clearable: { type: Boolean, default: true },
    dropdownIcon: { type: String, default: 'expand_more' },
    filterable: { type: Boolean, default: true },
    label: { type: String as PropType<QFieldProps['label']> },
    multiple: { type: Boolean, default: false },
    optionLabel: { type: String, default: 'label' },
    optionValue: { type: String, default: 'value' },
    options: { type: Array as PropType<Option[]> },
    outlined: { type: Boolean as PropType<QFieldProps['outlined']>, default: true },
    rules: { type: Array as () => QFieldProps['rules'] },
    tickStrategy: { type: String as PropType<TickStrategy>, default: 'strict' },
    valueDisplayFn: { type: Function as PropType<ValueDisplayFn> },
    readonly: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
  },
  emits: {
    'update:modelValue': (value: ModelValue) => true,
  },
  slots: Object as SlotsType<{
    'value-display': void;
  }>,
  setup(props, { emit, expose }) {
    const treeRef = ref<InstanceType<typeof JCTree> | null>(null);
    const { t } = useI18n();

    const popupVisible = ref(false);
    const inputValue = ref('');
    const filterOptions = ref<Option[]>([]);

    const innerValue = ref<ModelValue>(props.modelValue ?? []);

    const isStrictSingle = computed(() => props.tickStrategy === 'strict' && !props.multiple);
    const computedValue = computed<ModelValue>({
      get() {
        return props.modelValue || innerValue.value;
      },
      set(val) {
        let finalVal = val;

        innerValue.value = finalVal;
        emit('update:modelValue', finalVal);

        if (isStrictSingle.value) {
          if (finalVal?.length) {
            popupVisible.value = false;
          }
        }
      },
    });

    const popupControlVisible = computed({
      get() {
        // Popup cannot be opened if disabled or readonly
        return props.disable || props.readonly ? false : popupVisible.value;
      },
      set(val) {
        popupVisible.value = val;
      },
    });

    watch(
      () => props.modelValue,
      (val) => {
        innerValue.value = val ?? [];
      }
    );

    watch(popupVisible, (newVal) => {
      // 检查 newVal 是否为 false (即弹窗关闭)
      if (!newVal) {
        inputValue.value = '';
      }
    });

    const getFullValue = () => {
      if (!computedValue.value?.length) return undefined;
      const val: Option[] = [];
      const eachFn = (option: Option) => {
        if (option.children?.length) {
          option.children.forEach(eachFn);
        }
        if (computedValue.value?.includes(option[props.optionValue as keyof Option])) {
          val.push(option);
        }
      };
      const optionsToIterate = props.options || [];
      optionsToIterate.forEach(eachFn);
      return val;
    };

    const computedValueDisplay = computed(() => {
      if (!computedValue.value?.length) return undefined;
      if (props.valueDisplayFn) return props.valueDisplayFn(computedValue.value, props.options || []);

      const fullValues = getFullValue();
      return fullValues?.map((item) => item[props.optionLabel as keyof Option]).toString();
    });

    const computedOptions = computed(() => props.options || []);

    const computedTreeOptions = computed(() => {
      if (inputValue.value) return filterOptions.value;
      return computedOptions.value;
    });

    // 搜索逻辑
    const onUpdateInputValue = (val: any) => {
      filterOptions.value = [];
      if (!val) return;
      let reg: RegExp;
      try {
        reg = new RegExp(val.toString(), 'i');
      } catch (error) {
        return;
      }

      const matchFn = (item: Option, target: Option[]): boolean => {
        const option = { ...item };
        const label = item[props.optionLabel as keyof Option]?.toString() || '';

        let matched = false;

        if (reg.test(label)) {
          matched = true;
        }

        if (item.children?.length) {
          const matchedChildren: Option[] = [];

          item.children.forEach((child: any) => {
            if (matchFn(child, matchedChildren)) {
              matched = true;
            }
          });

          if (matchedChildren.length > 0) {
            option.children = matchedChildren;
          } else {
            delete option.children;
          }
        }

        if (matched) {
          target.push(option);
          return true;
        }
        return false;
      };

      computedOptions.value.forEach((item) => matchFn(item, filterOptions.value));
    };

    const handleClear = () => {
      emit('update:modelValue', []);
    };

    const handleClearClick = () => {
      handleClear();
    };

    expose({
      getFullValue,
    });

    return {
      t,
      handleClearClick,
      treeRef,
      computedValue,
      computedValueDisplay,
      popupVisible: popupControlVisible,
      inputValue,
      computedTreeOptions,
      onUpdateInputValue,
      handleClear,
      getFullValue,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>