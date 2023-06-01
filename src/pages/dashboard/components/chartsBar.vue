<template>
  <div>
    <q-card class="q-pa-md">
      <div class="fs-18 f-bold">Bar chart example</div>
      <div>
        <canvas id="c-bar-chart" style="width: 100%; height: 300px"></canvas>
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
    var ctx1 = (document.getElementById('c-bar-chart') as HTMLCanvasElement).getContext('2d')!;
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
      type: 'bar',
      data: {
        labels: ['16-20', '21-25', '26-30', '31-36', '36-42', '42+', 'A+', '$$', '??'],
        datasets: [
          {
            label: 'Sales by age',
            borderWidth: 0,
            borderRadius: 4,
            backgroundColor: '#3A416F',
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            maxBarThickness: 34,
          },
        ],
      },
      options: {
        // indexAxis: 'y', // 水平还是垂直
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#9ca2b7',
            },
          },
          x: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: false,
              drawOnChartArea: true,
              drawTicks: true,
            },
            ticks: {
              display: true,
              color: '#9ca2b7',
              padding: 10,
            },
          },
        },
      },
    });
  }
}
</script>

<style lang="scss" scoped></style>
