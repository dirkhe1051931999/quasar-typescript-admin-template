<template>
  <div
    v-if="!item.meta?.hidden"
    :class="{
      'simple-mode': isCollapse,
      'first-level': isFirstLevel,
    }"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <el-tooltip effect="dark" :content="$t(`routes.${theOnlyOneChild.meta.title}`)" placement="right" :disabled="!isCollapse" v-if="isExternal(resolvePath(theOnlyOneChild.path))">
        <a :href="resolvePath(theOnlyOneChild.path)" target="_blank" class="el-menu-item" rel="noopener">
          <q-icon :name="theOnlyOneChild.meta.icon" v-if="theOnlyOneChild.meta.icon && isRootMemu(theOnlyOneChild)"></q-icon>
          <q-icon :name="getPermissionSigleOnlyOneChildIcon(theOnlyOneChild)" v-else-if="getPermissionSigleOnlyOneChildIcon(theOnlyOneChild)" class="q-mr-md" />
          <q-icon name="fiber_manual_record" v-else class="record" />
          <span v-show="!isCollapse">{{ $t(`routes.${theOnlyOneChild.meta.title}`) }}</span>
        </a>
      </el-tooltip>
      <SidebarItemLink v-if="theOnlyOneChild.meta && !isExternal(resolvePath(theOnlyOneChild.path))" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <q-icon :name="theOnlyOneChild.meta.icon" v-if="theOnlyOneChild.meta.icon && isRootMemu(theOnlyOneChild)"></q-icon>
          <q-icon name="fiber_manual_record" v-else class="record"> </q-icon>
          <template v-if="theOnlyOneChild.meta.title" #title>
            {{ $t(`routes.${theOnlyOneChild.meta.title}`) }}
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <q-icon :name="item.meta.icon" v-if="item.meta && item.meta.icon"></q-icon>
        <span v-if="item.meta && item.meta.title">{{ $t(`routes.${item.meta.title}`) }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-collapse="isCollapse" :is-first-level="false" :base-path="resolvePath(child.path)" />
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
import { PermissionModule } from 'src/store/modules/permission';
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
      const showingChildren = this.item.children.filter((item: RouteRecordRaw) => {
        return !(item.meta && item.meta.hidden);
      });
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
  get isRootMemu() {
    return (data: any) => {
      let isRoot = false;
      for (let item of PermissionModule.dynamicRoutes) {
        if (item.children?.length === 1 && item.children[0].name === data.name) {
          isRoot = true;
          break;
        }
      }
      return isRoot;
    };
  }
  get getPermissionSigleOnlyOneChildIcon() {
    return (data: any) => {
      if (data.path) {
        const dynamicRoutes = PermissionModule.dynamicRoutes;
        let father: any;
        for (let item of dynamicRoutes) {
          if (item.children) {
            for (let child of item.children) {
              if (child.name === data.name) {
                father = item;
              }
            }
          }
        }
        return father.meta.icon;
      } else {
        return undefined;
      }
    };
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
