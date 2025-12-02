<template>
  <div class="j-q-file">
    <q-field v-model="computedValue" borderless dense :disable="disable" no-error-icon :rules="rules" hide-bottom-space>
      <template #prepend>
        <div
          class="file-action"
          :class="{ 'file-action--dragging': isDragging }"
          @dragenter.prevent="dragenter"
          @dragover.prevent="dragover"
          @dragleave.prevent="dragleave"
          @drop.prevent="dropFile"
          @click="browseFile"
          v-show="computedValue.length !== Number(maxlength)"
        >
          <q-icon class="action-icon" name="app:upload" size="32px" />
          <p class="fs-14 q-mt-sm">
            {{ t('messages.jQFile.click_or_drag_file') }}
          </p>
          <p class="text-grey fs-12 q-mt-xs">
            {{ t('messages.jQFile.file_type_is', { type: accept!.split(',').join(' ') }) }},
            {{
              t('messages.jQFile.max_file_size', {
                size: maxFileSize,
              })
            }}
          </p>
        </div>
        <ul v-show="computedValue.length" class="file-filers">
          <li v-for="(filer, index) in computedValue" :key="index" class="filer-item">
            <div class="filer-content">
              <div class="filer-name text-black" :title="filer.name">{{ filer.name }}</div>
              <div v-if="filer.size" class="filer-size">{{ getFileSizeDisplay(filer) }}</div>
            </div>
            <q-btn class="filer-remove" dense flat icon="close" round size="sm" @click="deleteFile(filer, index)" />
          </li>
        </ul>
      </template>
      <input v-show="false" ref="fileInputRef" :accept="accept" :multiple="!computedMaxlength || 1 < computedMaxlength - computedValue.length" type="file" @change="inputFile" />
    </q-field>
    <div v-if="hasSlotHint" class="file-hint">
      <slot name="hint"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType, SlotsType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { QField, QIcon, QBtn } from 'quasar';
import type { QFieldProps } from 'quasar';
import { getUpperSize } from 'src/utils/tool';
import globalMessage from 'src/components/j-q-message';
import { useI18n } from 'src/composables/useI18n';

type TModelValue = File[];
type TChangeFnReturn = File[] | void;
type TChangeFn = (files: File[]) => TChangeFnReturn | Promise<TChangeFnReturn>;

export default defineComponent({
  name: 'JQFile',
  components: {
    QField,
    QIcon,
    QBtn,
  },
  props: {
    modelValue: { type: Array as PropType<TModelValue> },
    accept: { type: String as PropType<HTMLInputElement['accept']> },
    beforeHandle: { type: Function as PropType<TChangeFn> },
    disable: { type: Boolean as PropType<QFieldProps['disable']> },
    maxlength: { type: [String, Number] },
    rules: { type: Array as () => QFieldProps['rules'] },
    maxFileSize: { type: String, default: '2 MB' },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: Object as SlotsType<{ hint: void }>,
  setup(props, { emit, slots }) {
    const { t } = useI18n();

    const fileInputRef = ref<HTMLInputElement | null>(null);

    // --- 状态管理 (保留 innerValue 用于内部修改) ---
    const innerValue = ref<TModelValue>(props.modelValue ?? []);

    // 简化 v-model 逻辑：移除冗余 watch
    const computedValue = computed<TModelValue>({
      get() {
        return (props.modelValue as TModelValue | undefined) ?? innerValue.value ?? [];
      },
      set(val) {
        emit('update:modelValue', val);
        innerValue.value = val;
      },
    });

    const isDragging = ref(false);
    const computedMaxlength = computed(() => Number(props.maxlength) || 0);
    const isMaxlength = computed(() => computedMaxlength.value > 0 && computedMaxlength.value <= computedValue.value.length);

    // 提取文件列表的通用函数
    const extractFiles = (fileList: FileList | null | undefined): File[] => {
      if (!fileList?.length) return [];
      return Array.from(fileList);
    };

    const handleFiles = async (files: File[]) => {
      // 1. 强制执行 Maxlength 限制
      const currentCount = computedValue.value.length;
      const remainingSlots = computedMaxlength.value - currentCount;
      let filesToProcess = [...files];

      if (computedMaxlength.value > 0 && remainingSlots <= 0) {
        // 达到上限，建议在此处显示通知
        globalMessage.show({ type: 'error', content: t('messages.jQFile.maxlength', { count: computedMaxlength.value }) });
        return;
      }
      if (computedMaxlength.value > 0 && filesToProcess.length > remainingSlots) {
        // 截断文件列表
        filesToProcess = filesToProcess.slice(0, remainingSlots);
        // 建议在此处显示通知
      }

      if (props.beforeHandle) {
        // 异步/同步处理
        const processedFiles = await props.beforeHandle(filesToProcess);
        if (processedFiles) {
          computedValue.value = [...computedValue.value, ...processedFiles];
        }
      } else {
        // 默认行为：追加
        computedValue.value = [...computedValue.value, ...filesToProcess];
      }
    };

    const browseFile = () => {
      fileInputRef.value?.click();
    };

    const inputFile = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const filers = extractFiles(target.files);
      if (filers.length) {
        handleFiles(filers);
      }
      target.value = '';
    };

    const dropFile = (e: DragEvent) => {
      isDragging.value = false;
      const filers = extractFiles(e.dataTransfer?.files);
      if (filers.length) {
        handleFiles(filers);
      }
    };

    // --- 拖拽事件 ---
    const dragenter = () => {
      isDragging.value = true;
    };
    const dragover = () => {
      isDragging.value = true;
    };
    const dragleave = () => {
      isDragging.value = false;
    };

    const getFileSizeDisplay = (filer: File) => {
      const { size, unit } = getUpperSize({ size: filer.size });
      return `${size.toLocaleString()} ${unit}`;
    };

    const deleteFile = (filer: File, index: number) => {
      const tempValue = [...computedValue.value];
      tempValue.splice(index, 1);
      computedValue.value = tempValue;
    };

    const hasSlotHint = computed(() => Reflect.has(slots, 'hint'));

    return {
      t,
      fileInputRef,
      computedValue,
      computedMaxlength,
      isDragging,
      isMaxlength,
      browseFile,
      inputFile,
      dragenter,
      dragover,
      dragleave,
      dropFile,
      getFileSizeDisplay,
      deleteFile,
      hasSlotHint,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>
