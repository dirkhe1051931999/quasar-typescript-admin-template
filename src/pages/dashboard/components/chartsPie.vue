<template>
  <div>
    <q-card class="q-pa-md">
      <div class="fs-18 f-bold">Pie chart example</div>
      <div>
        <canvas id="c-pie-chart" style="width: 100%; height: 300px"></canvas>
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
    var ctx1 = (document.getElementById('c-pie-chart') as HTMLCanvasElement).getContext('2d')!;
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
      type: 'pie',
      data: {
        labels: ['Facebook', 'Direct', 'Organic', 'Referral'],
        datasets: [
          {
            label: 'Projects',
            weight: 9,
            borderWidth: 2,
            backgroundColor: ['#17c1e8', '#cb0c9f', '#3A416F', '#a8b8d8'],
            data: [15, 20, 12, 60],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            border: {
              display: false,
              dash: [5, 5],
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  }
}
</script>

<style lang="scss" scoped></style>
