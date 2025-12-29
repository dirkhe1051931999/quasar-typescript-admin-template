<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" transition-show="jump-up" transition-hide="jump-down" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center no-wrap">
        <q-icon v-if="isDelete" name="app:delete-confirm" class="q-mr-sm" size="24px" />
        <div class="title">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none content">
        {{ content }}
      </q-card-section>
      <q-card-section class="row q-gutter-sm justify-end">
        <q-btn outline :label="computedCancelText" @click="onCancelClick" no-caps :ripple="false" style="min-width: 80px" />
        <q-btn :color="isDelete ? 'negative' : 'primary'" :label="computedConfirmText" @click="onOKClick" no-caps :ripple="false" unelevated style="min-width: 80px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useDialogPluginComponent, QDialog, QCard, QCardSection, QBtn, QIcon } from 'quasar';
import { useI18n } from 'src/composables/useI18n.ts';

export default defineComponent({
  name: 'dialogConfirmComponent',
  components: {
    QDialog,
    QCard,
    QCardSection,
    QBtn,
    QIcon,
  },
  emits: [...useDialogPluginComponent.emits],
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    confirmButtonText: { type: String, default: '' },
    cancelButtonText: { type: String, default: '' },
    isDelete: { type: Boolean, default: false },
  },
  setup(props) {
    const { t } = useI18n();
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    const computedConfirmText = computed(() => {
      return props.confirmButtonText || t('action.confirm');
    });
    const computedCancelText = computed(() => {
      return props.cancelButtonText || t('action.cancel');
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
