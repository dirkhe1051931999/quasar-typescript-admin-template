<template>
  <div class="jc-foldable-list">
    <div class="jc-wrapper-container">
      <div ref="contentWrapperRef" :style="currentStyle" :class="{ 'jc-content-transition': needsToggle }" class="jc-content-wrapper">
        <slot></slot>
      </div>
      <div v-if="needsToggle" class="jc-toggle-overlay">
        <span class="link-type" @click="toggleList">
          <template v-if="viewInDialog">
            {{ t('action.viewAll') }}
          </template>
          <template v-else>
            {{ isCollapsed ? t('action.expandAll') : t('action.collapseAll') }}
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'src/composables/useI18n.ts';
import { DialogProvider } from 'components/j-q-dialog/index.ts';

export default defineComponent({
  name: 'JCFoldableList',
  props: {
    maxHeight: {
      type: Number,
      default: 100,
    },
    defaultCollapsed: {
      type: Boolean,
      default: true,
    },
    viewInDialog: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default: '',
    },
    dialogMaxWidth: {
      type: String,
      default: '50vw',
    },
  },
  setup(props, { slots }) {
    const contentWrapperRef = ref<HTMLElement | null>(null);
    const fullHeight = ref(0);
    const isCollapsed = ref(props.defaultCollapsed);
    let observer: MutationObserver | null = null;
    let retryCount = 0;
    const maxRetries = 5;
    const { t } = useI18n();

    const measureContentHeight = () => {
      if (contentWrapperRef.value) {
        if (observer) {
          observer.disconnect();
        }
        const measuredHeight = contentWrapperRef.value.scrollHeight;
        if (measuredHeight > 0) {
          fullHeight.value = measuredHeight;
          retryCount = 0;
        } else if (contentWrapperRef.value.children.length > 0 && retryCount < maxRetries) {
          retryCount++;
          setTimeout(() => {
            measureContentHeight();
          }, 100);
        }

        if (observer && contentWrapperRef.value) {
          observer.observe(contentWrapperRef.value, {
            childList: true,
            subtree: true,
          });
        }
      }
    };

    const needsToggle = computed(() => fullHeight.value > props.maxHeight);

    const currentStyle = computed(() => {
      if (isCollapsed.value && needsToggle.value) {
        return {
          maxHeight: `${props.maxHeight}px`,
          overflow: 'hidden',
        };
      }
      return {};
    });

    const openDialog = () => {
      const slotContent = slots.default?.();
      if (!slotContent) return;

      DialogProvider.register({
        title: props.dialogTitle || t('action.viewAll'),
        maxWidth: props.dialogMaxWidth,
        minHeight: 'auto',
        showHeader: true,
        showFooter: false,
        content: () => h('div', { class: 'jc-foldable-list-dialog-content' }, slotContent),
      });
    };

    const toggleList = () => {
      if (props.viewInDialog) {
        openDialog();
      } else {
        isCollapsed.value = !isCollapsed.value;
      }
    };

    onMounted(() => {
      nextTick(() => {
        measureContentHeight();

        if (contentWrapperRef.value) {
          observer = new MutationObserver(() => {
            nextTick(measureContentHeight);
          });

          observer.observe(contentWrapperRef.value, {
            childList: true,
            subtree: true,
          });
        }
      });
    });

    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    });

    const remeasure = () => {
      retryCount = 0;
      nextTick(measureContentHeight);
    };

    return {
      t,
      contentWrapperRef,
      isCollapsed,
      needsToggle,
      toggleList,
      currentStyle,
      remeasure,
    };
  },
});
</script>

<style lang="scss" scoped>
.jc-foldable-list {
  .jc-wrapper-container {
    position: relative;
  }

  .jc-content-wrapper {
    &.jc-content-transition {
      transition: max-height 0.3s ease-in-out;
    }
  }

  .jc-toggle-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 1) 100%);
    pointer-events: none;

    .link-type {
      pointer-events: auto;
      white-space: nowrap;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>