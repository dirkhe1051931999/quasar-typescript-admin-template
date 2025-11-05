<template>
  <div>
    <p class="title-line">
      <span>
        {{ label }}
      </span>
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JCTitleLine',
  props: {
    label: { type: String },
  },
  slots: {
    default: void 0,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.title-line {
  font-weight: 600;
  position: relative;

  span {
    padding-right: 10px;
    background-color: #fff;
    z-index: 20;
    position: relative;
    font-size: 14px;
  }

  &:after {
    background-color: #ebebeb;
    content: '';
    height: 1px;
    margin-top: 10px;
    position: absolute;
    width: 100%;
    left: 0;
  }
}
</style>