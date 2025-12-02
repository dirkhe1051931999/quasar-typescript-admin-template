<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" transition-show="jump-up" transition-hide="jump-down" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center no-wrap">
        <div class="title">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none content">
        {{ content }}
      </q-card-section>
      <q-card-section class="row q-gutter-sm justify-end">
        <q-btn outline :label="computedCancelText" @click="onCancelClick" no-caps :ripple="false" style="min-width: 80px" />
        <q-btn color="primary" :label="computedConfirmText" @click="onOKClick" no-caps :ripple="false" unelevated style="min-width: 80px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

export default defineComponent({
  name: 'dialogConfirmComponent',
  emits: [...useDialogPluginComponent.emits],
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    confirmText: { type: String, default: '' },
    cancelText: { type: String, default: '' },
  },
  setup(props) {
    const { t } = useI18n();
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const computedConfirmText = computed(() => {
      return props.confirmText || t('action.confirm');
    });
    const computedCancelText = computed(() => {
      return props.cancelText || t('action.cancel');
    });

    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK();
      },
      onCancelClick: onDialogCancel,
      computedCancelText,
      computedConfirmText,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
}
</style>