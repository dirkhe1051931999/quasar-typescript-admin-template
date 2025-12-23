<template>
  <div>
    <div class="title-line">
      <span>
        {{ label }}
        <span class="title-line__extra" v-if="hasSlot('default')">
          <slot />
        </span>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SlotsType } from 'vue';

export default defineComponent({
  name: 'JCTitleLine',
  props: {
    label: { type: String },
  },
  slots: Object as SlotsType<{
    default: void;
  }>,
  setup(props, { slots }) {
    const hasSlot = (slotName: string) => Reflect.has(slots, slotName);
    return {
      hasSlot,
    };
  },
});
</script>

<style lang="scss" scoped>
$color-white: var(--j-color-white);
$bg-grey: var(--j-color-grey-light);
.title-line {
  position: relative;

  span {
    padding-right: 10px;
    background-color: $color-white;
    z-index: 20;
    position: relative;
    font-size: 14px;
    font-weight: 600;
  }

  .title-line__extra {
    background-color: $color-white;
    position: relative;
    z-index: 20;
    font-weight: normal;
  }

  &:after {
    background-color: $bg-grey;
    content: '';
    height: 1px;
    margin-top: 10px;
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>