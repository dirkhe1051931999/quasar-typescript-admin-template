<template>
  <q-dialog
    :class="['j-q-dialog', { 'right-panel': position === 'right' }]"
    v-model="visible"
    :allow-focus-outside="allowFocusOutside"
    :no-backdrop-dismiss="!closeOnMask"
    :no-esc-dismiss="!closeOnEsc"
    :position="position"
    @hide="destroy"
    :persistent="persistent"
    :full-height="position === 'right'"
    :transition-show="position === 'right' ? 'slide-left' : 'jump-down'"
    :transition-hide="position === 'right' ? 'slide-right' : 'jump-up'"
  >
    <q-card class="dialog-main" :style="computedDialogWidth">
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
            <q-card-section class="dialog-body" :style="{ 'min-height': typeof minHeight === 'string' ? minHeight : `${minHeight}px` }">
              <component v-if="component" :is="component" v-bind="computedComponentBind" v-on="componentOn" ref="dynamicCompRef" />
              <slot />
            </q-card-section>
            <q-card-section v-if="showFooter" class="q-pa-none dialog-footer">
              <q-btn :label="$t(cancelText)" unelevated no-caps @click="handleClickCancel" outline />
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
import { computed, defineComponent, getCurrentInstance, type PropType, ref } from 'vue';
import { DialogProvider } from './index';
import { formRules } from './form-rules';
import { useI18n } from 'vue-i18n';

type DialogPosition = 'standard' | 'right' | 'top' | 'bottom' | 'left';

export default defineComponent({
  name: 'jQDialog',
  props: {
    allowFocusOutside: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    component: {},
    componentBind: { type: Object },
    componentOn: { type: Object },
    closeOnEsc: { type: Boolean, default: true },
    closeOnMask: { type: Boolean, default: true },
    dialogId: { type: String },
    position: { type: String as PropType<DialogPosition>, default: 'standard' },
    showHeader: { type: Boolean, default: true },
    title: { type: String },
    maxWidth: { type: [String, Number] as PropType<string | number> },
    minHeight: { type: [String, Number] as PropType<string | number>, default: 320 },
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
    const { t } = useI18n();
    const rules = formRules(t);
    const computedComponentBind = computed(() => ({
      ...props.componentBind,
      dialogInstance: { open, close, setLoading, changeCancelText, changeConfirmText, rules },
    }));
    const computedDialogWidth = computed(() => {
      return props.maxWidth && props.position === 'standard'
        ? {
            'max-width': typeof props.maxWidth === 'string' ? props.maxWidth : `${props.maxWidth}px`,
            width: typeof props.maxWidth === 'string' ? props.maxWidth : `${props.maxWidth}px`,
          }
        : {};
    });
    const persistent = computed(() => {
      return getDataLoading.value;
    });
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
    expose({ open, close, setLoading, changeCancelText, changeConfirmText, rules });
    return {
      persistent,
      dynamicCompRef,
      cancelText,
      confirmText,
      visible,
      getDataLoading,
      computedComponentBind,
      computedDialogWidth,
      open,
      close,
      destroy,
      handleClickCancel,
      handleClickConfirm,
      rules,
    };
  },
});
</script>
<style lang="scss" scoped>
@use './index';
</style>