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
        class="pagination-current-page-input q-ml-sm"
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
$color-border: var(--my-grey-6);
$color-white: #ffffff;

// =================================================================
// 1. QPagination 容器和按钮样式 (.q-pagination)
// =================================================================
.q-pagination {
  margin-top: 3px;

  // 覆盖 Quasar 默认背景
  .q-pagination__middle {
    background: $color-white !important;
  }

  // 统一所有 QBtn 样式 (页码、前后箭头)
  .q-btn {
    min-height: 32px;
    height: 32px;
    width: 32px !important;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px !important;
    margin-right: 2px !important;
    border: solid 1px $color-border; // 统一边框样式

    // 伪元素 (水波纹/背景)
    &::before {
      box-shadow: none;
      border-radius: 4px;
      box-sizing: border-box;
    }

    // 包含图片的按钮 (通常是自定义按钮或 Icon 按钮)
    &:has(img) {
      min-width: 32px !important;
      min-height: 32px !important;
      height: 32px !important;
      margin-right: 4px !important;
      margin-left: 4px !important;

      &::before {
        border-radius: 4px;
      }
    }

    // 文本/数字的行高和高度
    span {
      height: 32px !important;
      line-height: 32px !important;
    }

    &.text-primary {
      font-weight: 600;
    }

    .q-btn__content {
      display: block !important;

      .q-icon {
        margin-top: -2px !important;
        font-size: 16px !important;
      }
    }
  }
}

// =================================================================
// 2. 当前页输入框样式 (.pagination-current-page-input)
// =================================================================
.pagination-current-page-input {
  max-width: 68px !important;
  width: 70px; // 保持你自定义的宽度
  margin-top: 3px;

  .q-field__inner {
    .q-field__control {
      height: 32px !important;

      // 统一边框和圆角
      &:before {
        border-radius: 4px !important;
        border: 1px solid $color-border;
      }
    }

    .q-field__native {
      padding-bottom: 6px !important;

      &::placeholder {
        font-size: 14px !important;
      }
    }
  }
}

// =================================================================
// 3. QSelect 样式 (通常用于每页条数选择) (.my-pagination)
// =================================================================
.my-pagination {
  width: 70px; // 保持你自定义的宽度

  // 统一高度到 32px
  &.q-field--dense .q-field__control {
    height: 32px !important;
    min-height: 32px !important;

    .q-field__native {
      height: 32px !important;
      min-height: 32px !important;
    }

    .q-field__marginal {
      height: 32px !important;
      min-height: 32px !important;

      .q-icon.q-select__dropdown-icon {
        font-size: 18px !important;
      }
    }
  }
}

// =================================================================
// 4. QSelect 样式 (通常用于每页条数选择)
// =================================================================
.pagination-current-page-input {
  .q-field__inner {
    .q-field__control {
      &:before {
        background: #ffffff;
      }
    }
  }
}

.q-pagination {
  &::before {
    border: 1px solid rgba($color: #000000, $alpha: 0);
  }
}
</style>