<template>
  <div>
    <div class="row items-center justify-end">
      <div style="margin-top: 4px">
        <span>{{ t('messages.pagination.total', { total: internalInfo.rowsNumber }) }}</span>
      </div>
      <q-select
        class="my-pagination"
        v-model="internalInfo.rowsPerPage"
        :options="rowNumbersArr"
        dropdown-icon="expand_more"
        @update:model-value="handleRowsPerPageChange"
        style="margin-top: 4px; margin-left: 12px; margin-right: 8px"
        dense
        outlined
        options-dense
        autocomplete="false"
        popup-content-class="j-q-select-popup select-popup-content height1"
      />
      <div style="margin-top: 4px; margin-right: 24px">
        <span>{{ t('messages.pagination.pieces_page') }}</span>
      </div>
      <q-pagination
        v-model="internalInfo.page"
        :input="false"
        :max-pages="6"
        :max="maxPage"
        @update:model-value="handlePageChange"
        direction-links
        icon-prev="app:navigation-arrow-left"
        icon-next="app:navigation-arrow-right"
        color="grey"
        active-color="primary"
        active-text-color="white"
        :ripple="false"
      ></q-pagination>
      <p style="margin-left: 24px">
        {{ t('messages.pagination.goto') }}
      </p>
      <q-input
        :autofocus="false"
        v-model.trim="internalInfo.currentPage"
        @keyup.enter="handlePageChange"
        autocapitalize="off"
        autocomplete="new-password"
        autocorrect="off"
        dense
        outlined
        :placeholder="currentPagePlaceholder"
        class="pagination-current-page-input q-ml-sm"
        :mask="currentPageMask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
import { QInput, QPagination, QSelect } from 'quasar';
import { DEFAULT_ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from './pagination';
import { useI18n } from 'src/composables/useI18n.ts';

export interface PaginationInfo {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}

interface InternalPaginationState extends PaginationInfo {
  totalPage: number;
  currentPage: string | number;
}

export default defineComponent({
  name: 'MyPaginationComponent',
  components: {
    QSelect,
    QPagination,
    QInput,
  },
  props: {
    paginationInfo: {
      type: Object as () => PaginationInfo,
      default: () => ({
        page: 1,
        rowsPerPage: DEFAULT_ROWS_PER_PAGE,
        rowsNumber: 0,
      }),
    },
  },
  emits: ['pagination'],
  setup(props, { emit }) {
    const { t } = useI18n();
    /* --- 内部状态定义 --- */
    const internalInfo = reactive<InternalPaginationState>({
      page: props.paginationInfo.page,
      rowsPerPage: props.paginationInfo.rowsPerPage,
      rowsNumber: props.paginationInfo.rowsNumber,
      totalPage: 0, // 初始化为 0，等计算
      currentPage: '',
    });

    const rowNumbersArr = ROWS_PER_PAGE_OPTIONS;

    /* --- Computed 计算属性 (纯函数) --- */

    // 1. 计算总页数
    const maxPage = computed(() => {
      const { rowsNumber, rowsPerPage } = internalInfo;
      const total = Math.ceil(rowsNumber / rowsPerPage);
      return total < 1 ? 1 : total;
    });

    // 2. 计算跳转输入框的占位符
    const currentPagePlaceholder = computed(() => {
      // 这里的 totalPage 是由 watch 维护的
      return `${internalInfo.page} / ${internalInfo.totalPage}`;
    });

    // 3. 计算跳转输入框的掩码
    const currentPageMask = computed(() => {
      const total = maxPage.value.toString();
      return Array(total.length).fill('#').join('');
    });

    /* --- Watch 侦听器 --- */

    // 监听外部 Prop 变化，同步数据
    watch(
      () => props.paginationInfo,
      (newVal: PaginationInfo) => {
        internalInfo.page = newVal.page;
        internalInfo.rowsPerPage = newVal.rowsPerPage;
        internalInfo.rowsNumber = newVal.rowsNumber;
      },
      { deep: true, immediate: true }
    );

    watch(
      maxPage,
      (newMaxPage) => {
        internalInfo.totalPage = newMaxPage;
      },
      { immediate: true }
    );

    /* --- Event Methods 事件处理 --- */
    const emitPagination = () => {
      const payload: PaginationInfo = {
        page: internalInfo.page,
        rowsPerPage: internalInfo.rowsPerPage,
        rowsNumber: internalInfo.rowsNumber,
      };
      emit('pagination', payload);
    };

    const handleRowsPerPageChange = () => {
      internalInfo.page = 1;
      emitPagination();
    };

    const handlePageChange = () => {
      // 处理跳转输入框逻辑
      if (internalInfo.currentPage) {
        let targetPage = Number(internalInfo.currentPage);

        if (isNaN(targetPage) || targetPage < 1) {
          targetPage = 1;
        } else if (targetPage > maxPage.value) {
          targetPage = maxPage.value;
        }

        internalInfo.page = targetPage;
        internalInfo.currentPage = '';
      }

      // 确保页码在有效范围内
      if (internalInfo.page < 1) internalInfo.page = 1;
      if (internalInfo.page > maxPage.value) internalInfo.page = maxPage.value;

      // 如果页码通过跳转输入框修改后，QPagination 的 v-model 也会相应更新，最终触发 emitPagination
      emitPagination();
    };

    /* --- Return --- */
    return {
      t,
      internalInfo,
      rowNumbersArr,
      currentPagePlaceholder,
      currentPageMask,
      maxPage,
      handleRowsPerPageChange,
      handlePageChange,
      paginationInput: handlePageChange,
      selectChange: handleRowsPerPageChange,
    };
  },
});
</script>

<style lang="scss">
@use './pagination';
</style>