<template>
  <div class="dashboard-container">
    <div class="row items-start">
      <div class="col-6 row items-center justify-between">
        <q-card
          class="w-p-49 text-left p-16 flex justify-between items-center m-b-24"
          v-for="(item, index) in count"
          :key="index"
        >
          <q-card-section
            class="column items-center justify-center"
            style="padding: 0"
          >
            <p class="fs-16 text-grey p-b-10">{{ item.name }}</p>
            <CountTo
              :startVal="0"
              :endVal="item.num"
              :duration="4000"
              class="fs-20 bold"
            ></CountTo>
          </q-card-section>
          <q-card-section style="padding: 0">
            <q-icon
              :name="item.icon"
              class="fs-45"
              :class="`text-${item.color}`"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="m-l-16 p-16">
          <div>
            <p class="fs-18 bold p-b-10">Overview</p>
            <p>
              <q-icon
                name="arrow_upward"
                class="text-green fs-18 bold"
              ></q-icon>
              4% more in 2022
            </p>
          </div>
          <div>
            <canvas id="chart1" style="width: 100%; height: 500px"></canvas>
          </div>
        </q-card>
        <div class="p-l-16 m-b-16 row m-t-16">
          <div class="col-6">
            <q-card class="text-center p-16">
              <p class="text-primary fs-48 bold">
                87 <span class="fs-18">m³</span>
              </p>
              <p class="fs-18 p-t-16 p-b-16">Water</p>
              <p class="fs-14 text-grey">Consumption</p>
            </q-card>
          </div>
          <div class="col-6 p-l-16">
            <q-card class="text-center p-16">
              <p class="text-primary fs-48 bold">
                417 <span class="fs-18">GB</span>
              </p>
              <p class="fs-18 p-t-16 p-b-16">Internet</p>
              <p class="fs-14 text-grey">All devices</p>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="row items-startm m-b-16 justify-between">
      <div class="col-6">
        <q-card class="h-275">
          <div class="header p-16 p-b-0 bold row items-center justify-between">
            <div class="title">Consumption by room</div>
            <q-icon name="help_outline" class="fs-20"></q-icon>
          </div>
          <div class="row p-16 items-start">
            <div class="left relative w-300">
              <div class="chart">
                <canvas
                  id="chart-consumption"
                  height="200"
                  width="300"
                ></canvas>
              </div>
              <div class="w-300 h-200 absolute left-16 top-52">
                <div class="bold absolute absolute-center">
                  <p class="fs-24">471.3</p>
                  <p class="fs-14">WATTS</p>
                </div>
              </div>
            </div>
            <div class="right col-7">
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span
                    class="badge w-20 h-20 b-r-7 block m-r-16"
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #7928ca,
                        #ff0080
                      );
                    "
                  ></span>
                  <span>Living Room</span>
                </div>
                <span class="col-2 text-center">15%</span>
              </div>
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span
                    class="badge w-20 h-20 b-r-7 block m-r-16"
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #627594,
                        #a8b8d8
                      );
                    "
                  ></span>
                  <span>Kitchen</span>
                </div>
                <span class="col-2 text-center">20%</span>
              </div>
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span
                    class="badge w-20 h-20 b-r-7 block m-r-16"
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #2152ff,
                        #21d4fd
                      );
                    "
                  ></span>
                  <span>Attic</span>
                </div>
                <span class="col-2 text-center">13%</span>
              </div>
              <div class="row b-bottom p-8 items-center">
                <div class="col-10 row items-center">
                  <span
                    class="
                      badge
                      w-20
                      h-20
                      b-r-7
                      block
                      m-r-16
                      w-20
                      h-20
                      b-r-7
                      block
                    "
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #17ad37,
                        #98ec2d
                      );
                    "
                  ></span>
                  <span>Garage</span>
                </div>
                <span class="col-2 text-center">32%</span>
              </div>
              <div class="row p-8 items-center">
                <div class="col-10 row items-center">
                  <span
                    class="badge w-20 h-20 b-r-7 block m-r-16"
                    style="
                      background-image: linear-gradient(
                        310deg,
                        #f53939,
                        #fbcf33
                      );
                    "
                  ></span>
                  <span>Basement</span>
                </div>
                <span class="col-2 text-center">20%</span>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-6 row">
        <div class="p-l-16 col-6">
          <q-card class="p-16">
            <div class="header fs-18 p-b-16">Consumption per day</div>
            <div>
              <canvas
                id="chart-cons-week"
                class="chart-canvas"
                height="200"
              ></canvas>
            </div>
          </q-card>
        </div>
        <div class="p-l-16 col-6">
          <q-card class="p-16">
            <div class="header fs-18 p-b-16">Consumption per day</div>
            <div class="text-center">
              <q-circular-progress
                show-value
                font-size="12px"
                :value="81"
                size="165px"
                :thickness="0.22"
                color="primary"
                track-color="grey-3"
                class="q-ma-md"
              >
                81%
              </q-circular-progress>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <q-separator spaced inset vertical dark />
    <div class="row items-center justify-between m-t-20 full-width">
      <q-card class="p-r-10 w-p-24" flat>
        <div id="chart2" style="width: 100%; height: 400px"></div>
      </q-card>
      <q-card class="w-p-24" flat>
        <div id="chart3" style="width: 100%; height: 400px"></div>
      </q-card>
      <q-card class="w-p-24" flat>
        <div id="chart4" style="width: 100%; height: 400px"></div>
      </q-card>
      <q-card flat class="w-p-24">
        <div id="chart5" style="width: 100%; height: 400px"></div>
      </q-card>
    </div>
    <div class="row m-t-20">
      <q-card class="m-r-20 w-p-48" flat>
        <q-list bordered>
          <q-item>
            <q-item-section>Icon as avatar</q-item-section>
            <q-item-section avatar>
              <q-icon color="warning" name="bluetooth" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Icon as avatar</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="bluetooth" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Avatar-type icon</q-item-section>
            <q-item-section avatar>
              <q-avatar color="teal" text-color="white" icon="bluetooth" />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Rounded avatar-type icon</q-item-section>
            <q-item-section avatar>
              <q-avatar
                rounded
                color="purple"
                text-color="white"
                icon="bluetooth"
              />
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Letter avatar-type</q-item-section>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">R</q-avatar>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple>
            <q-item-section>Image avatar</q-item-section>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Image square avatar</q-item-section>
            <q-item-section avatar>
              <q-avatar square>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Image rounded avatar</q-item-section>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple>
            <q-item-section>List item</q-item-section>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/mountains.jpg" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>List item</q-item-section>
            <q-item-section thumbnail>
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <q-card class="w-p-50" flat>
        <q-video
          src="https://www.youtube.com/embed/fThGKOgSo5I?rel=0"
          class="h-300"
        />
        <q-card-section>
          <div class="text-h6">What Is A Quasar?</div>
          <div class="text-subtitle2">by Fraser Cain</div>
        </q-card-section>
        <q-card-section class="q-pt-none l-h-2">
          In this short video explainer, Universe Today publisher Fraser Cain
          investigates the most powerful objects in the Universe: quasars. In
          just the last few decades, our understanding of quasars has developed
          in leaps and bounds.
        </q-card-section>
        <q-card-section class="q-pt-none l-h-2">
          I love it when scientists discover something unusual in nature. They
          have no idea what it is, and then over decades of research, evidence
          builds, and scientists grow to understand what's going on.. My
          favorite example? Quasars. Astronomers first knew they had a mystery
          on their hands in the nineteen-sixties (1960s) when they turned the
          first radio telescopes to the sky. They detected the radio waves
          streaming off the Sun, the Milky Way and a few stars, but they also
          turned up bizarre objects they couldn't explain. These objects were
          small and incredibly bright. They named them quasi-stellar-objects or
          "quasars", and then began to argue about what might be causing them.
        </q-card-section>
      </q-card>
      <q-card class="m-t-20 full-width" flat>
        <div class="p-20">
          <q-chat-message
            name="me"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="['hey, how are you?']"
            stamp="7 minutes ago"
            sent
            bg-color="amber-7"
          />
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar5.jpg"
            :text="[
              'doing fine, how r you?',
              'I just feel like typing a really, really, REALY long message to annoy you...',
            ]"
            size="6"
            stamp="4 minutes ago"
            text-color="white"
            bg-color="primary"
          />
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar5.jpg"
            :text="['Did it work?']"
            stamp="1 minutes ago"
            size="8"
            text-color="white"
            bg-color="primary"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-facing-decorator';
import _ from 'lodash';
import { CountTo } from 'vue3-count-to';
// import * as echarts from 'echarts';
import { Chart } from 'chart.js/auto';

interface count {
  name: string;
  num: number;
  icon: string;
  color: string;
}
@Component({
  name: 'DashboardComponent',
  components: {
    CountTo,
  },
})
export default class DashboardComponent extends Vue {
  private count: count[] = [
    { icon: 'person', num: 0, name: 'person', color: 'blue' },
    { icon: 'sms', num: 0, name: 'sms', color: 'red' },
    { icon: 'attach_money', num: 0, name: 'money', color: 'green' },
    { icon: 'local_grocery_store', num: 0, name: 'store', color: 'yellow' },
    { icon: 'sports_basketball', num: 0, name: 'sports', color: 'pink' },
    { icon: 'archive', num: 0, name: 'hello', color: 'blue' },
    { icon: 'swap_vertical_circle', num: 0, name: 'world', color: 'pink' },
    { icon: 'send_and_archive', num: 0, name: 'javascript', color: 'red' },
    { icon: 'add_circle_outline', num: 0, name: 'dart', color: 'green' },
    { icon: 'content_paste', num: 0, name: 'flutter', color: 'yellow' },
    { icon: 'line_weight', num: 0, name: 'vue', color: 'pink' },
    { icon: 'horizontal_split', num: 0, name: 'react', color: 'blue' },
    { icon: 'cancel_schedule_send', num: 0, name: 'angular', color: 'green' },
    { icon: 'shop_two', num: 0, name: 'weex', color: 'red' },
  ];
  created() {
    for (let item of this.count) {
      item.num = _.random(1000, 4000, false);
    }
  }
  mounted() {
    this.initBar();
    this.initTang();
    this.initRose();
    // this.initGauge();
    // this.initRadar();
  }
  public initBar() {
    const xAxisData = [];
    const seriesData = [];
    for (let item of this.count) {
      xAxisData.push(item.name);
      seriesData.push(item.num);
    }
    // console.log();
    var chartDom: CanvasRenderingContext2D | null = (
      document.getElementById('chart1') as HTMLCanvasElement
    )?.getContext('2d');
    var gradientStroke1 = chartDom?.createLinearGradient(0, 230, 0, 50);

    gradientStroke1?.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1?.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1?.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    var gradientStroke2 = chartDom?.createLinearGradient(0, 230, 0, 50);

    gradientStroke2?.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2?.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2?.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors
    new Chart(chartDom!, {
      type: 'line',
      data: {
        labels: xAxisData,
        datasets: [
          {
            label: 'Websites',
            tension: 0.4,
            pointRadius: 0,
            borderColor: '#5469d4',
            borderWidth: 3,
            backgroundColor: gradientStroke2,
            fill: true,
            data: seriesData,
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
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: '#b2b9bf',
              padding: 20,
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
  public initTang() {
    var chartDom: CanvasRenderingContext2D | null = (
      document.getElementById('chart-consumption') as HTMLCanvasElement
    )?.getContext('2d');
    var gradientStroke1 = chartDom?.createLinearGradient(0, 230, 0, 50);

    gradientStroke1?.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1?.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1?.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    new Chart(chartDom!, {
      type: 'doughnut',
      data: {
        labels: ['Living Room', 'Kitchen', 'Attic', 'Garage', 'Basement'],
        datasets: [
          {
            label: 'Consumption',
            weight: 9,
            borderRadius: 2,
            borderWidth: 2,
            backgroundColor: [
              '#FF0080',
              '#A8B8D8',
              '#21d4fd',
              '#98ec2d',
              '#ff667c',
            ],
            data: [15, 20, 13, 32, 20],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: 90,
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
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });
  }
  public initRose() {
    var ctx = (
      document.getElementById('chart-cons-week') as HTMLCanvasElement
    )?.getContext('2d');

    new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Watts',
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: '#3A416F',
            data: [150, 230, 380, 220, 420, 200, 70],
            maxBarThickness: 6,
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
              display: false,
              drawOnChartArea: true,
              drawTicks: false,
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#9ca2b7',
            },
          },
          x: {
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
              color: '#9ca2b7',
            },
          },
        },
      },
    });
  }
  public initGauge() {
    // var chartDom: any = document.getElementById('chart4');
    // var myChart = echarts.init(chartDom);
    // var option;
    // option = {
    //   series: [
    //     {
    //       type: 'gauge',
    //       axisLine: {
    //         lineStyle: {
    //           width: 30,
    //           color: [
    //             [0.3, '#67e0e3'],
    //             [0.7, '#37a2da'],
    //             [1, '#fd666d'],
    //           ],
    //         },
    //       },
    //       pointer: {
    //         itemStyle: {
    //           color: 'auto',
    //         },
    //       },
    //       axisTick: {
    //         distance: -30,
    //         length: 8,
    //         lineStyle: {
    //           color: '#fff',
    //           width: 2,
    //         },
    //       },
    //       splitLine: {
    //         distance: -30,
    //         length: 30,
    //         lineStyle: {
    //           color: '#fff',
    //           width: 4,
    //         },
    //       },
    //       axisLabel: {
    //         color: 'auto',
    //         distance: 40,
    //         fontSize: 20,
    //       },
    //       detail: {
    //         valueAnimation: true,
    //         formatter: '{value} km/h',
    //         color: 'auto',
    //       },
    //       data: [
    //         {
    //           value: 70,
    //         },
    //       ],
    //     },
    //   ],
    // };
    // setInterval(() => {
    //   myChart.setOption({
    //     series: [
    //       {
    //         data: [
    //           {
    //             value: +(Math.random() * 100).toFixed(2),
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // }, 2000);
    // option && myChart.setOption(option);
  }
  public initRadar() {
    // var chartDom: any = document.getElementById('chart5');
    // var myChart = echarts.init(chartDom);
    // var option;
    // option = {
    //   legend: {
    //     data: ['Allocated Budget', 'Actual Spending'],
    //   },
    //   radar: {
    //     // shape: 'circle',
    //     indicator: [
    //       { name: 'Sales', max: 6500 },
    //       { name: 'Administration', max: 16000 },
    //       { name: 'Information Technology', max: 30000 },
    //       { name: 'Customer Support', max: 38000 },
    //       { name: 'Development', max: 52000 },
    //       { name: 'Marketing', max: 25000 },
    //     ],
    //   },
    //   series: [
    //     {
    //       name: 'Budget vs spending',
    //       type: 'radar',
    //       data: [
    //         {
    //           value: [4200, 3000, 20000, 35000, 50000, 18000],
    //           name: 'Allocated Budget',
    //         },
    //         {
    //           value: [5000, 14000, 28000, 26000, 42000, 21000],
    //           name: 'Actual Spending',
    //         },
    //       ],
    //     },
    //   ],
    // };
    // option && myChart.setOption(option);
  }
}
</script>
<style lang="scss" scoped>
</style>
