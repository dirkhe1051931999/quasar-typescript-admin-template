
<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { myIcons } from 'src/utils/custom-svg';
import setting from 'src/setting.json';
const NODE_ENV = process.env.NODE_ENV;
const development = NODE_ENV === 'development';
const path = development ? 'img:/icons/' : `img:${setting.publicPath}icons/`;
@Component({
  name: 'myComponentApp',
})
export default class myComponentApp extends Vue {
  mounted() {
    this.$q.dark.set(true);
    document.querySelector('html')?.classList.add('dark');
    const iconPath = path;
    this.$q.iconMapFn = (iconName) => {
      const icon = myIcons[iconName];
      if (icon !== void 0) {
        return { icon: iconPath + icon };
      }
      return void 0;
    };
  }
}
</script>


<style lang="scss">
@import 'src/css/reset-quasar.scss';
</style>