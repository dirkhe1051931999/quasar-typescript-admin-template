<template>
  <div>
    <q-form ref="searchFormRef" class="j-q-search-bar" autocomplete="off">
      <div class="search--bar-items">
        <slot></slot>
        <div v-if="operationVisible" class="search-bar-operation">
          <q-btn color="primary" :loading="queryLoading" no-caps type="submit" unelevated @click="handleClickQuery">
            {{ t('jQSearchForm.query') }}
          </q-btn>
          <q-btn v-if="resetVisible" class="operation-reset" text-color="inherit" :loading="resetLoading" no-caps unelevated @click="handleClickReset">
            {{ t('jQSearchForm.reset') }}
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type SearchFormData = Record<string, any>;

export default defineComponent({
  name: 'jQSearchForm',
  props: {
    // modelValue 是从父组件传入的搜索数据对象
    modelValue: { type: Object as PropType<SearchFormData>, required: true },
    queryLoading: { type: Boolean },
    resetLoading: { type: Boolean },
    resetVisible: { type: Boolean, default: true },
    operationVisible: { type: Boolean, default: true },
  },
  emits: {
    'update:modelValue': (value: SearchFormData) => true,
    query: () => true, // 触发搜索
    reset: () => true, // 触发重置
  },
  setup(props, { emit, expose }) {
    const { t } = useI18n({
      messages: {
        'en-US': {
          jQSearchForm: {
            query: 'Query',

            reset: 'Reset',
          },
        },

        'zh-CN': {
          jQSearchForm: {
            query: '搜索',

            reset: '重置',
          },
        },
      },
      useScope: 'local',
    });

    const searchFormRef = ref(null);

    // 1. 缓存初始状态的副本
    // 使用 ref 存储一个深拷贝的初始数据，作为重置的基准
    const initialModelValue = ref<SearchFormData>({});

    // 2. 监听 modelValue 变化，缓存初始值
    // 使用 watch 确保在组件初始化时（或 modelValue 第一次稳定时）捕获数据快照
    watch(
      () => props.modelValue,
      (newVal) => {
        // 仅在组件首次挂载时或确认需要更新初始状态时执行深拷贝
        if (Object.keys(initialModelValue.value).length === 0) {
          // 使用 JSON.parse(JSON.stringify) 进行深拷贝，避免引用污染
          initialModelValue.value = JSON.parse(JSON.stringify(newVal));
        }
      },
      { deep: true, immediate: true }
    );

    // --- 事件处理 ---

    const handleClickQuery = () => {
      emit('query');
    };

    const handleClickReset = () => {
      // 3. 重置操作：用缓存的初始值覆盖当前的 modelValue
      // 必须通过 'update:modelValue' 事件将新值传回父组件
      const resetValue = JSON.parse(JSON.stringify(initialModelValue.value));
      emit('update:modelValue', resetValue);

      // 通知父组件执行重置后的业务逻辑（例如重新搜索）
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
// --- SCSS 变量定义 ---
$search-bar-item-width: 250px;
$color-grey-light: #f0f0f0;

.j-q-search-bar {
  .search--bar-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(0, $search-bar-item-width));
    gap: 12px;
  }

  .search-bar-operation {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .operation-reset {
    background-color: $color-grey-light;
    // 增加一个过渡，提升用户体验
    transition: background-color 0.2s;
  }
}
</style>