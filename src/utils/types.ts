import { IGlobalConfirm } from './dialogConfirm';
import { IGlobalMessage } from './notify';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $globalMessage: IGlobalMessage;
    $globalConfirm: IGlobalConfirm;
    defaultFill: (data: any) => string;
    parseTime: (data: number | string | null | undefined) => string;
  }
}
export {};
