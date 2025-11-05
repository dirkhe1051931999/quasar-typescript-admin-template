<template>
  <q-field class="j-q-file" v-model="computedValue" borderless dense :disable="disable" no-error-icon :rules="rules">
    <template #prepend>
      <div
        class="file-action"
        :class="{ 'file-action--dragging': isDragging }"
        @dragenter.prevent="dragenter"
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="dropFile"
        @click="browseFile"
      >
        <q-icon class="action-icon" name="app:upload" size="24px" />
        <div class="text-black q-mt-sm">{{ t('jQFile.action') }}</div>
      </div>
      <ul v-show="computedValue.length" class="file-filers">
        <li v-for="(filer, index) in computedValue" :key="index" class="filer-item">
          <div class="filer-content">
            <div class="filer-name" :title="filer.name">{{ filer.name }}</div>
            <div v-if="filer.size" class="filer-size">{{ getFileSizeDisplay(filer) }}</div>
          </div>
          <q-btn class="filer-remove" dense flat icon="close" round size="sm" @click="deleteFile(filer, index)" />
        </li>
      </ul>
      <div v-if="hasSlotHint" class="file-hint">
        <slot name="hint"></slot>
      </div>
    </template>
    <input v-show="false" ref="fileInputRef" :accept="accept" :multiple="!computedMaxlength || 1 < computedMaxlength - computedValue.length" type="file" @change="inputFile" />
  </q-field>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { QFieldProps } from 'quasar';
import { getUpperSize } from 'src/utils/tools';
import globalMessage from 'src/components/j-q-message';

type TModelValue = File[];
type TChangeFnReturn = File[] | void;
type TChangeFn = (files: File[]) => TChangeFnReturn | Promise<TChangeFnReturn>;

export default defineComponent({
  name: 'JQFile',
  props: {
    modelValue: { type: Array as PropType<TModelValue> },
    accept: { type: String as PropType<HTMLInputElement['accept']> },
    beforeHandle: { type: Function as PropType<TChangeFn> },
    disable: { type: Boolean as PropType<QFieldProps['disable']> },
    maxlength: { type: [String, Number] },
    rules: { type: Array as () => QFieldProps['rules'] },
  },
  emits: {
    'update:modelValue': (value: TModelValue) => true,
  },
  slots: { hint: void 0 },
  setup(props, { emit, slots }) {
    const { t } = useI18n({
      messages: {
        'zh-CN': { jQFile: { action: '点击上传', maxlength: '最多上传{count}个文件' } },
        'en-US': { jQFile: { action: 'Click to upload', maxlength: 'Maximum {count} files can be uploaded' } },
      },
      useScope: 'local',
    });

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
        globalMessage.show({ type: 'error', content: t('jQFile.maxlength', { count: computedMaxlength.value }) });
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
.j-q-file {
  .q-field__control {
    flex-direction: column;
    line-height: 1.5;
  }

  .q-field__prepend {
    flex-direction: column;
    align-items: normal;
    height: auto;
    padding-right: 0;
    font-size: 14px;
  }

  .file-action {
    padding: 16px;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    text-align: center;
    transition: border-color 0.25s;
    cursor: pointer;

    &.file-action--dragging {
      border-style: dashed;
    }
  }

  .action-icon {
    font-size: 64px;
  }

  .file-action + .file-filers:not(:empty) {
    margin-top: 8px;
  }

  .file-filers {
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    list-style-type: none;
  }

  .filer-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 12px;

    .filer-content {
      flex: 1;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    .filer-size {
      color: #969799;
    }

    .filer-remove {
      min-width: 1.5em;
      height: auto;
      min-height: 1.5em;
      color: #969799;

      i {
        font-size: 1em;
      }
    }
  }

  .filer-item + .filer-item {
    margin-top: 4px;
  }

  .file-hint {
    margin-left: 0;
    color: #969799;

    .download-btn {
      .btn {
        color: $primary;
        cursor: pointer;
      }
    }

    .extra-info {
      display: flex;
      flex-direction: column;
      font-size: 12px;
    }

    &:not(:empty) {
      margin-top: 2px;
    }
  }
}

.j-q-file.q-field--error {
  .file-action {
    border-color: #e93030;
  }
}
</style>