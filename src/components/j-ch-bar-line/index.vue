<template>
  <div>
    <canvas ref="mixedChartCanvas" style="width: 100%" :style="{ height: height + 'px' }"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch, PropType } from 'vue';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';
type MixedDataset = ChartDataset<any>;

export default defineComponent({
  name: 'JChBarLine',

  props: {
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    datasets: {
      type: Array as () => MixedDataset[],
      required: true,
    },
    height: {
      type: Number,
      default: 300, // 默认高度 300px
    },
  },

  setup(props) {
    const mixedChartCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    let chartInstance: Chart | null = null;

    const initChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = mixedChartCanvas.value?.getContext('2d');
      if (!ctx) return;

      // --- 1. 处理数据集：移除渐变色填充 (fill: false) ---
      const processedDatasets: MixedDataset[] = props.datasets.map((dataset) => {
        let defaultProps: any = {};
        const finalType = dataset.type === 'line' ? 'line' : 'bar';

        if (dataset.type === 'line') {
          // Line 类型：实线，无填充
          defaultProps = {
            type: 'line',
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 3,
            fill: false, // 关键：取消填充
            backgroundColor: 'transparent',
            maxBarThickness: undefined,
          };
        } else if (dataset.type === 'bar') {
          // Bar 类型：柱状图配置
          defaultProps = {
            type: 'bar',
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            fill: undefined,
            maxBarThickness: 34,
            backgroundColor: dataset.backgroundColor,
          };
        }

        return {
          type: finalType,
          ...dataset,
          ...defaultProps,
        };
      });

      // --- 2. 构建 Chart Data ---
      const chartData: ChartData<'bar' | 'line'> = {
        labels: props.labels as string[],
        datasets: processedDatasets,
      };

      // --- 3. Chart Options (启用 Legend) ---
      const chartOptions: ChartOptions<'bar' | 'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // 关键：显示 Legend
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
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: '#f5f6fa',
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#969799',
              font: { size: 11, family: 'Open Sans', style: 'normal', lineHeight: 2 },
            },
          },
          x: {
            border: { display: false },
            grid: { display: false, drawOnChartArea: true, drawTicks: true },
            ticks: {
              display: true,
              color: '#969799',
              padding: 10,
              font: { size: 11, family: 'Open Sans', style: 'normal', lineHeight: 2 },
              callback: (value: any, index: any) => {
                const val: any = props.labels[index];
                if (val && val.length > 13) {
                  return `${val.slice(0, 13)}...`;
                } else {
                  return val;
                }
              },
            },
          },
        },
      };

      // --- 4. 创建 Chart 实例 ---
      chartInstance = new Chart(ctx, {
        data: chartData,
        options: chartOptions,
      } as any);
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
      mixedChartCanvas,
    };
  },
});
</script>

<style lang="scss" scoped></style>