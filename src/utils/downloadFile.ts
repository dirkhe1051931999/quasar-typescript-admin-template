import setting from 'src/setting.json';
export const downloadFile = (
  result: any,
  downloadFileName: string,
  downloadFileType?: string
) => {
  downloadFileName = window.decodeURI(downloadFileName);
  const reader: any = new FileReader();
  reader.readAsBinaryString(result);
  reader.addEventListener('loadend', () => {
    const content = result;
    const blob = new Blob([content]);
    const timestamp = new Date().valueOf();
    // filetype 存在 就是自定义名字，否则就是从header头获取
    const fileName = downloadFileType
      ? `${setting.title.replace(
          /\s/gi,
          '_'
        )}_${timestamp}_${downloadFileName}${downloadFileType}`
      : downloadFileName;
    if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a');
      elink.download = fileName;
      elink.style.display = 'none';
      elink.href = window.URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      window.URL.revokeObjectURL(elink.href);
      document.body.removeChild(elink);
    } else {
      // IE10+下载
      // navigator.msSaveBlob(blob, fileName);
    }
  });
};
