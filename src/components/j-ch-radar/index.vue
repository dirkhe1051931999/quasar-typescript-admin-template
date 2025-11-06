<template>
  <div>
    <canvas ref="radarChartCanvas" style="width: 100%" :style="{ height: height + 'px' }"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';

type RadarDataset = ChartDataset<'radar'>;

export default defineComponent({
  name: 'JChRadar',

  props: {
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    datasets: {
      type: Array as () => RadarDataset[],
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    const radarChartCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chartInstance: Chart<'radar'> | null = null;

    const initChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = radarChartCanvas.value?.getContext('2d');
      if (!ctx) return;

      // ⚠️ 移除渐变色逻辑

      const chartData: ChartData<'radar'> = {
        labels: props.labels as string[],
        datasets: props.datasets.map((dataset) => ({
          ...dataset,
          type: 'radar',
          fill: dataset.fill ?? true,
          backgroundColor: dataset.backgroundColor || 'rgba(58,65,111,0.2)',
          borderColor: dataset.borderColor || 'rgba(58,65,111,1)',
          borderWidth: dataset.borderWidth ?? 2,
        })),
      };

      const chartOptions: ChartOptions<'radar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // 关键修改：显示 Legend，这对于雷达图非常重要
            position: 'bottom',
            labels: {
              color: '#969799',
              pointStyle: 'rect',
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
          r: {
            beginAtZero: true,
            angleLines: {
              color: '#F0F0F0', // 蜘蛛网线的颜色
            },
            grid: {
              color: '#F0F0F0', // 圆圈线的颜色
            },
            pointLabels: {
              color: '#b2b9bf', // 轴标签的颜色
              font: { size: 11, family: 'Open Sans' },
            },
            ticks: {
              display: false, // 隐藏刻度值
            },
          },
        },
      };

      chartInstance = new Chart(ctx, {
        type: 'radar',
        data: chartData,
        options: chartOptions,
      });
    };

    onMounted(() => {
      initChart();
    });

    // 监听 props 变化，重新渲染图表
    watch(
      [() => props.labels, () => props.datasets, () => props.height],
      () => {
        initChart();
      },
      { deep: true }
    );

    return {
      radarChartCanvas,
    };
  },
});
</script>

<style lang="scss" scoped></style>
