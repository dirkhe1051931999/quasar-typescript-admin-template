<template>
  <div class="block" :class="ellipsisClass" v-j-q-tooltip:lines="lines" :style="computedStyle">
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
    lines: {
      type: Number,
      default: 1,
      validator: (value: number) => value > 0,
    },
  },
  directives: {
    'j-q-tooltip': tooltip,
  },

  setup(props) {
    const toolTipClass = computed(() => {
      return tooltipClass.value;
    });

    const ellipsisClass = computed(() => {
      return props.lines === 1 ? 'ellipsis' : 'ellipsis-multi';
    });

    const computedStyle = computed(() => {
      const baseStyle = props.contentStyle;
      if (props.lines > 1) {
        return `${baseStyle}; -webkit-line-clamp: ${props.lines};`;
      }
      return baseStyle;
    });

    return {
      toolTipClass,
      ellipsisClass,
      computedStyle,
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

.ellipsis-multi {
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.hide-tooltip {
  z-index: -1 !important;
}
</style>