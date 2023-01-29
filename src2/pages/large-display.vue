<template>
  <div>
    <div class="dataScreen-container">
      <div class="dataScreen" ref="dataScreenRef">
        <div class="dataScreen-header">
          <div class="header-lf">
            <span class="header-screening" @click="toHome">Home</span>
          </div>
          <div class="header-ct">
            <div class="header-ct-title">
              <span>Visualization data display platform</span>
              <div class="header-ct-warning">
                Platform peak warning information (2 items)
              </div>
            </div>
          </div>
          <div class="header-rg">
            <span class="header-download">Reports</span>
            <span class="header-time">Current time: {{ time }}</span>
          </div>
        </div>
        <div class="dataScreen-main">
          <div class="dataScreen-lf">
            <div class="dataScreen-top">
              <div class="dataScreen-main-title">
                <span>Real-time visitor</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <RealTimeAccessChart ref="RealTimeAccessRef" />
              </div>
            </div>
            <div class="dataScreen-center">
              <div class="dataScreen-main-title">
                <span>Male to female ratio</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <MaleFemaleRatioChart ref="MaleFemaleRatioRef" />
              </div>
            </div>
            <div class="dataScreen-bottom">
              <div class="dataScreen-main-title">
                <span>Age Ratio</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <AgeRatioChart ref="AgeRatioRef" />
              </div>
            </div>
          </div>
          <div class="dataScreen-ct">
            <div class="dataScreen-map">
              <div class="dataScreen-map-title">passenger flow</div>
              <ChinaMapChart ref="MapchartRef" />
            </div>
            <div class="dataScreen-cb">
              <div class="dataScreen-main-title">
                <span>Visitor volume trend chart for the next 30 days</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <OverNext30Chart ref="OverNext30Ref" />
              </div>
            </div>
          </div>
          <div class="dataScreen-rg">
            <div class="dataScreen-top">
              <div class="dataScreen-main-title">
                <span>Popular scenic spots ranking</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <HotPlateChart ref="HotPlateRef" />
              </div>
            </div>
            <div class="dataScreen-center">
              <div class="dataScreen-main-title">
                <span>Annual Visitor Volume Comparison</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <AnnualUseChart ref="AnnualUseRef" />
              </div>
            </div>
            <div class="dataScreen-bottom">
              <div class="dataScreen-main-title">
                <span>Reservation Channel Statistics</span>
                <img src="./images/dataScreen-title.png" alt="" />
              </div>
              <!-- chart区域 -->
              <div class="dataScreen-main-chart">
                <PlatformSourceChart ref="PlatformSourceRef" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { ECharts } from 'echarts';
import ChinaMapChart from 'src2/pages/components/chinaMapChart.vue';
import AgeRatioChart from 'src2/pages/components/ageRatioChart.vue';
import AnnualUseChart from 'src2/pages/components/annualUseChart.vue';
import HotPlateChart from 'src2/pages/components/hotPlateChart.vue';
import MaleFemaleRatioChart from 'src2/pages/components/maleFemaleRatioChart.vue';
import OverNext30Chart from 'src2/pages/components/overNext30Chart.vue';
import PlatformSourceChart from 'src2/pages/components/platformSourceChart.vue';
import RealTimeAccessChart from 'src2/pages/components/realTimeAccessChart.vue';
import { randomNum, useTime } from 'src2/utils/tools';
// 初始化 charts参数
let ageData = [
  {
    value: 200,
    name: '10岁以下',
    percentage: '16%',
  },
  {
    value: 110,
    name: '10 - 18岁',
    percentage: '8%',
  },
  {
    value: 150,
    name: '18 - 30岁',
    percentage: '12%',
  },
  {
    value: 310,
    name: '30 - 40岁',
    percentage: '24%',
  },
  {
    value: 250,
    name: '40 - 60岁',
    percentage: '20%',
  },
  {
    value: 260,
    name: '60岁以上',
    percentage: '20%',
  },
];
let hotData = [
  {
    value: 79999,
    name: '峨眉山',
    percentage: '80%',
    maxValue: 100000,
  },
  {
    value: 59999,
    name: '稻城亚丁',
    percentage: '60%',
    maxValue: 100000,
  },
  {
    value: 49999,
    name: '九寨沟',
    percentage: '50%',
    maxValue: 100000,
  },
  {
    value: 39999,
    name: '万里长城',
    percentage: '40%',
    maxValue: 100000,
  },
  {
    value: 29999,
    name: '北京故宫',
    percentage: '30%',
    maxValue: 100000,
  },
];
let platFromData = [
  {
    value: 40,
    name: '智慧文旅平台',
    percentage: '40%',
  },
  {
    value: 10,
    name: '携程',
    percentage: '10%',
  },
  {
    value: 20,
    name: '飞猪',
    percentage: '20%',
  },
  {
    value: 30,
    name: '其他渠道',
    percentage: '30%',
  },
];
let annualData = [
  {
    label: `${new Date().getFullYear() - 2}年`,
    value: [
      '184',
      '90',
      '120',
      '0',
      '30',
      '100',
      '80',
      '40',
      '20',
      '510',
      '350',
      '180',
    ],
  },
  {
    label: `${new Date().getFullYear() - 1}年`,
    value: [
      '118',
      '509',
      '366',
      '162',
      '380',
      '123',
      '321',
      '158',
      '352',
      '474',
      '154',
      '22',
    ],
  },
  {
    label: `${new Date().getFullYear()}年`,
    value: [
      '548',
      '259',
      '113',
      '90',
      '69',
      '512',
      '23',
      '49',
      '28',
      '420',
      '313',
      '156',
    ],
  },
];
let mapData = [
  {
    fromName: '北京',
    toName: '上海',
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891],
    ],
  },
  {
    fromName: '上海',
    toName: '北京',
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '北京',
    toName: '广州',
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196],
    ],
  },
  {
    fromName: '广州',
    toName: '北京',
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '北京',
    toName: '成都',
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617],
    ],
  },
  {
    fromName: '成都',
    toName: '北京',
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '成都',
    toName: '新疆维吾尔自治区',
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801],
    ],
  },
  {
    fromName: ' 新疆维吾尔自治区',
    toName: '成都',
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617],
    ],
  },
];
interface ChartProps {
  [key: string]: ECharts | null;
}
@Component({
  name: 'largeDisplayComponent',
  components: {
    AgeRatioChart,
    ChinaMapChart,
    AnnualUseChart,
    HotPlateChart,
    MaleFemaleRatioChart,
    OverNext30Chart,
    PlatformSourceChart,
    RealTimeAccessChart,
  },
})
export default class largeDisplayComponent extends Vue {
  declare $refs: any;
  mounted() {
    // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
    if (this.$refs.dataScreenRef) {
      this.$refs.dataScreenRef.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`;
      this.$refs.dataScreenRef.style.width = '1920px';
      this.$refs.dataScreenRef.style.height = '1080px';
    }
    this.initCharts();
    this.timer = setInterval(() => {
      this.time = useTime().nowTime;
    }, 1000);
    // 为浏览器绑定事件
    window.addEventListener('resize', this.resize);
  }
  beforeUnMounted() {
    window.removeEventListener('resize', this.resize);
    clearInterval(this.timer!);
    Object.values(this.dataScreen).forEach((val: any) => val?.dispose());
  }
  // 获取当前时间
  private timer: NodeJS.Timer | null = null;
  private time = useTime().nowTime;
  private dataScreen: ChartProps = {
    chart1: null,
    chart2: null,
    chart3: null,
    chart4: null,
    chart5: null,
    chart6: null,
    chart7: null,
    mapChart: null,
  };
  private toHome() {
    location.href = `${location.origin}#/dashboard`;
  }
  // 根据浏览器大小推断缩放比例
  private getScale(width = 1920, height = 1080) {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
  }
  private resize() {
    if (this.$refs.dataScreenRef) {
      this.$refs.dataScreenRef.style.transform = `scale(${this.getScale()}) translate(-50%, -50%)`;
    }
    // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
    Object.values(this.dataScreen).forEach((chart) => {
      chart && chart.resize();
    });
  }
  private initCharts() {
    this.dataScreen.chart1 = this.$refs.RealTimeAccessRef.initChart(
      0.5
    ) as ECharts;
    this.dataScreen.chart2 = this.$refs.AgeRatioRef.initChart(
      ageData
    ) as ECharts;
    this.dataScreen.chart3 = this.$refs.AnnualUseRef.initChart({
      data: annualData,
      unit: annualData.map((val: any) => val.label),
      columns: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      colors: ['#FFA600', '#007AFE', '#FF4B7A'],
    }) as ECharts;
    this.dataScreen.chart4 = this.$refs.HotPlateRef.initChart({
      data: hotData,
      colors: ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'],
    }) as ECharts;
    this.dataScreen.chart5 = this.$refs.MaleFemaleRatioRef.initChart({
      man: 0.6,
      woman: 0.4,
    }) as ECharts;
    this.dataScreen.chart6 = this.$refs.OverNext30Ref.initChart({
      unit: ['访问量'],
      data: new Array(30).fill('').map((val) => {
        val = randomNum(1, 20000);
        return val;
      }),
    }) as ECharts;
    this.dataScreen.chart7 = this.$refs.PlatformSourceRef.initChart({
      data: platFromData,
      colors: [
        '#078dbc',
        '#6ad40b',
        '#6172fc',
        '#1786ff',
        '#ffbe2f',
        '#4dc89d',
        '#b797df',
        '#ffd3aa',
      ],
    }) as ECharts;
    this.dataScreen.mapChart = this.$refs.MapchartRef.initChart(
      mapData
    ) as ECharts;
  }
}
</script>


<style lang="scss" scoped>
@import 'src2/pages/styles/large-display.scss';
</style>