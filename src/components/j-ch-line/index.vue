<template>
  <div ref="chartContainer">
    <canvas ref="lineChartCanvas" style="width: 100%" :style="{ height: height + 'px' }"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';

export default defineComponent({
  name: 'JChLine',

  props: {
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    datasets: {
      type: Array as () => ChartDataset<'line'>[],
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    const lineChartCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chartInstance: Chart<'line'> | null = null;

    const initChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = lineChartCanvas.value?.getContext('2d');
      if (!ctx) return;

      const chartData: ChartData<'line'> = {
        labels: props.labels, // 使用 props.labels
        datasets: props.datasets.map((dataset) => ({
          ...dataset,
          tension: 0.4,
          pointRadius: 2,
          borderWidth: 3,
          fill: false,
          backgroundColor: 'transparent',
          type: 'line',
        })),
      };

      const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#969799',
              pointStyle: 'line',
              padding: 20,
              usePointStyle: true,
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 1,
              },
            },
          },
          tooltip: {
            borderWidth: 1,
            backgroundColor: 'white', // Set the background color to white
            titleColor: 'black', // Set the title color to black
            bodyColor: 'black', // Set the body color to black
            borderColor: '#eeeeee', // Optional: Add a border color
            padding: 12,
            callbacks: {
              label: (context: any) => {
                const label = context.dataset.label || '';
                return `${label}: ${context.formattedValue}`;
              },
            },
          },
        },
        interaction: { intersect: false, mode: 'index' },
        scales: {
          y: {
            beginAtZero: true,
            border: {
              display: false,
            },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: '#F0F0F0',
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#969799',
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
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: '#969799',
              padding: 20,
              font: {
                size: 10,
                family: 'Open Sans',
                style: 'normal',
              },
              callback: (value: any, index: any, values: any) => {
                const val: any = props.labels[index];
                if (val.length > 13) {
                  return `${val.slice(0, 13)}...`;
                } else {
                  return val;
                }
              },
            },
          },
        },
      };

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });
    };

    onMounted(() => {
      initChart();
    });

    // 监听 props 变化，重新渲染图表
    watch(
      [() => props.labels, () => props.datasets],
      () => {
        initChart();
      },
      { deep: true }
    );

    return {
      lineChartCanvas,
    };
  },
});
</script>

<style lang="scss" scoped>
/* 保持原样 */
</style>