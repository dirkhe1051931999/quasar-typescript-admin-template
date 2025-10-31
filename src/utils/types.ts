declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
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