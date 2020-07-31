<template>
  <div class="dashboard-container">
    <div class="row justify-between align-center">
      <q-card class="my-card col-2 row justify-between a-center cursor-pointer" v-for="(item,index) in count" :key="index">
        <q-card-section>
          <q-icon :name="item.icon" class="fs-45" :class="`text-${item.color}`" />
        </q-card-section>
        <q-card-section class="column a-center justify-center">
          <p class="fs-16 text-grey p-b-10">{{item.name}}</p>
          <countTo :startVal="0" :endVal="item.num" :duration="4000" class="fs-20 bold"></countTo>
        </q-card-section>
      </q-card>
    </div>
    <q-card class="my-card m-t-20">
      <div id="chart1"></div>
    </q-card>
    <q-separator spaced inset vertical dark />
    <div class="row j-between a-center m-t-20">
      <q-card class="my-card p-l-10 p-r-10">
        <div id="chart2"></div>
      </q-card>
      <q-card class="my-card">
        <div id="chart3"></div>
      </q-card>
      <q-card class="my-card">
        <div id="chart4"></div>
      </q-card>
    </div>
    <div class="row j-between a-center m-t-20">
      <q-card>
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
      <div class="column">
        <q-card class="my-card">
          <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" />
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </q-card-section>
        </q-card>
        <q-card class="m-t-10">
          <div class="p-10">
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
          'I just feel like typing a really, really, REALY long message to annoy you...'
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
        text: '良',
        color: '#30b08f',
      },
      color: ['#1976d2', '#c03639', '#30b08f', '#fec171'],
    });
    gaugePlot.render();
    rosePlot.render();
    linePlot.render();
    radarPlot.render();
  }
}
</script>
<style lang="scss" scoped>
</style>
