
<template>
  <div
    v-if="!item.meta?.hidden"
    :class="{
      'simple-mode': isCollapse,
      'first-level': isFirstLevel,
    }"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <SidebarItemLink
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <q-icon
            :name="theOnlyOneChild.meta.icon"
            v-if="theOnlyOneChild.meta.icon"
          ></q-icon>
          <template v-if="theOnlyOneChild.meta.title" #title>{{
            theOnlyOneChild.meta.title
          }}</template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <q-icon
          :name="item.meta.icon"
          v-if="item.meta && item.meta.icon"
        ></q-icon>
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { isExternal } from 'src/utils/validate';
import path from 'path-browserify';
import SidebarItemLink from './SidebarItemLink.vue';
import { RouteRecordRaw } from 'vue-router';
@Component({
  name: 'SidebarItemLinkComponent',
  components: {
    SidebarItemLink,
  },
})
export default class SidebarItemLinkComponent extends Vue {
  @Prop({
    required: true,
    default: {},
  })
  item!: RouteRecordRaw;
  @Prop({ default: false, required: false }) isCollapse?: boolean;
  @Prop({ default: true, required: false }) isFirstLevel?: boolean;
  @Prop({ default: '', required: false }) basePath?: string;
  get alwaysShowRootMenu() {
    return this.item.meta && this.item.meta.alwaysShow;
  }
  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter(
        (item: RouteRecordRaw) => {
          return !(item.meta && item.meta.hidden);
        }
      );
      return showingChildren.length;
    }
    return 0;
  }
  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already contains item's path information
    return { ...this.item, path: '' };
  }
  public isExternal = isExternal;
  public resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath!)) {
      return this.basePath;
    }
    return path.resolve(this.basePath!, routePath);
  }
}
</script>

<style lang="scss" scoped>
:deep(.q-icon) {
  margin-right: 10px;
  font-size: 18px;
}
:deep(.el-sub-menu .el-sub-menu__icon-arrow) {
  font-size: 16px;
  font-weight: bold;
}
:deep(.el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        font-size: 20px;
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
