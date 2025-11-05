<template>
  <div class="j-q-autocomplete" :style="`width: ${historyParams.width[searchId] || 'auto'}`">
    <q-input
      v-bind="$attrs"
      :label="label"
      :model-value="modelValue"
      @update:model-value="onUpdateValue"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      clear-icon="app:clear"
      clearable
      dense
      dropdown-icon="expand_more"
      outlined
      ref="inputRef"
    >
    </q-input>
    <div class="j-q-autocomplete-list-container" v-show="historyParams.visible && historyParams.filterList.length">
      <ul>
        <li v-for="item in historyParams.filterList" :key="item.id" @mousedown="onSelectItem(item)">
          <span class="value">
            {{ item.value }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue';

// 假设的存储类型
interface HistoryItem {
  id: number;
  value: string;
}

const UserModule = { username: 'current_user' };
const getUserCommonInputSearchHistoryParams = () => {
  return localStorage.getItem('APP_SEARCH_HISTORY') || '{}';
};
const setUserCommonInputSearchHistoryParams = (data: string) => {
  localStorage.setItem('APP_SEARCH_HISTORY', data);
};

export default defineComponent({
  name: 'JQAutocomplete',
  emits: ['update:model-value'],
  props: {
    modelValue: { type: String, required: true },
    searchKey: { type: String, required: true },
    searchId: { type: String, required: true },
    label: { type: String, default: '' },
  },
  setup(props, { emit, expose }) {
    // --- 状态定义 ---
    const uniqueKey = computed(() => `search_history__${UserModule.username}__${props.searchKey}`);
    const inputRef = ref<any>(null);

    // 使用 reactive 声明所有可变状态
    const historyParams = reactive({
      maxLength: 5,
      width: {
        eid: '250px',
      } as Record<string, string>,
      list: [] as HistoryItem[],
      filterList: [] as HistoryItem[],
      visible: false,
      uniqueKey: uniqueKey.value,
    });

    // --- 生命周期：初始化加载历史记录 ---
    onMounted(() => {
      loadHistoryFromStorage();
    });

    // --- 监听 modelValue 变化以过滤列表 ---
    watch(
      () => props.modelValue,
      (newVal) => {
        // 当 modelValue 改变时，过滤列表
        historyParams.filterList = historyParams.list.filter((item: HistoryItem) => item.value.includes(newVal));
      }
    );

    // --- 核心逻辑函数 ---
    const loadHistoryFromStorage = () => {
      try {
        const storedData = getUserCommonInputSearchHistoryParams();
        const historyParamsMap = JSON.parse(storedData);
        historyParams.list = historyParamsMap[uniqueKey.value] || [];
      } catch (e) {
        console.error('Failed to load search history:', e);
        historyParams.list = [];
      }
    };

    const onFocus = () => {
      // 每次 focus 时重新加载历史，以防其他地方修改了存储
      loadHistoryFromStorage();

      const currentValue = props.modelValue;
      if (!currentValue) {
        historyParams.filterList = historyParams.list;
      } else {
        historyParams.filterList = historyParams.list.filter((item: HistoryItem) => item.value.includes(currentValue));
      }
      historyParams.visible = true;
    };

    const onBlur = () => {
      // 延迟关闭，以允许 onSelectItem 的 mousedown 事件先触发
      historyParams.visible = false;
    };

    const onClear = () => {
      // 清空输入框时，显示所有历史记录
      historyParams.filterList = historyParams.list;
      inputRef.value.blur();
    };

    const onUpdateValue = (value: string) => {
      // 1. 同步更新 v-model
      emit('update:model-value', value);

      // 2. 根据新值过滤列表 (watch 也会做，但这里同步执行更快)
      historyParams.filterList = historyParams.list.filter((item: HistoryItem) => item.value.includes(value));
    };

    const onSelectItem = (item: HistoryItem) => {
      // 选中项后，更新 v-model 并隐藏列表
      emit('update:model-value', item.value);
      historyParams.visible = false;
    };

    // 供外部或父组件调用的保存历史记录的方法
    const saveHistory = (value: string) => {
      if (!value) return;

      // 1. 检查并更新内存列表
      if (historyParams.list.find((item) => item.value === value)) return;

      if (historyParams.list.length >= historyParams.maxLength) {
        historyParams.list.pop();
      }
      historyParams.list.unshift({ id: +new Date(), value });

      // 2. 更新 Local Storage
      let historyParamsMap: Record<string, HistoryItem[]>;
      try {
        historyParamsMap = JSON.parse(getUserCommonInputSearchHistoryParams());
      } catch (e) {
        historyParamsMap = {};
      }

      historyParamsMap[uniqueKey.value] = historyParams.list;
      setUserCommonInputSearchHistoryParams(JSON.stringify(historyParamsMap));
    };
    expose({ inputRef });
    return {
      inputRef,
      historyParams,
      onFocus,
      onBlur,
      onClear,
      onUpdateValue,
      onSelectItem,
      saveHistory,
      uniqueKey: uniqueKey,
    };
  },
});
</script>

<style scoped lang="scss">
.j-q-autocomplete {
  position: relative;

  .j-q-autocomplete-list-container {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: #ffffff;
    top: 100%;
    overflow-y: auto;
    padding: 6px;
    max-height: 200px;
    box-shadow: 0px 4px 8px 0px rgba(19, 21, 35, 0.08);
    border-radius: 4px;

    ul {
      list-style: none; /* 移除默认的点 */
      padding: 0;
      margin: 0;

      li {
        padding: 4px 8px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transition: background 0.15s;

        .remove-icon {
          margin-left: auto;
          cursor: pointer;
        }

        .value {
          flex: 1;
        }

        &:hover {
          background: #f5f6fa;
          cursor: pointer;
        }
      }
    }
  }
}
</style>