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
  };
}
