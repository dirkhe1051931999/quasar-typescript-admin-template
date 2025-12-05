<template>
  <div class="inline-block">
    <slot></slot>
    <q-popup-proxy ref="popupRef">
      <q-card class="j-q-confirm" flat>
        <q-card-section class="row items-center q-pa-none">
          <span class="title">{{ title }}</span>
        </q-card-section>
        <div class="j-q-confirm-actions">
          <div class="j-q-confirm-btn j-q-confirm-btn--cancel" @click="handleCancel">
            {{ computedCancelText }}
          </div>
          <div class="j-q-confirm-btn j-q-confirm-btn--confirm" @click="handleConfirm">
            {{ computedConfirmText }}
          </div>
        </div>
      </q-card>
    </q-popup-proxy>
  </div>
</template>
<script lang="ts">
import { defineComponent, type SlotsType, ref, computed } from 'vue';
import { QPopupProxy, QCard, QCardSection } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

export default defineComponent({
  name: 'JQConfirm',
  components: {
    QPopupProxy,
    QCard,
    QCardSection,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
  },
  emits: ['confirm'],
  slots: Object as SlotsType<{
    default: void;
  }>,
  setup(props, { emit }) {
    const { t } = useI18n();
    const popupRef: any = ref(null);

    // 计算属性：如果没有传入 confirmText，则使用 i18n 的默认值
    const computedConfirmText = computed(() => {
      return props.confirmText || t('action.confirm');
    });

    // 计算属性：如果没有传入 cancelText，则使用 i18n 的默认值
    const computedCancelText = computed(() => {
      return props.cancelText || t('action.cancel');
    });

    const handleCancel = () => {
      popupRef.value.hide();
    };

    const handleConfirm = () => {
      popupRef.value.hide();
      emit('confirm');
    };

    return {
      popupRef,
      handleCancel,
      handleConfirm,
      computedConfirmText,
      computedCancelText,
    };
  },
});
</script>

<style scoped lang="scss">
.title {
  max-width: 200px;
  font-size: 13px;
}

.j-q-confirm {
  min-width: 200px;
  padding: 16px;
}

.j-q-confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.j-q-confirm-btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 56px;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &--cancel {
    background-color: var(--j-color-white);
    color: var(--j-color-dark);

    &:hover {
      background-color: var(--j-color-grey-lighter);
    }

    &:active {
      background-color: var(--j-color-grey-light);
    }
  }

  &--confirm {
    background-color: var(--j-color-primary);
    color: var(--j-color-white);
    border-color: var(--j-color-primary);

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>