<template>
  <div v-if="!route.meta || !route.meta.hidden" class="sidebar-item">
    <q-list class="q-list text-black2" v-if="!route.children || route.children.length===1">
      <q-expansion-item
        :to="resolvePath(route)"
        :icon="iconName(route)"
        :content-inset-level="1"
        :label="label(route)"
        class="theOnlyOneChild"
        :caption="resolvePath(route)"
        :active-class="$route.path===resolvePath(route)?'bg-light-blue text-primary':'text-black2'"
      ></q-expansion-item>
    </q-list>
    <q-list class="q-list" v-else>
      <template>
        <q-expansion-item
          :icon="route.meta.icon"
          :content-inset-level="1"
          :label="$t(`routes.${route.meta.title}`)"
          v-model="opened"
          :ref="route.meta.title"
        >
          <Sidebaritem v-for="(item,index) in route.children" :route="item" :key="index" :basePath="route.path" />
        </q-expansion-item>
      </template>
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
      if (father.meta && title && this.$refs[title]) {
        this.opened = true;
      }
    });
  }
  private opened = false;
  private visible = false;
  private resolvePath(route: any) {
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
    .q-item__section--avatar {
      padding-right: 0;
    }
    .q-item__section {
      min-width: 40px;
    }
    .q-expansion-item__content {
      padding-left: 0 !important;
      .q-expansion-item__container a {
        padding-left: 50px;
      }
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
