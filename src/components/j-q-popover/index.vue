<template>
  <div class="inline-block">
    <slot></slot>
    <q-popup-proxy ref="popupRef" :offset="[12, 12]">
      <q-card class="j-q-popover" flat :style="popoverStyle">
        <q-card-section class="q-pa-sm">
          <slot name="content">
            <span class="text-body2 text-grey">{{ title }}</span>
          </slot>
        </q-card-section>
      </q-card>
    </q-popup-proxy>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type SlotsType, onBeforeUnmount, onMounted, ref } from 'vue';
import { QPopupProxy, QCard, QCardSection } from 'quasar';

export default defineComponent({
  name: 'JQPopover',
  components: {
    QPopupProxy,
    QCard,
    QCardSection,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: 200,
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (val: string) => ['click', 'hover'].includes(val),
    },
  },
  slots: Object as SlotsType<{
    default: void;
    content: void;
  }>,
  setup(props) {
    const popupRef: any = ref(null);
    const rootRef: any = ref(null);

    const popoverStyle = computed(() => {
      let w = props.width;
      if (typeof w === 'number') {
        w = `${w}px`;
      }
      return {
        minWidth: w,
      };
    });

    const handleClick = () => {
      if (props.trigger === 'click' && popupRef.value) {
        popupRef.value.toggle();
      }
    };

    const handleMouseEnter = () => {
      if (props.trigger === 'hover' && popupRef.value) {
        popupRef.value.show();
      }
    };

    const handleMouseLeave = () => {
      if (props.trigger === 'hover' && popupRef.value) {
        popupRef.value.hide();
      }
    };

    onMounted(() => {
      const rootEl = rootRef.value?.$el || document.querySelector('.inline-block');

      if (!rootEl) return;

      if (props.trigger === 'click') {
        rootEl.addEventListener('click', handleClick);
      } else if (props.trigger === 'hover') {
        rootEl.addEventListener('mouseenter', handleMouseEnter);
        rootEl.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    onBeforeUnmount(() => {
      const rootEl = rootRef.value?.$el || document.querySelector('.inline-block');

      if (!rootEl) return;

      if (props.trigger === 'click') {
        rootEl.removeEventListener('click', handleClick);
      } else if (props.trigger === 'hover') {
        rootEl.removeEventListener('mouseenter', handleMouseEnter);
        rootEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    });

    return {
      popupRef,
      rootRef,
      popoverStyle,
    };
  },
});
</script>

<style scoped lang="scss">
.j-q-popover {
  max-width: 400px;
  border-radius: 4px;
  box-shadow: 0px 4px 8px 0px #d7dbec;
}
</style>