<template>
  <div class="block ellipsis" v-j-q-tooltip :style="contentStyle">
    {{ content }}
    <q-tooltip :class="toolTipClass" anchor="top middle" self="bottom middle" max-width="300px">
      {{ content }}
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { QTooltip } from 'quasar';
import { tooltip, tooltipClass } from './tooltip';

export default defineComponent({
  name: 'jQTooltip',
  components: {
    QTooltip,
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    contentStyle: {
      type: String,
      default: 'width:100%',
    },
  },
  directives: {
    'j-q-tooltip': tooltip,
  },

  setup() {
    const toolTipClass = computed(() => {
      return tooltipClass.value;
    });

    return {
      toolTipClass,
    };
  },
});
</script>

<style lang="scss">
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hide-tooltip {
  z-index: -1 !important;
}
</style>
