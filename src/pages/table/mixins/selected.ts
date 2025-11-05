import { Vue } from 'vue-facing-decorator';

interface TableParams {
  data: any[];
  selected: any[];
}

export default abstract class TableSelectionMixin extends Vue {
  abstract tableParams: TableParams;
  // ------------------------------------
  // 1. itemSelectDisable: 业务逻辑 (需要被实际组件覆盖)
  // ------------------------------------
  public itemSelectDisable(data: any): boolean {
    const { id } = data;
    if (id % 4 === 0) return true;
    if (this.tableParams.selected.length) {
      return (this.tableParams.selected[0] as any).status !== data.status;
    }
    return false;
  }

  // ------------------------------------
  // 2. isItemSelected: 判断单行是否被选中
  // ------------------------------------
  public isItemSelected(data: any): boolean {
    return this.tableParams.selected.some((item) => item.id === data.id);
  }

  // ------------------------------------
  // 4. handleClickSelectAll: 处理全选/取消全选
  // ------------------------------------
  public handleClickSelectAll(): void {
    const allRows = this.tableParams.data;
    if (this.canSelectAll) {
      const currentPageIds = new Set(allRows.map((item) => item.id));
      this.tableParams.selected = this.tableParams.selected.filter((item) => !currentPageIds.has(item.id));
    } else {
      const selectedIds = new Set(this.tableParams.selected.map((item) => item.id));
      allRows.forEach((item) => {
        if (!this.itemSelectDisable(item) && !selectedIds.has(item.id)) {
          (this.tableParams.selected as any[]).push(item);
        }
      });
    }
  }

  // ------------------------------------
  // 5. handleClickSelectItem: 处理单行选中/取消选中
  // ------------------------------------
  public handleClickSelectItem(val: boolean, data: any): void {
    const index = this.tableParams.selected.findIndex((item) => item.id === data.id);
    if (val) {
      if (index === -1) {
        (this.tableParams.selected as any[]).push(data);
      }
    } else {
      if (index !== -1) {
        this.tableParams.selected.splice(index, 1);
      }
    }
  }

  // ------------------------------------
  // 3. canSelectAll: 计算全选/部分选状态
  // ------------------------------------
  public get canSelectAll(): boolean | null {
    const allRows = this.tableParams.data;
    if (!allRows.length) return false;
    const enabledRows = allRows.filter((item) => !this.itemSelectDisable(item));
    if (enabledRows.length === 0) return false;
    const selectedEnabledRows = enabledRows.filter(this.isItemSelected);
    if (selectedEnabledRows.length === 0) return false;
    if (selectedEnabledRows.length === enabledRows.length) {
      return true;
    }
    return null;
  }
}
