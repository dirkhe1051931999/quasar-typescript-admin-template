<template>
  <div>
    <div id="container3" class="w-full h-500"></div>
  </div>
</template>

<script lang="ts">
import { Funnel } from '@antv/g2plot';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Funnel',
})
export default class extends Vue {
  async mounted() {
    const data = [
      { action: 'browse the website', pv: 50000 },
      { action: 'put it in the cart', pv: 35000 },
      { action: 'generate orders', pv: 25000 },
      { action: 'pay money', pv: 15000 },
      { action: 'conclude a transaction', pv: 8500 },
    ];
    await this.$nextTick();
    const funnelPlot = new Funnel(document.getElementById('container3'), {
      data: data,
      xField: 'action',
      yField: 'pv',
    });
    funnelPlot.render();
  }
}
</script>

<style scoped lang='scss'>
</style>
