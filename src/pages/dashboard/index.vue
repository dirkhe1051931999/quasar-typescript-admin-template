<template>
  <div class="dashboard-container">
    <div class="row justify-between align-center">
      <q-card flat class="w-100 text-center" v-for="(item, index) in count" :key="index">
        <q-card-section>
          <q-icon :name="item.icon" class="fs-45" :class="`text-${item.color}`" />
        </q-card-section>
        <q-card-section class="column items-center justify-center">
          <p class="fs-16 text-grey p-b-10">{{ item.name }}</p>
          <CountTo :startVal="0" :endVal="item.num" :duration="4000" class="fs-20 bold"></CountTo>
        </q-card-section>
      </q-card>
    </div>
    <q-card class="m-t-20" flat>
      <div id="chart1" style="width:100%;height:500px"></div>
    </q-card>
    <q-separator spaced inset vertical dark />
    <div class="row items-center justify-between m-t-20 full-width">
      <q-card class="p-r-10 w-p-24" flat>
        <div id="chart2" style="width:100%;height:400px"></div>
      </q-card>
      <q-card class="w-p-24" flat>
        <div id="chart3" style="width:100%;height:400px"></div>
      </q-card>
      <q-card class="w-p-24" flat>
        <div id="chart4" style="width:100%;height:400px"></div>
      </q-card>
      <q-card flat class="w-p-24">
        <div id="chart5" style="width:100%;height:400px"></div>
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
              <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
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
        <q-video src="https://www.youtube.com/embed/fThGKOgSo5I?rel=0" class="h-300" />
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
import * as echarts from 'echarts';

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
    this.initGauge();
    this.initRadar();
  }
  public initBar() {
    const xAxisData = [];
    const seriesData = [];
    for (let item of this.count) {
      xAxisData.push(item.name);
      seriesData.push(item.num);
    }
    var chartDom: any = document.getElementById('chart1');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      xAxis: {
        type: 'category',
        data: xAxisData,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };
    option && myChart.setOption(option);
  }
  public initTang() {
    var chartDom: any = document.getElementById('chart2');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      polar: {
        radius: [30, '80%'],
      },
      angleAxis: {
        max: 4,
        startAngle: 75,
      },
      radiusAxis: {
        type: 'category',
        data: ['a', 'b', 'c', 'd'],
      },
      tooltip: {},
      series: {
        type: 'bar',
        data: [2, 1.2, 2.4, 3.6],
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}: {c}',
        },
      },
    };

    option && myChart.setOption(option);
  }
  public initRose() {
    var chartDom: any = document.getElementById('chart3');
    var myChart = echarts.init(chartDom);
    var option;

    var data = [
      {
        name: 'Grandpa',
        children: [
          {
            name: 'Uncle Leo',
            value: 15,
            children: [
              {
                name: 'Cousin Jack',
                value: 2,
              },
              {
                name: 'Cousin Mary',
                value: 5,
                children: [
                  {
                    name: 'Jackson',
                    value: 2,
                  },
                ],
              },
              {
                name: 'Cousin Ben',
                value: 4,
              },
            ],
          },
          {
            name: 'Father',
            value: 10,
            children: [
              {
                name: 'Me',
                value: 5,
              },
              {
                name: 'Brother Peter',
                value: 1,
              },
            ],
          },
        ],
      },
      {
        name: 'Nancy',
        children: [
          {
            name: 'Uncle Nike',
            children: [
              {
                name: 'Cousin Betty',
                value: 1,
              },
              {
                name: 'Cousin Jenny',
                value: 2,
              },
            ],
          },
        ],
      },
    ];
    option = {
      series: {
        type: 'sunburst',
        // emphasis: {
        //     focus: 'ancestor'
        // },
        data: data,
        radius: [0, '90%'],
        label: {
          rotate: 'radial',
        },
      },
    };
    option && myChart.setOption(option);
  }
  public initGauge() {
    var chartDom: any = document.getElementById('chart4');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            color: 'auto',
            distance: 40,
            fontSize: 20,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} km/h',
            color: 'auto',
          },
          data: [
            {
              value: 70,
            },
          ],
        },
      ],
    };
    setInterval(() => {
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: +(Math.random() * 100).toFixed(2),
              },
            ],
          },
        ],
      });
    }, 2000);
    option && myChart.setOption(option);
  }
  public initRadar() {
    var chartDom: any = document.getElementById('chart5');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      legend: {
        data: ['Allocated Budget', 'Actual Spending'],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 },
        ],
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget',
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending',
            },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  }
}
</script>
<style lang="scss" scoped>
</style>
