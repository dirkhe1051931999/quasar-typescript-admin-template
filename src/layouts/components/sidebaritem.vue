<template>
  <div v-if="!route.meta || !route.meta.hidden" class="sidebar-item">
    <q-list class="q-list" v-if="!route.children || (route.children && route.children.length === 1)">
      <q-expansion-item
        :to="resolvePath(route)"
        :icon="iconName(route)"
        :label="label(route)"
        class="theOnlyOneChild"
        :header-inset-level="route.children && route.children.length === 1 && !route.meta.nested ? 0 : route.meta.fatherPath ? 1 : 0.5"
        :active-class="$route.path === resolvePath(route) ? 'bg-small-blue text-primary active-tab' : 'text-black2'"
      ></q-expansion-item>
    </q-list>
    <q-list class="q-list" v-else>
      <q-expansion-item
        :icon="route.meta.icon"
        :label="$t(`routes.${route.meta.title}`)"
        v-model="opened"
        :ref="route.meta.title"
        :header-inset-level="route.meta.nested ? 0.5 : 0"
      >
        <Sidebaritem v-for="(item, index) in route.children" :route="item" :key="index" :basePath="route.path" />
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route, RouteConfig } from 'vue-router';
import Sidebaritem from './sidebaritem.vue';
import { isExternal } from '@/utils/validate';
import path from 'path';
@Component({
  name: 'Sidebaritem',
  components: {
    Sidebaritem,
  },
})
export default class extends Vue {
  @Prop({ required: true, default: {} }) private route!: RouteConfig;
  @Prop({ default: '' }) private basePath!: string;
  @Watch('$route', { immediate: true })
  onRouteChange(newVal: any) {
    this.$nextTick(() => {
      const father = newVal.matched[0];
      const title = father.meta.title;
      if (newVal.meta.fatherPath && newVal.matched[1].name && this.$refs[newVal.matched[1].name]) {
        (this.$refs[newVal.matched[1].name] as any).show();
      }
      if (father.meta && title && this.$refs[title]) {
        this.opened = true;
      }
    });
  }
  private opened = false;
  private visible = false;
  private resolvePath(route: any) {
    if (route.meta.fatherPath && !route.children) {
      return path.resolve(this.basePath, route.meta.fatherPath, route.path);
    } else if (route.meta.nested && !route.meta.fatherPath) {
      return path.resolve(this.basePath, route.path);
    }
    if (route.children && route.children.length) {
      return path.resolve(route.path, route.children[0].path);
    } else {
      return path.resolve(this.basePath, route.path);
    }
  }
  private iconName(route: any) {
    return !route.children || (route.children.length === 1 && route.meta && route.meta.icon) ? route.meta.icon : route.children[0].meta.icon;
  }
  private label(route: any) {
    return !route.children || (route.children.length === 1 && route.meta && route.meta.icon)
      ? this.$i18n.t(`routes.${route.meta.title}`)
      : this.$i18n.t(`routes.${route.children[0].meta.title}`);
  }
}
</script>

<style  lang='scss'>
.sidebar-item {
  .q-list {
    .active-tab::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      background: $blue;
      top: 0;
      right: 0;
    }
    .q-item__section--avatar {
      padding-right: 0;
    }
    .q-item__section {
      min-width: 40px;
    }
    .theOnlyOneChild {
      .q-item {
        .relative-position {
          display: none;
        }
      }
    }
  }
}
</style>
