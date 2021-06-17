export function defaultFill(val: any) {
  if (!!!val) return '--';
  else return val;
}
// loadBdScript
export function loadBdScript(scriptId: string, url: string, callback: () => void) {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    //IE
    script.onreadystatechange = function() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  script.id = scriptId;
  document.getElementsByTagName('head')[0].appendChild(script);
}
