import globalMessage from 'components/j-q-message';
import { useI18n } from 'src/composables/useI18n.ts';

export type IEnterFileType = {
  size: number;
  type: string[];
};

export function beforeFileEnter(files: File[], config: IEnterFileType = { size: 5, type: ['xls', 'xlsx'] }) {
  const file = files[0];
  const { size, type } = config;
  const { t } = useI18n();
  if (size < file.size / Math.pow(1024, size)) {
    globalMessage.show({
      content: t('messages.jQFile.maxFileSizeIs', { max: size }),
      type: 'error',
    });
    return;
  }
  let format = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  format = format.replace('.', '');
  if (type.indexOf(format) === -1) {
    globalMessage.show({
      content: t('messages.jQFile.unsupportFileFormat'),
      type: 'error',
    });
    return;
  }
  return files;
}