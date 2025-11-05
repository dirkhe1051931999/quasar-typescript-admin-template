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
.j-q-form-label {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 4px 16px;
  line-height: 1.5;
  margin-bottom: 16px;

  &.required {
    margin-bottom: 4px;
  }

  // --- Form Label ---
  .form-label {
    display: flex;
    align-items: center;
    width: auto;
    font-size: 12px;
    color: #323232;

    // 必填星号逻辑
    &.required::before {
      content: '*';
      margin-right: 2px;
      color: #e93030;
    }
  }

  // --- Form Value ---
  .form-value {
    flex-grow: 1;
    flex-basis: auto;
    display: flex;
    align-items: center;
    min-width: 0;
    max-width: 100%;
    min-height: 40px;

    &__inner {
      flex: 1;
      min-width: 0;
    }
  }

  // --- 垂直布局修饰符 ---
  &.form-label--vertical {
    flex-direction: column;
    align-items: normal;

    .form-label {
      margin-bottom: 2px;
    }

    .form-value {
      flex-basis: auto;
    }
  }
}
</style>