<template>
  <div class="tags-view-container thin-shadow">
    <ScrollPane class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ $t(`routes.${tag.meta?.title}`) }}
        <q-icon
          name="close"
          class="fs-12"
          v-if="!isAffix(tag)"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></q-icon>
      </router-link>
    </ScrollPane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag()">{{ $t('action.refresh') }}</li>
      <li v-if="!isAffix()" @click="closeSelectedTag()">
        {{ $t('action.close') }}
      </li>
      <li @click="closeOthersTags">{{ $t('action.closeOther') }}</li>
      <li @click="closeAllTags()">{{ $t('action.closeAll') }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Vue, Watch } from 'vue-facing-decorator';
import { getCurrentInstance } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import ScrollPane from './ScrollPane.vue';
import path from 'path-browserify';
import { ITagsView, TagsViewModule } from 'src/store/modules/tags';
import { PermissionModule } from 'src/store/modules/permission';
import { getCssVariableValue } from 'src/utils/tools';
import { AppModule } from 'src/store/modules/app';
@Component({
  name: 'TagsViewComponent',
  components: {
    ScrollPane,
  },
})
export default class TagsViewComponent extends Vue {
  get visitedViews() {
    return TagsViewModule.visitedViews;
  }
  @Watch('$route', { deep: true })
  onchange1() {
    this.addTags();
  }
  @Watch('visible')
  onchange2(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }
  mounted() {
    this.initTags();
    this.addTags();
  }
  public selectedTag: ITagsView = {};
  public visible = false;
  public top = 0;
  public left = 0;
  public affixTags: ITagsView[] = [];
  public isActive(tag: ITagsView) {
    return tag.path === this.$route.path;
  }
  public isAffix(tag?: ITagsView) {
    if (!tag) {
      return this.selectedTag.meta?.affix;
    } else {
      return tag.meta?.affix;
    }
  }
  public filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
    let tags: ITagsView[] = [];
    routes.forEach((route) => {
      if (route.meta?.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        });
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path);
        if (childTags.length >= 1) {
          tags = tags.concat(childTags);
        }
      }
    });
    return tags;
  }
  public initTags() {
    this.affixTags = this.filterAffixTags(PermissionModule.routes);
    for (const tag of this.affixTags) {
      // 必须含有 name 属性
      if (tag.name) {
        TagsViewModule.addView(tag);
      }
    }
  }
  public addTags() {
    if (this.$route.name) {
      TagsViewModule.addView(this.$route);
    }
  }
  public refreshSelectedTag() {
    AppModule.refreshCurPage();
  }
  public closeSelectedTag(view: ITagsView) {
    if (!view) {
      TagsViewModule.delView(this.selectedTag);
      if (this.isActive(this.selectedTag)) {
        this.toLastView(this.visitedViews, this.selectedTag);
      }
    } else {
      TagsViewModule.delView(view);
      if (this.isActive(view)) {
        this.toLastView(this.visitedViews, view);
      }
    }
  }
  public closeOthersTags() {
    if (
      this.selectedTag.fullPath !== this.$route.path &&
      this.selectedTag.fullPath !== undefined
    ) {
      this.$router.push(this.selectedTag.fullPath);
    }
    TagsViewModule.delOtherViews(this.selectedTag);
  }
  public closeAllTags(view: ITagsView) {
    if (!view) {
      TagsViewModule.delAllViews();
      if (this.affixTags.some((tag) => tag.path === this.$route.path)) {
        return;
      }
      this.toLastView(this.visitedViews, this.selectedTag);
    } else {
      TagsViewModule.delAllViews();
      if (this.affixTags.some((tag) => tag.path === this.$route.path)) {
        return;
      }
      this.toLastView(this.visitedViews, view);
    }
  }
  public toLastView(visitedViews: ITagsView[], view: ITagsView) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath);
    } else {
      // 如果 TagsView 全部被关闭了，则默认重定向到主页
      if (view.name === 'Dashboard') {
        // 重新加载主页
        this.$router.push({ path: `/redirect${view.path}`, query: view.query });
      } else {
        this.$router.push('/dashboard');
      }
    }
  }
  public openMenu(tag: ITagsView, e: MouseEvent) {
    const menuMinWidth = 105;
    const sidebarWidth = getCssVariableValue('--v3-sidebar-width');
    console.log();
    // container margin left
    const offsetLeft = this.$el.getBoundingClientRect().left;
    // container width
    const offsetWidth = this.$el.offsetWidth;
    // left boundary
    const maxLeft = offsetWidth - menuMinWidth;
    // 15: margin right
    const left15 =
      e.clientX -
      offsetLeft +
      15 +
      Number(sidebarWidth.replace('px', '').replace('', ''));
    if (left15 > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left15;
    }
    this.top = e.clientY;
    this.visible = true;
    this.selectedTag = tag;
  }
  public closeMenu() {
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: calc(100% - var(--v3-sidebar-width));
  height: var(--v3-tagsview-height);
  line-height: var(--v3-tagsview-height);
  background-color: var(--v3-main-container-background);
  position: fixed;
  overflow: hidden;
  left: var(--v3-sidebar-width);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border: 1px solid var(--v3-tagsview-tag-border-color);
      border-radius: var(--v3-tagsview-tag-border-radius);
      color: var(--v3-tagsview-tag-text-color);
      background-color: var(--v3-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--v3-tagsview-tag-active-bg-color);
        color: var(--v3-tagsview-tag-active-text-color);
        border-color: var(--v3-tagsview-tag-active-border-color);
        &::before {
          content: '';
          background-color: var(--v3-tagsview-tag-active-before-color);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 5px;
        }
      }
      :deep(.q-icon) {
        margin: 0 2px;
        vertical-align: -2px;
        border-radius: 50%;
        &:hover {
          background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
          color: var(--v3-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 0 12px;
      cursor: pointer;
      width: 100%;
      height: 24px;
      line-height: 24px;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
