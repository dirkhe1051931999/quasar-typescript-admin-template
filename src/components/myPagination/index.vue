<template>
  <div>
    <div class="row items-center justify-end q-mt-md">
      <p class="q-mr-md">{{ $t('table.total') }} {{ _paginationParams.rowsNumber }}</p>
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
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private _rowNumbersArr = [10, 20, 30];
  private _paginationParams: Pagination = {
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0, // 总数
  };

  private _paginationInput() {
    this.$emit('pagination', this._paginationParams);
  }
  private selectChange() {
    this._paginationParams.page = 1;
    this.$emit('pagination', this._paginationParams);
  }
  mounted() {
    this._paginationParams.page = this.paginationParams.page;
    this._paginationParams.rowsPerPage = this.paginationParams.rowsPerPage;
    this._paginationParams.rowsNumber = this.paginationParams.rowsNumber;
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
