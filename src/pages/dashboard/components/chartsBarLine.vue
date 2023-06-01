<template>
  <div>
    <q-card class="q-pa-md">
      <div class="fs-18 f-bold">Mixed chart example</div>
      <div>
        <canvas id="c-bar-line-chart" style="width: 100%; height: 300px"></canvas>
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
    var ctx1 = (document.getElementById('c-bar-line-chart') as HTMLCanvasElement).getContext('2d')!;
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
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            type: 'bar',
            label: 'Organic Search',
            borderWidth: 0,
            borderColor: '#3A416F',
            backgroundColor: '#3A416F',
            borderRadius: 4,
            borderSkipped: false,
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
            maxBarThickness: 34,
          },
          {
            type: 'line',
            label: 'Referral',
            tension: 0.4,
            pointRadius: 0,
            pointBackgroundColor: '#cb0c9f',
            borderColor: '#cb0c9f',
            borderWidth: 3,
            backgroundColor: gradientStroke1,
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
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
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#b2b9bf',
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
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
              color: '#b2b9bf',
              padding: 10,
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    });
  }
}
</script>

<style lang="scss" scoped></style>
