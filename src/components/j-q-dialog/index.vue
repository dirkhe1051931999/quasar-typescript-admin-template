<template>
  <q-dialog
    :class="['j-q-dialog', { 'right-panel': position === 'right' }]"
    v-model="visible"
    :allow-focus-outside="allowFocusOutside"
    :no-backdrop-dismiss="!closeOnMask"
    :no-esc-dismiss="!closeOnEsc"
    :position="position"
    @hide="destroy"
    :full-height="position === 'right'"
    :transition-show="position === 'right' ? 'slide-left' : 'jump-down'"
    :transition-hide="position === 'right' ? 'slide-right' : 'jump-up'"
  >
    <q-card class="dialog-main">
      <div class="loading-mask" v-show="getDataLoading">
        <q-inner-loading :showing="getDataLoading" :label="$t('action.loading')" color="primary" label-class="text-primary text-weight-medium" spinner-color="white"></q-inner-loading>
      </div>
      <q-card-section v-if="showHeader" class="dialog-header q-pa-none">
        <div class="dialog-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <q-btn class="dialog-close" v-close-popup icon="close" dense flat round />
      </q-card-section>
      <Suspense>
        <template #default>
          <div>
            <q-card-section class="dialog-body">
              <component v-if="component" :is="component" v-bind="computedComponentBind" v-on="componentOn" ref="dynamicCompRef" />
              <slot />
            </q-card-section>
            <q-card-section v-if="showFooter" class="q-pa-none dialog-footer">
              <q-btn :label="$t(cancelText)" outline no-caps @click="handleClickCancel" />
              <q-btn :label="$t(confirmText)" color="primary" :ripple="false" unelevated no-caps @click="handleClickConfirm" />
            </q-card-section>
          </div>
        </template>
        <template #fallback>
          <q-card-section>
            <div class="async-component-loading-mask">
              <q-inner-loading :showing="true" :label="$t('action.loading')" color="primary" label-class="text-primary text-weight-medium" spinner-color="white" />
            </div>
          </q-card-section>
        </template>
      </Suspense>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref } from 'vue';
import { DialogProvider } from './index';

export default defineComponent({
  name: 'SQDialog',
  props: {
    allowFocusOutside: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    component: {},
    componentBind: { type: Object },
    componentOn: { type: Object },
    closeOnEsc: { type: Boolean, default: true },
    closeOnMask: { type: Boolean, default: true },
    dialogId: { type: String },
    position: { type: String, default: 'standard' },
    showHeader: { type: Boolean, default: true },
    title: { type: String },
    width: { type: String, default: 'auto' },
  },
  emits: {},
  mounted() {},
  setup(props, { emit, expose }) {
    const visible = ref(false);
    const cancelText = ref('action.cancel');
    const confirmText = ref('action.confirm');
    const getDataLoading = ref(false);
    const dynamicCompRef = ref(null);
    const currentDialogInstance = getCurrentInstance();
    const computedComponentBind = computed(() => ({
      ...props.componentBind,
      dialogInstance: { open, close, setLoading, changeCancelText, changeConfirmText },
    }));
    const changeCancelText = (text: string) => {
      cancelText.value = text;
    };
    const changeConfirmText = (text: string) => {
      confirmText.value = text;
    };
    const handleClickCancel = () => {
      (currentDialogInstance?.refs?.dynamicCompRef as any).handleClickCancel && (currentDialogInstance?.refs?.dynamicCompRef as any).handleClickCancel();
      if (!(currentDialogInstance?.refs?.dynamicCompRef as any).handleClickCancel) {
        close();
      }
    };
    const handleClickConfirm = () => {
      (currentDialogInstance?.refs?.dynamicCompRef as any).handleClickConfirm && (currentDialogInstance?.refs?.dynamicCompRef as any).handleClickConfirm();
    };
    const open = () => {
      visible.value = true;
    };
    const close = () => {
      visible.value = false;
    };
    const setLoading = (data: boolean) => {
      getDataLoading.value = data;
    };
    const destroy = () => {
      props.dialogId && DialogProvider.destroy(props.dialogId);
    };
    expose({ open, close, setLoading, changeCancelText, changeConfirmText });
    return {
      dynamicCompRef,
      cancelText,
      confirmText,
      visible,
      getDataLoading,
      computedComponentBind,
      open,
      close,
      destroy,
      handleClickCancel,
      handleClickConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
$dialog-base-width: 768px;
$dialog-max-width: 1024px;
.j-q-dialog {
  .dialog-main {
    width: $dialog-base-width;
    max-width: $dialog-base-width;
  }

  .dialog-header {
    display: flex;
    align-items: center;
    line-height: 1.5;
    padding: 0 16px;
    height: 56px;

    .dialog-title {
      font-weight: 600;
      font-size: 16px;
    }

    .dialog-close {
      min-width: 1.5em;
      height: 1.5em;
      min-height: 1.5em;
      font-size: 16px;
      margin-left: auto;

      :deep(.q-icon) {
        font-size: 16px;
      }
    }
  }

  .dialog-body {
    padding: 16px;
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 320px;
    max-height: 60vh;

    &::-webkit-scrollbar-thumb {
      background-color: rgba(144, 147, 153, 0.3);
      border-radius: 99999px;
      border: 5px solid transparent;
      background-clip: content-box;
    }

    &::-webkit-scrollbar {
      background: transparent;
    }

    &::-webkit-scrollbar:vertical {
      width: 16px;
    }

    &::-webkit-scrollbar:horizontal {
      height: 16px;
    }
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
    padding: 16px;
    height: 68px;
    box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;

    .q-btn {
      min-width: 80px;
    }
  }

  &.right-panel {
    .dialog-main {
      @media screen and (max-width: 1440px) {
        width: $dialog-base-width;
        max-width: $dialog-base-width;
      }
      @media screen and (min-width: 1441px) {
        width: $dialog-max-width;
        max-width: $dialog-max-width;
      }
    }

    .dialog-body {
      height: calc(100vh - 56px - 68px);
      max-height: calc(100vh - 56px - 68px);
    }
  }

  .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
  }

  .async-component-loading-mask {
    min-height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}
</style>
