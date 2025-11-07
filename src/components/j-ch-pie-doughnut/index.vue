<template>
  <div ref="chartContainer" style="position: relative">
    <canvas ref="chartCanvas" style="width: 100%" :style="{ height: height + 'px' }"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';

// 定义组件支持的 Chart 类型
type ChartType = 'pie' | 'doughnut';

export default defineComponent({
  name: 'JChPieDoughnut',

  props: {
    type: {
      type: String as () => ChartType,
      required: true,
      validator: (value: string) => ['pie', 'doughnut'].includes(value),
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    // 数据集类型统一为 ChartType
    datasets: {
      type: Array as () => ChartDataset<ChartType>[],
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    const chartCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    const chartContainer: Ref<HTMLDivElement | null> = ref(null);
    // Chart 实例类型使用 ChartType
    let chartInstance: Chart<ChartType> | null = null;

    // --- 外部 Tooltip 逻辑 (保持不变) ---

    const getOrCreateTooltipEl = (container: HTMLElement) => {
      let el = container.querySelector('div.chartjs-tooltip') as HTMLDivElement | null;
      if (!el) {
        el = document.createElement('div');
        el.className = 'chartjs-tooltip';
        el.style.background = '#ffffff';
        el.style.borderRadius = '8px';
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        el.style.color = '#323232';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.position = 'absolute';
        el.style.transform = 'translate(-50%, 0)';
        el.style.transition = 'all .1s ease';
        el.style.padding = '8px 10px';
        el.style.font = '12px Open Sans, sans-serif';
        container.appendChild(el);
      }
      return el;
    };

    const externalTooltipHandler = (context: any) => {
      const { chart, tooltip } = context;
      const container = chartContainer.value as HTMLDivElement | null;
      if (!container) return;

      const tooltipEl = getOrCreateTooltipEl(container);

      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
      }

      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map((b: any) => b.lines);

        tooltipEl.innerHTML = '';

        if (titleLines.length) {
          const title = document.createElement('div');
          title.style.fontWeight = '600';
          title.style.marginBottom = '4px';
          title.textContent = titleLines.join(' ');
          tooltipEl.appendChild(title);
        }

        bodyLines.forEach((lines: string[]) => {
          const div = document.createElement('div');
          div.textContent = lines.join(' ');
          tooltipEl.appendChild(div);
        });
      }

      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
      tooltipEl.style.opacity = '1';
      tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
      tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
    };

    // --- Chart Initialization ---

    const initChart = () => {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartCanvas.value?.getContext('2d');
      if (!ctx) return;

      // 动态获取图表类型
      const chartType = props.type;

      const chartData: ChartData<ChartType> = {
        labels: props.labels,
        datasets: props.datasets.map((dataset) => ({
          ...dataset,
          type: chartType, // 关键：动态设置 ChartDataSet 的类型
          borderWidth: dataset.borderWidth ?? 2,
        })),
      };

      const chartOptions: ChartOptions<ChartType> = {
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
              font: {
                size: 11,
                family: 'Open Sans',
                style: 'normal',
                lineHeight: 1,
              },
            },
          },
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
          },
        },
        interaction: { intersect: false, mode: 'index' },
      };

      // 使用动态类型初始化 Chart 实例
      chartInstance = new Chart(ctx, {
        type: chartType,
        data: chartData,
        // 需要使用 'as any' 来避免 TypeScript 对不同 ChartOptions 类型的严格检查
        options: chartOptions as any,
      });
    };

    onMounted(() => {
      initChart();
    });

    // 监听 labels, datasets, 还有 chart type 的变化
    watch(
      [() => props.labels, () => props.datasets, () => props.type],
      () => {
        initChart();
      },
      { deep: true }
    );

    return {
      chartCanvas,
      chartContainer,
    };
  },
});
</script>

<style lang="scss" scoped></style>