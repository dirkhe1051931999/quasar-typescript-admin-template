<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" transition-show="jump-up" transition-hide="jump-down" persistent>
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center no-wrap">
        <div class="title">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none content">
        {{ content }}
      </q-card-section>
      <q-card-section class="row q-gutter-md justify-end">
        <q-btn outline :label="$t('action.cancel')" @click="onCancelClick" no-caps :ripple="false" style="min-width: 80px" />
        <q-btn color="primary" :label="$t('action.confirm')" @click="onOKClick" no-caps :ripple="false" unelevated style="min-width: 80px" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'dialogConfirmComponent',
  emits: [...useDialogPluginComponent.emits],
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
  },
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
    return {
      dialogRef,
      onDialogHide,
      onOKClick() {
        onDialogOK();
      },
      onCancelClick: onDialogCancel,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  font-size: 20px;
}
</style>