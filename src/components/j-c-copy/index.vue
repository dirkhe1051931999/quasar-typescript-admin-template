<template>
  <q-icon :name="iconName" size="16px" :color="iconColor" @click="handleCopy" class="cursor-pointer" />
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, ref } from 'vue';
import { copyToClipboard, QIcon } from 'quasar';

export default defineComponent({
  name: 'JCCopy',
  components: {
    QIcon,
  },
  props: {
    text: {
      type: [String, Number, Object] as PropType<any>,
      required: true,
    },
    revertDelay: {
      type: Number,
      default: 2000,
    },
  },
  setup(props) {
    const copied = ref(false);
    let timer: ReturnType<typeof setTimeout> | null = null;

    const iconName = computed(() => (copied.value ? 'check' : 'app:rt-copy'));

    const iconColor = computed(() => (copied.value ? 'grey' : undefined));

    const handleCopy = async () => {
      if (copied.value) {
        return;
      }

      try {
        await copyToClipboard(props.text);

        copied.value = true;

        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          copied.value = false;
          timer = null;
        }, props.revertDelay);
      } catch (error) {
        console.error('复制失败:', error);
      }
    };

    return {
      copied,
      iconName,
      iconColor,
      handleCopy,
    };
  },
});
</script>