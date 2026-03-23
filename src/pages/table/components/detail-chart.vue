<template>
  <div>
    <j-c-title-line label="Line chart" class="q-my-md" />
    <j-ch-line :datasets="chartParams.chart.datasets" :labels="chartParams.chart.labels" />
    <j-c-title-line label="Bar chart" class="q-my-md" />
    <j-ch-bar :datasets="chartParams.bar.datasets" :labels="chartParams.bar.labels" />
    <j-c-title-line label="Pie chart" class="q-my-md" />
    <j-ch-pie-doughnut :datasets="chartParams.pie.datasets" :labels="chartParams.pie.labels" type="pie" />
    <j-c-title-line label="Doughnut chart" class="q-my-md" />
    <j-ch-pie-doughnut :labels="chartParams.doughnut.labels" :datasets="chartParams.doughnut.datasets" type="doughnut" />
    <j-c-title-line label="Bar line mixed chart" class="q-my-md" />
    <j-ch-bar-line :labels="chartParams.mixed.labels" :datasets="chartParams.mixed.datasets" />
    <j-c-title-line label="Bubble chart" class="q-my-md" />
    <j-ch-bubble :datasets="chartParams.bubble.datasets" :labels="chartParams.bubble.labels" />
    <j-c-title-line label="Radar chart" class="q-my-md" />
    <j-ch-radar :datasets="chartParams.radar.datasets" :labels="chartParams.radar.labels" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { JChBar, JChRadar, JChBubble, JChPieDoughnut, JChBarLine, JCTitleLine, JChLine } from 'qcpt';

@Component({
  name: 'DetailChartComponent',
  components: { JChBar, JChRadar, JChBubble, JChPieDoughnut, JChBarLine, JCTitleLine, JChLine },
})
export default class DetailChartComponent extends Vue {
  public chartParams = {
    chart: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: 'Organic Search',
          pointBackgroundColor: '#e93030',
          borderColor: '#e93030',
          data: [150, 140, 320, 280, 550, 210, 480, 290, 520],
        },
        {
          label: 'Referral',
          pointBackgroundColor: '#5F63F2',
          borderColor: '#5F63F2',
          data: [130, 190, 140, 240, 390, 250, 380, 270, 450],
        },
        {
          label: 'Direct',
          pointBackgroundColor: '#17c1e8',
          borderColor: '#17c1e8',
          data: [140, 180, 170, 190, 130, 190, 240, 230, 300],
        },
      ],
    },
    pie: {
      labels: ['Organic Search', 'Referral', 'Direct', 'Paid Search', 'Social', 'Email', 'Display'],
      datasets: [
        {
          data: [150, 140, 320, 280, 550, 210, 480],
          backgroundColor: ['#e93030', '#5F63F2', '#17c1e8', '#fbcf33', '#ff8b5f', '#a8b8d8', '#3A416F'],
        },
      ],
    },
    mixed: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          type: 'line',
          label: 'Organic Search',
          pointBackgroundColor: '#e93030',
          borderColor: '#e93030',
          data: [150, 140, 320, 280, 550, 210, 480, 290, 520],
        },
        {
          type: 'bar',
          label: 'Referral',
          backgroundColor: '#5F63F2',
          data: [130, 190, 140, 240, 390, 250, 380, 270, 450],
        },
      ],
    },
    doughnut: {
      labels: ['Organic Search', 'Referral', 'Direct', 'Paid Search', 'Social', 'Email', 'Display'],
      datasets: [
        {
          data: [150, 140, 320, 280, 550, 210, 480],
          backgroundColor: ['#e93030', '#5F63F2', '#17c1e8', '#fbcf33', '#ff8b5f', '#a8b8d8', '#3A416F'],
        },
      ],
    },
    bubble: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: '城市 A',
          data: [
            { x: 25, y: 50000, r: 10 },
            { x: 45, y: 120000, r: 25 },
            { x: 60, y: 80000, r: 15 },
          ],
          backgroundColor: 'rgba(203, 12, 159, 0.7)',
        },
        {
          label: '城市 B',
          data: [
            { x: 30, y: 65000, r: 12 },
            { x: 55, y: 95000, r: 8 },
            { x: 40, y: 150000, r: 30 },
          ],
          backgroundColor: 'rgba(58, 65, 111, 0.7)',
        },
      ],
    },
    radar: {
      labels: ['沟通', '技术栈', '领导力', '项目管理', '创新能力', '抗压能力'],
      datasets: [
        {
          label: '员工 A',
          // 确保数据顺序与 labels 对应
          data: [90, 75, 80, 70, 60, 95],
          backgroundColor: 'rgba(58,65,111,0.3)', // 区域填充色
          borderColor: '#3A416F', // 边框线颜色
          borderWidth: 2,
          pointBackgroundColor: '#3A416F',
        },
        {
          label: '员工 B',
          data: [70, 95, 65, 85, 75, 70],
          backgroundColor: 'rgba(203,12,159,0.3)',
          borderColor: '#cb0c9f',
          borderWidth: 2,
          pointBackgroundColor: '#cb0c9f',
        },
      ],
    },
    bar: {
      labels: ['0-20', '20-30', '30-40', '40-50', '50-60', '60-70'],
      datasets: [
        {
          label: '按年龄段的销售额',
          data: [5000, 12000, 18000, 15000, 9000, 7000],
          backgroundColor: '#3A416F',
          borderColor: '#3A416F',
          borderWidth: 0,
        },
        {
          label: '按年龄段的利润',
          data: [2000, 5000, 8000, 6000, 3000, 2500],
          backgroundColor: '#cb0c9f',
          borderColor: '#cb0c9f',
          borderWidth: 0,
        },
      ],
    },
  };
}
</script>

<style scoped></style>
