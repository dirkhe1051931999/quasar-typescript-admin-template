<template>
  <div>
    <canvas ref="bubbleChartCanvas" style="width: 100%" :style="{ height: height + 'px' }"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';

// 气泡图数据集的特殊类型
type BubbleDataPoint = { x: number; y: number; r: number };
type BubbleDataset = ChartDataset<'bubble', BubbleDataPoint[]>;

export default defineComponent({
  name: 'JChBubble',

  props: {
    labels: {
      type: Array,
      default: () => [],
      required: false,
    },
    datasets: {
      type: Array as () => BubbleDataset[],
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    const bubbleChartCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chartInstance: Chart<'bubble'> | null = null;

    const initChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = bubbleChartCanvas.value?.getContext('2d');
      if (!ctx) return;

      const chartData: ChartData<'bubble'> = {
        labels: props.labels as string[],
        datasets: props.datasets.map((dataset) => ({
          ...dataset,
          // 确保类型正确，并设置透明度
          backgroundColor: dataset.backgroundColor || 'rgba(54, 162, 235, 0.6)',
        })),
      };

      const chartOptions: ChartOptions<'bubble'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#969799',
              pointStyle: 'rect',
              padding: 20,
              usePointStyle: true,
              font: { size: 11, family: 'Open Sans', style: 'normal', lineHeight: 1 },
            },
          },
          tooltip: {
            borderWidth: 1,
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
            borderColor: '#eeeeee',
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
            border: { display: false },
            grid: { display: true, drawOnChartArea: true, drawTicks: false, color: '#f5f6fa' },
            ticks: {
              display: true,
              padding: 10,
              color: '#969799',
              font: { size: 11, family: 'Open Sans', style: 'normal', lineHeight: 2 },
            },
          },
          x: {
            border: { display: false },
            grid: { display: true, drawOnChartArea: true, drawTicks: true, color: '#f5f6fa' },
            ticks: {
              display: true,
              color: '#969799',
              padding: 10,
              font: { size: 11, family: 'Open Sans', style: 'normal', lineHeight: 2 },
              callback: (value: any, index: any) => {
                const val: any = (props.labels as any[])[index];
                if (val) {
                  return typeof val === 'string' && val.length > 13 ? `${val.slice(0, 13)}...` : val;
                }
                return value;
              },
            },
          },
        },
      };

      chartInstance = new Chart(ctx, {
        type: 'bubble',
        data: chartData,
        options: chartOptions,
      });
    };

    onMounted(() => {
      initChart();
    });

    watch(
      [() => props.labels, () => props.datasets, () => props.height],
      () => {
        initChart();
      },
      { deep: true }
    );

    return {
      bubbleChartCanvas,
    };
  },
});
</script>

<style lang="scss" scoped></style>