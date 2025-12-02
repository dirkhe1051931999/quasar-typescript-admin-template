<template>
  <div ref="chartContainer" style="position: relative">
    <div>
      <canvas ref="barChartCanvas" style="width: 100%" :style="{ height: height + 'px' }"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';

type BarDataset = ChartDataset<'bar'>;

export default defineComponent({
  name: 'JChBar',

  props: {
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    datasets: {
      type: Array as () => BarDataset[],
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
  },

  setup(props) {
    const barChartCanvas: Ref<HTMLCanvasElement | null> = ref(null);
    const chartContainer: Ref<HTMLDivElement | null> = ref(null); // 用于 Tooltip
    let chartInstance: Chart<'bar'> | null = null;

    // --- 外部 Tooltip 逻辑 (从 Line Chart 复制过来) ---
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

      const ctx = barChartCanvas.value?.getContext('2d');
      if (!ctx) return;

      const chartData: ChartData<'bar'> = {
        labels: props.labels as string[],
        datasets: props.datasets.map((dataset) => ({
          ...dataset,
          type: 'bar',
          borderWidth: dataset.borderWidth ?? 0,
          borderRadius: dataset.borderRadius ?? 4,
          maxBarThickness: dataset.maxBarThickness ?? 34,
          // 确保填充色使用传入的颜色，而不是渐变色
          backgroundColor: dataset.backgroundColor || '#3A416F',
        })),
      };

      const chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // 关键修改：显示 Legend
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
        scales: {
          y: {
            border: { display: false },
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: '#f5f6fa', // 使用实色细线
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#969799',
            },
          },
          x: {
            // 关键修改：移除 dash: [5, 5]，实现实线分割线
            border: { display: false },
            grid: {
              display: false,
              drawOnChartArea: true,
              drawTicks: true,
            },
            ticks: {
              display: true,
              color: '#969799',
              padding: 10,
            },
          },
        },
      };

      chartInstance = new Chart(ctx, {
        type: 'bar',
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
      barChartCanvas,
      chartContainer,
    };
  },
});
</script>

<style lang="scss" scoped>
/* Tooltip 样式不再需要在 style 块中定义，因为它们被内联定义在 getOrCreateTooltipEl 中 */
</style>
