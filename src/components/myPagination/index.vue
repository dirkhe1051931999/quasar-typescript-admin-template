<template>
  <div>
    <div class="row items-center justify-end q-mt-md">
      <p class="m-t-3">{{ $t('table.total') }} {{ _paginationParams.rowsNumber }}</p>
      <q-input
        v-model.trim="_paginationParams.currentPage"
        @keyup.enter="_paginationInput"
        autocapitalize="off"
        autocomplete="new-password"
        autocorrect="off"
        dense
        outlined
        :placeholder="currentPagePlaceholder"
        class="pagination-currentPage-input q-mx-sm"
        :mask="currentPageMask"
      />
      <q-pagination
        v-model="_paginationParams.page"
        :input="false"
        :max-pages="6"
        :max="_paginationParams.rowsNumber / _paginationParams.rowsPerPage < 1 ? 1 : Math.ceil(_paginationParams.rowsNumber / _paginationParams.rowsPerPage)"
        @update:model-value="_paginationInput"
        direction-links
        icon-prev="app:navigation-arrow-left"
        icon-next="app:navigation-arrow-right"
        color="grey"
        active-color="white"
        active-text-color="primary"
        :ripple="false"
      ></q-pagination>
      <q-select
        class="my-pagination q-ml-sm"
        borderless
        v-model="_paginationParams.rowsPerPage"
        :options="_rowNumbersArr"
        dropdown-icon="app:topbar-arrow-bottom"
        @update:model-value="selectChange"
        dense
        :display-value="`${globals.$t('table.pieces_page')} ${_paginationParams.rowsPerPage} `"
        options-dense
      />
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

interface Pagination {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
  totalPage: number;
  currentPage: string;
}

@Component({ name: 'MyPaginationComponent', emits: ['pagination'] })
export default class MyPaginationComponent extends Vue {
  @Prop({
    default: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    },
  })
  paginationParams!: Pagination;

  @Watch('paginationParams', { deep: true })
  onPaginationParamsChange(newVal: Pagination) {
    this._paginationParams.page = newVal.page;
    this._paginationParams.rowsPerPage = newVal.rowsPerPage;
    this._paginationParams.rowsNumber = newVal.rowsNumber;
    this._paginationParams.totalPage = Math.ceil(newVal.rowsNumber / newVal.rowsPerPage);
  }

  get currentPagePlaceholder() {
    return `${this._paginationParams.page} / ${this._paginationParams.totalPage}`;
  }

  get currentPageMask() {
    let total = this._paginationParams.totalPage.toString();
    return Array(total.length).fill('#').join('');
  }

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private _rowNumbersArr = [10, 20, 30];
  private _paginationParams: Pagination = {
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0, // 总数
    totalPage: 0, // 总页数
    currentPage: '', // 当前页
  };

  private _paginationInput() {
    if (this._paginationParams.currentPage) {
      if (Number(this._paginationParams.currentPage) > this._paginationParams.totalPage) {
        this._paginationParams.currentPage = this._paginationParams.totalPage.toString();
      }
      this._paginationParams.page = Number(this._paginationParams.currentPage);
      this._paginationParams.currentPage = '';
    }
    this.$emit('pagination', {
      page: this._paginationParams.page,
      rowsPerPage: this._paginationParams.rowsPerPage,
      rowsNumber: this._paginationParams.rowsNumber,
    });
  }

  private selectChange() {
    this._paginationParams.page = 1;
    this.$emit('pagination', {
      page: this._paginationParams.page,
      rowsPerPage: this._paginationParams.rowsPerPage,
      rowsNumber: this._paginationParams.rowsNumber,
    });
  }

  mounted() {
    this._paginationParams.page = this.paginationParams.page;
    this._paginationParams.rowsPerPage = this.paginationParams.rowsPerPage;
    this._paginationParams.rowsNumber = this.paginationParams.rowsNumber;
    this._paginationParams.totalPage = Math.ceil(this.paginationParams.rowsNumber / this.paginationParams.rowsPerPage);
  }
}
</script>

<style lang="scss">
.body--dark {
  .q-pagination__middle button {
    background: #121212 !important;
  }
}

.body--light {
  .q-pagination__middle {
    background: #ffffff !important;
  }
}
</style>
