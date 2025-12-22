// ============ Components ============
// j-c series
import JCCopy from './components/j-c-copy/index.vue';
import JCDuoListEditor from './components/j-c-duo-list-editor/index.vue';
import JCEditableProxy from './components/j-c-editable-proxy/index.vue';
import JCFallback from './components/j-c-fallback/index.vue';
import JCFoldableList from './components/j-c-foldable-list/index.vue';
import JCFormatLookup from './components/j-c-format-lookup/index.vue';
import JCListEditor from './components/j-c-list-editor/index.vue';
import JCMoreMenu from './components/j-c-more-menu/index.vue';
import JCPermission from './components/j-c-permission/index.vue';
import JCTabs from './components/j-c-tabs/index.vue';
import JCTitleLine from './components/j-c-title-line/index.vue';
import JCTree from './components/j-c-tree/index.vue';
import JCTreeSelect from './components/j-c-tree-select/index.vue';

// j-ch series (Charts) - 从独立入口导入
export { JChBar, JChBarLine, JChBubble, JChLine, JChPieDoughnut, JChRadar } from './charts';

// j-q series (Quasar)
import JQAutocomplete from './components/j-q-autocomplete/index.vue';
import JQConfirm from './components/j-q-confirm/index.vue';
import JQDate from './components/j-q-date/index.vue';
import JQDatetime from './components/j-q-datetime/index.vue';
import JQDetailList from './components/j-q-detail-list/index.vue';
import JQDialog from './components/j-q-dialog/index.vue';
import JQFile from './components/j-q-file/index.vue';
import JQFormLabel from './components/j-q-form-label/index.vue';
import JQInput from './components/j-q-input/index.vue';
import JQNewValue from './components/j-q-new-value/index.vue';
import JQOptionGroup from './components/j-q-option-group/index.vue';
import JQPopover from './components/j-q-popover/index.vue';
import JQSearchForm from './components/j-q-search-form/index.vue';
import JQSelect from './components/j-q-select/index.vue';
import JQTable from './components/j-q-table/index.vue';
import JQTooltip from './components/j-q-tooltip/index.vue';
import JQMessage from './components/j-q-message/index.ts';
import JQConfirmDialog from 'components/j-q-confirm-dialog/index.ts';
// Import all utility functions
import { transformTreeUseLabelAndValue } from './components/j-c-tree/index';
import { generateDownloadFileName, JQDownloadFile } from './components/j-q-file/download';
import * as toolUtils from './utils/tool';
import { formRules } from 'components/j-q-dialog/index.ts';

// ============ Utilities & Services ============
export { DialogProvider } from './components/j-q-dialog/index';
export { rtcptInit } from './utils/init';
export type { RtcptInitOptions, ColorConfig } from './utils/init';
export { rtcptIconMapFn, composeIconMapFn } from './utils/icon-map';
export type { IconMapFn } from './utils/icon-map';

// Export permission injection key
export { PAGE_PERMISSION_KEY, PAGE_ACTION_PERMISSION_KEY } from './components/j-c-permission/index.vue';

// Export as jqTool namespace
export const jqTool = {
  transformTreeUseLabelAndValue,
  JQDownloadFile,
  generateDownloadFileName,
  ...toolUtils,
  formRules,
};

// ============ i18n ============
export { useI18n, setLocale, getLocale } from './composables/useI18n';
export { t } from './composables/useI18n';
export type { Locale } from './i18n';

// ============ Components Export ============
export {
  JQMessage,
  JQConfirmDialog,
  // j-c series
  JCCopy,
  JCDuoListEditor,
  JCEditableProxy,
  JCFallback,
  JCFoldableList,
  JCFormatLookup,
  JCListEditor,
  JCMoreMenu,
  JCPermission,
  JCTabs,
  JCTitleLine,
  JCTree,
  JCTreeSelect,
  // j-q series
  JQAutocomplete,
  JQConfirm,
  JQDate,
  JQDatetime,
  JQDetailList,
  JQDialog,
  JQFile,
  JQFormLabel,
  JQInput,
  JQNewValue,
  JQOptionGroup,
  JQPopover,
  JQSearchForm,
  JQSelect,
  JQTable,
  JQTooltip,
};

// 注意: j-ch 图表组件已从 './charts' 导出，可以按需导入
