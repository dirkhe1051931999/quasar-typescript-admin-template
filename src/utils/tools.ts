export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = '';
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVariableName);
  } catch (error) {
    console.error(error);
  }
  return cssVariableValue;
};
// loadBdScript
export function loadBdScript(
  scriptId: string,
  url: string,
  callback: () => void
) {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  script.id = scriptId;
  document.getElementsByTagName('head')[0].appendChild(script);
}
export function defaultFill(val: any) {
  if (!!!val) return '--';
  else return val;
}
