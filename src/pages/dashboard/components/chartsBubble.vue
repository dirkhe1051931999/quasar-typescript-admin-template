<template>
  <div>
    <q-card class="q-pa-md">
      <div class="fs-18 f-bold">Bubble example</div>
      <div>
        <canvas id="c-bubble-chart" style="width: 100%; height: 300px"></canvas>
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
    var ctx1 = (document.getElementById('c-bubble-chart') as HTMLCanvasElement).getContext('2d')!;
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
      type: 'bubble',
      data: {
        labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [
              {
                x: 100,
                y: 0,
                r: 10,
              },
              {
                x: 60,
                y: 30,
                r: 20,
              },
              {
                x: 40,
                y: 350,
                r: 10,
              },
              {
                x: 80,
                y: 80,
                r: 10,
              },
              {
                x: 20,
                y: 30,
                r: 15,
              },
              {
                x: 0,
                y: 100,
                r: 5,
              },
            ],
            backgroundColor: '#cb0c9f',
          },
          {
            label: 'Dataset 2',
            data: [
              {
                x: 70,
                y: 40,
                r: 10,
              },
              {
                x: 30,
                y: 60,
                r: 20,
              },
              {
                x: 10,
                y: 300,
                r: 25,
              },
              {
                x: 60,
                y: 200,
                r: 10,
              },
              {
                x: 50,
                y: 300,
                r: 15,
              },
              {
                x: 20,
                y: 350,
                r: 5,
              },
            ],
            backgroundColor: '#3A416F',
          },
        ],
      },
      options: {
        responsive: true,
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
              drawTicks: false,
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
