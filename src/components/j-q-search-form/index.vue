<template>
  <div>
    <div ref="searchFormRef" class="j-q-search-bar">
      <div class="search-bar-container">
        <div class="search--bar-items-wrapper">
          <div class="search--bar-items">
            <slot></slot>
            <div v-if="operationVisible" class="default-operation-buttons">
              <q-btn color="primary" :loading="queryLoading" no-caps type="submit" unelevated @click="handleClickQuery">
                {{ t('action.query') }}
              </q-btn>
              <q-btn v-if="resetVisible" class="operation-reset" text-color="inherit" :loading="resetLoading" no-caps unelevated @click="handleClickReset">
                {{ t('action.reset') }}
              </q-btn>
            </div>
          </div>
          <div class="search-bar-extra-operation">
            <slot name="extra-operation"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import { QBtn } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

type SearchFormData = Record<string, any>;

export default defineComponent({
  name: 'jQSearchForm',
  components: {
    QBtn,
  },
  props: {
    modelValue: { type: Object as PropType<SearchFormData>, required: true },
    queryLoading: { type: Boolean },
    resetLoading: { type: Boolean },
    resetVisible: { type: Boolean, default: true },
    operationVisible: { type: Boolean, default: true },
  },
  emits: {
    'update:modelValue': (value: SearchFormData) => true,
    query: () => true,
    reset: () => true,
  },
  setup(props, { emit, expose }) {
    const { t } = useI18n();

    const searchFormRef = ref(null);
    const initialModelValue = ref<SearchFormData>({});

    watch(
      () => props.modelValue,
      (newVal) => {
        if (Object.keys(initialModelValue.value).length === 0) {
          initialModelValue.value = JSON.parse(JSON.stringify(newVal));
        }
      },
      { deep: true, immediate: true }
    );

    const handleClickQuery = () => {
      emit('query');
    };

    const handleClickReset = () => {
      const resetValue = JSON.parse(JSON.stringify(initialModelValue.value));
      emit('update:modelValue', resetValue);
      emit('reset');
    };

    expose({ searchFormRef });
    return {
      t,
      searchFormRef,
      handleClickQuery,
      handleClickReset,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>
