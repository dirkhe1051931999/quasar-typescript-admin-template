<template>
  <div>
    <div id="container-2" class="full-width h-500 bg-white"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { Line } from '@antv/g2plot';

@Component({
  name: 'myComponentLine2',
})
export default class myComponentLine2 extends Vue {
  async mounted() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];
    await this.$nextTick();
    const linePlot = new Line(document.getElementById('container-2') as any, {
      title: {
        visible: true,
        text: 'Line chart with data points',
      },
      description: {
        visible: true,
        text: 'Display each data point on the line chart as an aid to reading.',
      },
      forceFit: true,
      padding: 'auto',
      data,
      xField: 'year',
      yField: 'value',
      point: {
        visible: true,
      },
      label: {
        visible: true,
        type: 'point',
      },
    });

    linePlot.render();
  }
}
</script>

<style scoped lang='scss'>
</style>
