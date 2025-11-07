<template>
  <div class="inline-block">
    <slot></slot>
    <q-popup-proxy ref="popupRef">
      <q-card style="min-width: 150px; padding: 12px" flat>
        <q-card-section class="row items-center q-pa-none">
          <span class="text-subtitle2 title">{{ title }}</span>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-none" style="padding: 0; margin-top: 8px">
          <q-btn flat :label="$t('action.cancel')" color="black" v-close-popup dense size="12px" />
          <q-btn :label="$t('action.confirm')" color="primary" @click="handleConfirm" dense size="12px" />
        </q-card-actions>
      </q-card>
    </q-popup-proxy>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JQConfirm',
  props: {
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
  },
  emits: ['confirm'],
  setup(_props, { emit }) {
    const popupRef: any = ref(null);

    const handleConfirm = () => {
      popupRef.value.hide();
      emit('confirm');
    };

    return {
      popupRef,
      handleConfirm,
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
</style>