<template>
  <div class="block ellipsis" v-tooltip :style="contentStyle">
    {{ content }}
    <q-tooltip :class="toolTipClass" anchor="top middle" self="bottom middle" max-width="300px">
      {{ content }}
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import { AppModule } from 'src/store/modules/app';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SQTooltip',
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

  setup() {
    const toolTipClass = computed(() => {
      return AppModule.toolTipClass;
    });

    return {
      toolTipClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.block {
  display: block;
}

.hide-tooltip {
  z-index: -1 !important;
}
</style>