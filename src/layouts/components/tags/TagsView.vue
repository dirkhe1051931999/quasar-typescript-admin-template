<template>
  <div class="tags-view-container" ref="tagsViewContainer">
    <div class="tags-scroll-wrapper" ref="tagsScrollWrapper">
      <div class="tags-list">
        <div
          v-for="tag in visitedViews"
          :key="tag.path || tag.fullPath || ''"
          :class="['tag-item', { 'is-active': isActive(tag) }]"
          :ref="(el) => setTagRef(el, tag.path || tag.fullPath || '')"
          @click="handleTagClick(tag)"
          @contextmenu.prevent="handleContextMenu($event, tag)"
        >
          <span class="tag-title">{{ getTagTitle(tag) }}</span>
          <q-icon v-if="!tag.meta?.affix" name="close" class="tag-close" @click.stop="handleTagClose(tag)" />
        </div>
      </div>
    </div>

    <q-menu v-model="contextMenuVisible" :target="contextMenuTarget || false" @hide="contextMenuTarget = null">
      <q-list style="min-width: 120px" dense>
        <q-item clickable v-close-popup @click="handleCloseOther">
          <q-item-section>{{ $t('action.closeOther') || '关闭其他' }}</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="handleCloseAll">
          <q-item-section>{{ $t('action.closeAll') || '关闭所有' }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { ITagsView } from 'src/store/modules/tags';
import { TagsViewModule } from 'src/store/modules/tags';

export default defineComponent({
  name: 'TagsView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();

    const tagRefs = ref<Record<string, HTMLElement | null>>({});
    const contextMenuVisible = ref(false);
    const contextMenuTarget = ref<HTMLElement | null>(null);
    const contextMenuTag = ref<ITagsView | null>(null);

    const visitedViews = computed(() => {
      return TagsViewModule.visitedViews;
    });

    watch(
      () => route.path,
      () => {
        scrollToActiveTag(route);
      }
    );

    onMounted(() => {
      // 初始化时滚动到当前激活的 tag
      nextTick(() => {
        scrollToActiveTag(route);
      });
    });

    const tagsScrollWrapper = ref<HTMLElement | null>(null);
    const tagsViewContainer = ref<HTMLElement | null>(null);

    const setTagRef = (el: any, path: string) => {
      if (el && path) {
        tagRefs.value[path] = el;
      }
    };

    const isActive = (tag: ITagsView): boolean => {
      return route.path === tag.path;
    };

    const getTagTitle = (tag: ITagsView): string => {
      const title = tag.meta?.title;
      if (title) {
        return t(`routes.${title}`) as string;
      }
      return tag.path || '';
    };

    const handleTagClick = (tag: ITagsView) => {
      if (tag.path && tag.path !== route.path) {
        router.push(tag.fullPath || tag.path);
      }
    };

    const handleTagClose = (tag: ITagsView) => {
      TagsViewModule.delView(tag);
      // 如果关闭的是当前激活的 tag，导航到最后一个 tag 或首页
      if (isActive(tag)) {
        const remainingViews = TagsViewModule.visitedViews;
        if (remainingViews.length > 0) {
          const lastTag = remainingViews[remainingViews.length - 1];
          router.push(lastTag.fullPath || lastTag.path || '/');
        } else {
          router.push('/');
        }
      }
    };

    const scrollToActiveTag = (route: RouteLocationNormalized) => {
      nextTick(() => {
        const tagPath = route.path;
        const activeTagEl = tagRefs.value[tagPath];
        const scrollWrapper = tagsScrollWrapper.value;
        const container = tagsViewContainer.value;

        if (activeTagEl && scrollWrapper && container && tagPath) {
          const tagRect = activeTagEl.getBoundingClientRect();
          const wrapperRect = scrollWrapper.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          // 计算 tag 相对于 scrollWrapper 的位置
          const tagLeft = tagRect.left - wrapperRect.left + scrollWrapper.scrollLeft;
          const tagRight = tagLeft + tagRect.width;

          // 如果 tag 在可视区域外，滚动到它
          const visibleLeft = scrollWrapper.scrollLeft;
          const visibleRight = visibleLeft + containerRect.width;

          if (tagLeft < visibleLeft) {
            // tag 在左侧可视区域外，滚动到 tag 的起始位置
            scrollWrapper.scrollTo({
              left: tagLeft - 20,
              behavior: 'smooth',
            });
          } else if (tagRight > visibleRight) {
            // tag 在右侧可视区域外，滚动到 tag 的结束位置
            scrollWrapper.scrollTo({
              left: tagRight - containerRect.width + 20,
              behavior: 'smooth',
            });
          }
        }
      });
    };

    const handleContextMenu = (event: MouseEvent, tag: ITagsView) => {
      contextMenuTarget.value = event.currentTarget as HTMLElement;
      contextMenuTag.value = tag;
      contextMenuVisible.value = true;
    };

    const handleCloseOther = () => {
      if (contextMenuTag.value) {
        TagsViewModule.delOtherViews(contextMenuTag.value);
        // 如果当前路由不是右键的 tag，导航到右键的 tag
        if (route.path !== contextMenuTag.value.path) {
          router.push(contextMenuTag.value.fullPath || contextMenuTag.value.path || '/dashboard');
        }
      }
    };

    const handleCloseAll = () => {
      TagsViewModule.delAllViews();
      // 导航到第一个路由（dashboard）
      router.push('/dashboard');
    };

    return {
      tagRefs,
      contextMenuVisible,
      contextMenuTarget,
      contextMenuTag,
      visitedViews,
      tagsScrollWrapper,
      tagsViewContainer,
      setTagRef,
      isActive,
      getTagTitle,
      handleTagClick,
      handleTagClose,
      scrollToActiveTag,
      handleContextMenu,
      handleCloseOther,
      handleCloseAll,
    };
  },
});
</script>

<style lang="scss" scoped>
@use 'index';
</style>