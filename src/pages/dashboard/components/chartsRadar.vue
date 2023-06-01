<template>
  <div>
    <q-card class="q-pa-md">
      <div class="fs-18 f-bold">Radar chart example</div>
      <div>
        <canvas id="c-radar-chart" style="width: 100%; height: 300px"></canvas>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { Chart } from 'chart.js/auto';
@Component({ name: 'myChartsComponent' })
export default class myChartsComponent extends Vue {
  mounted() {
    var ctx1 = (document.getElementById('c-radar-chart') as HTMLCanvasElement).getContext('2d')!;
    var gradientStroke1 = ctx1!.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)');
    //purple colors

    var gradientStroke2 = ctx1!.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)');

    new Chart(ctx1, {
      type: 'radar',
      data: {
        labels: ['English', 'Maths', 'Physics', 'Chemistry', 'Biology', 'History'],
        datasets: [
          {
            label: 'Student A',
            backgroundColor: 'rgba(58,65,111,0.2)',
            data: [65, 75, 70, 80, 60, 80],
            borderDash: [5, 5],
          },
          {
            label: 'Student B',
            backgroundColor: 'rgba(203,12,159,0.2)',
            data: [54, 65, 60, 70, 70, 75],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
</script>

<style lang="scss" scoped></style>
