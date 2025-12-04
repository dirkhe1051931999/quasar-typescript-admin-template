/**
 * @function downloadFile
 * @description 根据文件内容(Blob/Buffer)在浏览器中触发下载。
 * @param {Blob | ArrayBuffer | string} result 文件的内容（通常是后端返回的 Blob 或 ArrayBuffer）。
 * @param {string} downloadFileName 包含后缀的完整文件名，例如 'report_data.xlsx'。
 */
export const JQDownloadFile = (result: any, downloadFileName: string) => {
  const decodedFileName = window.decodeURI(downloadFileName);

  // 2. 直接使用传入的 result 创建 Blob 对象
  // 假设 result 是后端返回的 Blob 对象或 ArrayBuffer。
  // 如果 result 已经是 Blob，这一步是安全的，或者可以根据实际情况调整 result 的类型。
  const blob = new Blob([result]);

  // 3. 检查浏览器是否支持 'download' 属性（非IE/Edge Chromium之前）
  if ('download' in document.createElement('a')) {
    // 创建隐藏的下载链接元素
    const elink = document.createElement('a');

    // 设置下载文件名
    elink.download = decodedFileName;
    elink.style.display = 'none';

    // 创建一个临时的 URL 指向 Blob
    elink.href = window.URL.createObjectURL(blob);

    // 触发下载
    document.body.appendChild(elink);
    elink.click();

    // 清理：释放创建的对象URL和移除元素
    window.URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  } else {
  }
};

/**
 * @function generateDownloadFileName
 * @description 组合基础文件名、时间戳和后缀，生成完整的下载文件名。
 * @param {string} baseName 文件基础名，例如 'template'。
 * @param {string} fileExtension 文件后缀，例如 'xlsx'。
 * @returns {string} 组合后的文件名，例如 'template_20251126103000.xlsx'
 */
export const generateDownloadFileName = (baseName: string, fileExtension: string): string => {
  const now = new Date();

  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0'),
  ].join('');

  return `${baseName}_${timestamp}.${fileExtension.toLowerCase()}`;
};
