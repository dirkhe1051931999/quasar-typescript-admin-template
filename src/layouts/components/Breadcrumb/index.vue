<template>
  <el-breadcrumb class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span
        v-if="
          item.redirect === 'noRedirect' || index === breadcrumbs.length - 1
        "
        class="no-redirect"
      >
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" >
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import { compile } from 'path-to-regexp';
import { RouteLocationMatched } from 'vue-router';
@Component({
  name: 'BreadcrumbComponent',
})
export default class BreadcrumbComponent extends Vue {
  @Watch('$route.path')
  onchange(path: string) {
    if (path.startsWith('/redirect/')) {
      return;
    }
    this.getBreadcrumb();
  }
  mounted() {
    this.getBreadcrumb();
  }
  public breadcrumbs: RouteLocationMatched[] = [];
  public getBreadcrumb() {
    this.breadcrumbs = this.$route.matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
  }
  public pathCompile(path: string) {
    const { params } = this.$route;
    const toPath = compile(path);
    return toPath(params);
  }
  public handleLink(item: RouteLocationMatched) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect as string);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
