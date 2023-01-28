import { VueI18n } from 'vue-i18n';
import { IGlobalConfirm } from './dialogConfirm';
import { IGlobalMessage } from './notify';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $globalMessage: IGlobalMessage;
    $globalConfirm: IGlobalConfirm;
    $t: any;
    $i18n: any;
    defaultFill: (data: any) => string;
    parseTime: (data: number | string | null | undefined) => string;
  }
  // export interface Window {
  //   jsVectorMap: any;
  // }
}
export {};
