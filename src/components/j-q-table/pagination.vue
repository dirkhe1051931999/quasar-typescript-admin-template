<template>
  <div>
    <div class="row items-center justify-end">
      <div style="margin-top: 4px">
        <span>Total: {{ internalInfo.rowsNumber }}</span>
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
      />
      <div style="margin-top: 4px; margin-right: 24px">
        <span>{{ $t('table.pieces_page') }}</span>
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
      <p style="margin-left: 24px">Go</p>
      <q-input
        v-model.trim="internalInfo.currentPage"
        @keyup.enter="handlePageChange"
        autocapitalize="off"
        autocomplete="new-password"
        autocorrect="off"
        dense
        outlined
        :placeholder="currentPagePlaceholder"
        class="pagination-currentPage-input q-ml-sm"
        :mask="currentPageMask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';

interface PaginationInfo {
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
  props: {
    paginationInfo: {
      type: Object as () => PaginationInfo,
      default: () => ({
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0,
      }),
    },
  },
  emits: ['pagination'],
  setup(props, { emit }) {
    /* --- 内部状态定义 --- */
    const internalInfo = reactive<InternalPaginationState>({
      page: props.paginationInfo.page,
      rowsPerPage: props.paginationInfo.rowsPerPage,
      rowsNumber: props.paginationInfo.rowsNumber,
      totalPage: 0, // 初始化为 0，等待计算
      currentPage: '',
    });

    const rowNumbersArr = [10, 15, 20, 30, 50];

    /* --- Computed 计算属性 (纯函数) --- */

    // 1. 计算总页数 (纯净)
    const maxPage = computed(() => {
      const { rowsNumber, rowsPerPage } = internalInfo;
      const total = Math.ceil(rowsNumber / rowsPerPage);
      return total < 1 ? 1 : total;
    });

    // 2. 计算跳转输入框的占位符 (纯净)
    const currentPagePlaceholder = computed(() => {
      // 这里的 totalPage 是由 watch 维护的，保证计算属性的纯净性
      return `${internalInfo.page} / ${internalInfo.totalPage}`;
    });

    // 3. 计算跳转输入框的掩码 (纯净)
    const currentPageMask = computed(() => {
      const total = maxPage.value.toString();
      return Array(total.length).fill('#').join('');
    });

    /* --- Watch 侦听器 (处理副作用) --- */

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
.my-pagination {
  width: 70px;
}

.pagination-currentPage-input {
  width: 70px;
}

.q-pagination__middle {
  background: #ffffff !important;
}
</style>
