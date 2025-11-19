<template>
  <div class="j-q-form-label" :class="[directionClass, { required: required }]">
    <div v-if="showLabel" class="form-label" :class="[labelClass, { required: required }]">
      {{ label }}
      <slot name="label-hint"></slot>
    </div>
    <div class="form-content">
      <div class="form-value" :class="valueClass">
        <div class="form-value__inner">
          <slot></slot>
        </div>
      </div>
      <div class="form-item-detail-wrapper">
        <slot name="form-item-detail"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';

type VueClass = string | Record<string, boolean> | (string | Record<string, boolean>)[];

export default defineComponent({
  name: 'JQFormLabel',
  props: {
    label: { type: String },
    labelClass: { type: [String, Object, Array] as PropType<VueClass> },
    valueClass: { type: [String, Object, Array] as PropType<VueClass> },
    vertical: { type: Boolean, default: false },
    horizontal: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  slots: {
    default: void 0,
    'label-hint': void 0,
    'form-item-detail': void 0,
  },
  setup(props, { slots }) {
    const showLabel = computed(() => {
      const hasContent = !!props.label || !!slots.label;
      if (props.horizontal) {
        return true;
      }
      return hasContent;
    });
    const directionClass = computed(() => {
      if (props.vertical) {
        return 'form-label--vertical';
      }
      if (props.horizontal) {
        return 'form-label--horizontal';
      }
      return 'form-label--vertical';
    });
    return {
      directionClass,
      showLabel,
      slots,
    };
  },
});
</script>

<style lang="scss">
@use './index';
</style>