<template>
  <div class="inline-block">
    <slot></slot>
    <q-popup-proxy ref="popupRef">
      <q-card class="j-q-confirm" flat>
        <q-card-section class="row items-center q-pa-none">
          <span class="text-subtitle2 title">{{ title }}</span>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-none" style="padding: 0; margin-top: 8px">
          <q-btn flat :label="computedCancelText" color="black" v-close-popup dense size="12px" />
          <q-btn :label="computedConfirmText" color="primary" @click="handleConfirm" dense size="12px" />
        </q-card-actions>
      </q-card>
    </q-popup-proxy>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'src/composables/useI18n.ts';

export default defineComponent({
  name: 'JQConfirm',
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
  setup(props, { emit }) {
    const { t } = useI18n();
    const popupRef: any = ref(null);

    // 计算属性：如果没有传入confirmText，则使用i18n的默认值
    const computedConfirmText = computed(() => {
      return props.confirmText || t('action.confirm');
    });

    // 计算属性：如果没有传入cancelText，则使用i18n的默认值
    const computedCancelText = computed(() => {
      return props.cancelText || t('action.cancel');
    });

    const handleConfirm = () => {
      popupRef.value.hide();
      emit('confirm');
    };

    return {
      popupRef,
      handleConfirm,
      computedConfirmText,
      computedCancelText,
    };
  },
});
</script>

<style scoped lang="scss">
/* Optional styling if needed */
.title {
  max-width: 200px;
  font-size: 13px;
}

.j-q-confirm {
  min-width: 150px;
  padding: 12px;
}
</style>