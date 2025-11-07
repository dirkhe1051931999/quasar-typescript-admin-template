<template>
  <div class="j-q-form-label" :class="{ 'form-label--vertical': vertical, required: required }">
    <div v-if="showLabel" class="form-label" :class="[labelClass, { required: required }]">
      {{ label }}
      <slot name="label-hint"></slot>
    </div>

    <div class="form-value" :class="valueClass">
      <div class="form-value__inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';

// 假设 Vue class 绑定可以是 string, object, 或 array
type VueClass = string | Record<string, boolean> | (string | Record<string, boolean>)[];

export default defineComponent({
  name: 'JQFormLabel',
  props: {
    label: { type: String },
    labelClass: { type: [String, Object, Array] as PropType<VueClass> },
    valueClass: { type: [String, Object, Array] as PropType<VueClass> },
    vertical: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
  },
  slots: {
    default: void 0,
    'label-hint': void 0,
  },
  setup(props, { slots }) {
    const showLabel = computed(() => {
      return !!props.label || !!slots.label;
    });
    return {
      showLabel,
      slots,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>