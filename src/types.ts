// Type definitions for jqTool
import type * as toolUtils from './utils/tool';
import type { val2Str, valSplit, dataCvSize, obj2Arr } from './components/j-q-dialog/form';
import type { transformTreeUseLabelAndValue } from './components/j-c-tree/index';
import type { generateDownloadFileName, JQDownloadFile } from './components/j-q-file/download';
import type { formRules } from './components/j-q-dialog/index';

export interface JQToolType extends Record<string, any> {
  transformTreeUseLabelAndValue: typeof transformTreeUseLabelAndValue;
  JQDownloadFile: typeof JQDownloadFile;
  generateDownloadFileName: typeof generateDownloadFileName;
  formRules: typeof formRules;
  formUtils: {
    val2Str: typeof val2Str;
    valSplit: typeof valSplit;
    dataCvSize: typeof dataCvSize;
    obj2Arr: typeof obj2Arr;
  };
  // Tool utils
  defaultFill: typeof toolUtils.defaultFill;
  formatSize: typeof toolUtils.formatSize;
  getUpperSize: typeof toolUtils.getUpperSize;
  defaultFormat: typeof toolUtils.defaultFormat;
  formatDate: typeof toolUtils.formatDate;
  defaultDateFormat: typeof toolUtils.defaultDateFormat;
  defaultDataFormat: typeof toolUtils.defaultDataFormat;
  defaultAutoDataFormat: typeof toolUtils.defaultAutoDataFormat;
}

