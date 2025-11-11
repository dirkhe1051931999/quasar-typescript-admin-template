<template>
  <div>
    <j-q-form-label :label="label" :required="required">
      <div v-for="(item, index) in innerValue" :key="index" class="row q-col-gutter-sm">
        <div class="col-6">
          <j-q-input :model-value="item" @update:model-value="updateItem(index, $event)" :rules="rules" :readonly="readonly" :placeholder="computedPlaceholder">
            <template #after>
              <slot name="after" />
            </template>
          </j-q-input>
        </div>
        <div style="margin-top: 4px">
          <q-btn icon="remove_circle_outline" flat round dense color="grey" @click="removeItem(index)" v-if="innerValue.length > 1" />
          <q-btn icon="add_circle_outline" flat round dense color="grey" @click="addItem(index + 1)" v-if="innerValue.length - 1 === index && innerValue.length < maxItems" />
        </div>
      </div>
    </j-q-form-label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import JQInput from 'components/j-q-input/index.vue';
import JQFormLabel from 'components/j-q-form-label/index.vue';

type TModelValue = string[];

export default defineComponent({
  name: 'jCListEditor',
  components: { JQFormLabel, JQInput },
  props: {
    modelValue: {
      type: Array as PropType<TModelValue>,
      default: () => [''],
    },
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    rules: { type: Array as PropType<any[]> },
    readonly: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    defaultNewValue: { type: String, default: '' },
    maxItems: { type: [String, Number] as PropType<number>, default: 5 },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const innerValue = computed<TModelValue>({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    const computedPlaceholder = computed(() => {
      return props.placeholder || t('messages.pleaseEnter');
    });

    const updateItem = (index: number, value: string) => {
      if (innerValue.value[index] !== value) {
        const newValue = [...innerValue.value];
        newValue[index] = value;
        innerValue.value = newValue;
      }
    };

    const addItem = (index: number) => {
      const newValue = [...innerValue.value];
      newValue.splice(index, 0, props.defaultNewValue);
      innerValue.value = newValue;
    };

    const removeItem = (index: number) => {
      const newValue = [...innerValue.value];
      newValue.splice(index, 1);
      innerValue.value = newValue;
    };

    return {
      computedPlaceholder,
      innerValue,
      updateItem,
      addItem,
      removeItem,
    };
  },
});
</script>