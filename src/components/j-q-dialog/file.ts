import globalMessage from 'components/j-q-message';

export function beforeFileEnter(files: File[], t: any) {
  const file = files[0];
  if (5 < file.size / Math.pow(1024, 5)) {
    globalMessage.show({
      content: t('messages.maxFileSizeIs', { max: 5 }),
      type: 'error',
    });
    return;
  }
  const format = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (['.xls', '.xlsx'].indexOf(format) === -1) {
    globalMessage.show({
      content: t('messages.unsupportFileFormat'),
      type: 'error',
    });
    return;
  }
  return files;
}