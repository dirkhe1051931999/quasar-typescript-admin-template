<template>
  <div class="dashboard-container">
    <div class="row justify-between align-center ">
      <q-card class=" w-100 text-center" v-for="(item, index) in count" :key="index">
        <q-card-section>
          <q-icon :name="item.icon" class="fs-45" :class="`text-${item.color}`" />
        </q-card-section>
        <q-card-section class="column a-center justify-center">
          <p class="fs-16 text-grey p-b-10">{{ item.name }}</p>
          <countTo :startVal="0" :endVal="item.num" :duration="4000" class="fs-20 bold"></countTo>
        </q-card-section>
      </q-card>
    </div>
    <q-card class="m-t-20">
      <div id="chart1"></div>
    </q-card>
    <q-separator spaced inset vertical dark />
    <div class="row a-center m-t-20">
      <q-card class="p-l-10 p-r-10 m-r-20 w-400">
        <div id="chart2"></div>
      </q-card>
      <q-card class="m-r-20 w-500">
        <div id="chart3"></div>
      </q-card>
      <q-card class="m-r-20">
        <div id="chart4"></div>
      </q-card>
      <q-card>
        <div id="chart5"></div>
      </q-card>
    </div>
    <div class="row m-t-20">
      <q-card class="m-r-20 w-p-48">
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
      <q-card class="w-p-50">
        <q-video src="https://www.youtube.com/embed/fThGKOgSo5I?rel=0" class="h-300" />
        <q-card-section>
          <div class="text-h6">What Is A Quasar?</div>
          <div class="text-subtitle2">by Fraser Cain</div>
        </q-card-section>
        <q-card-section class="q-pt-none l-h-2">
          In this short video explainer, Universe Today publisher Fraser Cain investigates the most powerful objects in the Universe: quasars. In just
          the last few decades, our understanding of quasars has developed in leaps and bounds.
        </q-card-section>
        <q-card-section class="q-pt-none l-h-2">
          I love it when scientists discover something unusual in nature. They have no idea what it is, and then over decades of research, evidence
          builds, and scientists grow to understand what's going on.. My favorite example? Quasars. Astronomers first knew they had a mystery on their
          hands in the nineteen-sixties (1960s) when they turned the first radio telescopes to the sky. They detected the radio waves streaming off
          the Sun, the Milky Way and a few stars, but they also turned up bizarre objects they couldn't explain. These objects were small and
          incredibly bright. They named them quasi-stellar-objects or "quasars", and then began to argue about what might be causing them.
        </q-card-section>
      </q-card>
      <q-card class="m-t-20 w-full">
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
            :text="['doing fine, how r you?', 'I just feel like typing a really, really, REALY long message to annoy you...']"
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
import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';
import countTo from 'vue-count-to';
import { Column, Radar, StackedRose, MeterGauge } from '@antv/g2plot';
interface count {
  name: string;
  num: number;
  icon: string;
  color: string;
}
@Component({
  name: 'Index',
  components: {
    countTo,
  },
})
export default class extends Vue {
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
    const linePlot = new Column(document.getElementById('chart1'), {
      title: {
        visible: true,
        text: 'Data',
      },
      forceFit: true,
      padding: 'auto',
      data: this.count,
      xField: 'name',
      yField: 'num',
      label: {
        visible: true,
        style: {
          fill: '#1976d2',
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.6,
        },
      },
    });
    const radarPlot = new Radar(document.getElementById('chart2'), {
      title: {
        visible: true,
      },
      data: this.count,
      angleField: 'icon',
      radiusField: 'name',
      seriesField: 'num',
      radiusAxis: {
        grid: {
          line: {
            type: 'line',
          },
        },
      },
      line: {
        visible: true,
      },
      point: {
        visible: true,
        shape: 'circle',
      },
      legend: {
        visible: true,
        position: 'bottom-center',
      },
    });
    const rosePlot = new StackedRose(document.getElementById('chart3'), {
      forceFit: true,
      title: {
        visible: true,
      },
      description: {
        visible: true,
      },
      radius: 0.8,
      data: this.count,
      radiusField: 'icon',
      categoryField: 'name',
      stackField: 'num',
      label: {
        visible: true,
        type: 'inner',
      },
    });
    const gaugePlot = new MeterGauge(document.getElementById('chart4'), {
      title: {
        visible: true,
      },
      width: 300,
      height: 400,
      value: 60,
      min: 0,
      max: 100,
      range: [0, 25, 50, 75, 100],
      statistic: {
        visible: true,
        text: 'Nice',
        color: '#30b08f',
      },
      color: ['#1976d2', '#c03639', '#30b08f', '#fec171'],
    });
    const gaugePlot2 = new MeterGauge(document.getElementById('chart5'), {
      title: {
        visible: true,
      },
      width: 300,
      height: 400,
      value: 60,
      min: 0,
      max: 100,
      range: [0, 25, 50, 75, 100],
      statistic: {
        visible: true,
        text: 'Fail',
        color: '#c03639',
      },
      color: ['#1976d2', '#c03639', '#30b08f', '#fec171'],
    });
    gaugePlot.render();
    gaugePlot2.render();
    rosePlot.render();
    linePlot.render();
    radarPlot.render();
  }
}
</script>
<style lang="scss" scoped>
</style>
