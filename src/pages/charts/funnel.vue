<template>
  <div>
    <div id="container3" class="full-width h-500 bg-white"></div>
  </div>
</template>

<script lang="ts">
import { Funnel } from '@antv/g2plot';
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentFunnel',
})
export default class myComponentFunnel extends Vue {
  async mounted() {
    const data = [
      { action: 'browse the website', pv: 50000 },
      { action: 'put it in the cart', pv: 35000 },
      { action: 'generate orders', pv: 25000 },
      { action: 'pay money', pv: 15000 },
      { action: 'conclude a transaction', pv: 8500 },
    ];
    await this.$nextTick();
    const funnelPlot = new Funnel(
      document.getElementById('container3') as any,
      {
        data: data,
        xField: 'action',
        yField: 'pv',
      }
    );
    funnelPlot.render();
  }
}
</script>

<style scoped lang='scss'>
</style>
