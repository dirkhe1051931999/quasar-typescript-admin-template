
<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { myIcons } from './assets/icons';

@Component({
  name: 'myComponentApp',
})
export default class myComponentApp extends Vue {
  mounted() {
    const iconPath = 'img:src/assets/icons/svg/';
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
.q-card {
  border-radius: 16px;
  vertical-align: top;
  background: #fff;
  position: relative;
  box-shadow: rgb(0 0 0 / 5%) 0px 20px 27px 0px;
}
</style>