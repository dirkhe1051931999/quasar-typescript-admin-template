export function parseRuleString(ruleString: string): { name: keyof ReturnType<typeof formRules> | ''; args: any[] } {
  if (!ruleString) {
    return { name: '', args: [] };
  }
  const match = ruleString.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
  if (match) {
    const name = match[1] as keyof ReturnType<typeof formRules>;
    let args: any[] = [];
    if (match[2]) {
      args = match[2].split(',').map((arg) => {
        const trimmedArg = arg.trim();
        const num = Number(trimmedArg);
        return isNaN(num) ? trimmedArg : num;
      });
    }
    return { name, args };
  }
  return { name: ruleString as keyof ReturnType<typeof formRules>, args: [] };
}

export function executeValidation(ruleName: keyof ReturnType<typeof formRules>, value: string, ruleArgs: any[] = [], t: any): true | string {
  const allRules = formRules(t);
  const ruleDef = allRules[ruleName];
  if (!ruleDef) {
    console.warn(`Rule '${ruleName}' not found in formRules.`);
    return true;
  }

  let validationFunctions: ((val: any) => true | string)[] = [];

  if (Array.isArray(ruleDef)) {
    validationFunctions = ruleDef;
  } else if (typeof ruleDef === 'function') {
    const result = (ruleDef as any)(...ruleArgs);

    if (Array.isArray(result)) {
      validationFunctions = result;
    } else {
      console.error(`[JQSelectNewValue] Rule '${ruleName}' function did not return an array of validation functions.`);
      return true;
    }
  }

  for (const validateFn of validationFunctions) {
    const result = validateFn(value);
    if (result !== true) {
      return result;
    }
  }
  return true;
}

export function formRules(t: any) {
  return {
    required: [
      (val?: any) => {
        const isEmptyArray = Array.isArray(val) && val.length === 0;
        const isFalsey = val === null || val === undefined || val === '';
        return (!isEmptyArray && !isFalsey) || t('formRules.required');
      },
    ],
    arrMaxLength(max: number) {
      return [
        (val?: any) => {
          if (Array.isArray(val) && val.length > max) {
            return t('formRules.arrMaxLength', { max });
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
            return t('formRules.percentageInvalid');
          }
          const numVal = parseFloat(strVal);
          if (!includesZero && numVal === 0) {
            return t('formRules.over0');
          }
          if (!includesHundred && numVal === 100) {
            return t('formRules.less100');
          }
          return true;
        },
      ];
    },
    file: [(val?: any) => !!val?.length || t('formRules.required')],
    addressRules(types: ('url' | 'domain' | 'ip' | 'ip-port' | 'path')[] = ['url', 'domain', 'ip', 'ip-port'], required: boolean = true) {
      // 正则表达式定义
      const regex = {
        // 1. 完整的 URL (包括协议、域名、路径)
        url: new RegExp(/^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$/i),
        // 2. 域名 (www.example.com, example.com)
        domain: new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))*$/),
        // 3. 仅 IP 地址 (IPv4)
        ip: new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/),
        // 4. IP:Port (1.1.1.1:8080)
        ipPort: new RegExp(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
        ),
        // 5. 相对或绝对路径 (/test/cmp/here, test/cmp/here)
        path: new RegExp(/^((\/|\\)?[a-zA-Z0-9_\-.]+(\/|\\)?)+$/),
      };

      const exampleAddress: any = {
        url: 'https://example.com',
        domain: 'example.com',
        ip: '1.1.1.1',
        ipPort: '1.1.1.1:8080',
        path: '/test/example',
      };

      const validationRule = (val?: any) => {
        const strVal = String(val || '').trim();
        if (!strVal) return true; // 空值校验留给 required 规则处理
        let example = '';

        const isMatch = types.some((type) => {
          switch (type) {
            case 'url':
              example = exampleAddress.url;
              return regex.url.test(strVal);
            case 'domain':
              example = exampleAddress.domain;
              return regex.domain.test(strVal);
            case 'ip':
              if (strVal.includes(':')) return false;
              example = exampleAddress.ip;
              return regex.ip.test(strVal);
            case 'ip-port':
              example = exampleAddress['ipPort'];
              return regex.ipPort.test(strVal);
            case 'path':
              example = exampleAddress.path;
              return regex.path.test(strVal);
            default:
              return false;
          }
        });

        if (!isMatch) {
          return t('formRules.addressInvalid', {
            example,
          });
        }
        return true;
      };

      const rules = [validationRule];

      if (required) {
        rules.unshift((val?: any) => {
          const isEmptyArray = Array.isArray(val) && val.length === 0;
          const isFalsey = val === null || val === undefined || val === '';
          return (!isEmptyArray && !isFalsey) || t('formRules.required');
        });
      }

      return rules;
    },
    email: [
      (val?: any) => {
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gi;
        return reg.test(val) ? true : t('formRules.emailInvalid');
      },
    ],
    port: [
      (val?: any) => {
        const reg = /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        return reg.test(String(val)) || t('formRules.invalidPort');
      },
    ],
    rangeInt(min: number, max: number) {
      return [
        (val?: any) => {
          val = Number(val);
          const isInt = Number.isInteger(val);
          const isInRange = val >= min && val <= max;
          return (isInt && isInRange) || t('formRules.rangeInt', { min, max });
        },
      ];
    },
    rangeNumber(min: number, max: number) {
      return [
        (val?: any) => {
          val = Number(val);
          const isInRange = val >= min && val <= max;
          return isInRange || t('formRules.rangeNumber', { min, max });
        },
      ];
    },
    positiveInteger: [
      (val?: any) => {
        val = Number(val);
        const isInt = Number.isInteger(val);
        const isPositive = val > 0;
        return (isInt && isPositive) || t('formRules.positiveInt');
      },
    ],
  };
}
