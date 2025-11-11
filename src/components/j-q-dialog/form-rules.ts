export function formRules(t: any) {
  return {
    required: [
      (val?: any) => {
        const isEmptyArray = Array.isArray(val) && val.length === 0;
        const isFalsey = val === null || val === undefined || val === '';
        return (!isEmptyArray && !isFalsey) || t('messages.required');
      },
    ],
    arrMaxLength(max: number) {
      return [
        (val?: any) => {
          if (Array.isArray(val) && val.length > max) {
            return t('messages.arrMaxLength', { max });
          }
        },
      ];
    },
    percentageRules(boundary: ('left' | 'right')[] = ['left', 'right']) {
      const includesZero = boundary.includes('left');
      const includesHundred = boundary.includes('right');
      const formatRegex = /^(100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/;
      return [
        (val?: any) => {
          const strVal = String(val).trim();
          if (!formatRegex.test(strVal)) {
            return t('messages.percentageInvalid');
          }
          const numVal = parseFloat(strVal);
          if (!includesZero && numVal === 0) {
            return t('messages.over0');
          }
          if (!includesHundred && numVal === 100) {
            return t('messages.less100');
          }
          return true;
        },
      ];
    },
    file: [(val?: any) => !!val?.length || t('messages.required')],
  };
}