<template>
  <div class="dashboard-container">
    <q-intersection once transition="jump-up">
      <div class="col-12 q-mb-md">
        <q-card class="q-pa-lg text-black">
          <div class="row items-center justify-center">
            <div class="col-10">
              <div class="numbers">
                <p class="text-black">Wheather today</p>
                <h5 class="text-black">San Francisco - 29°C</h5>
              </div>
            </div>
            <div class="col-2 text-left">
              <img class="w-120" src="~assets/icon-sun-cloud.png" alt="image sun" />
              <h5 class="mb-0 text-white text-end me-1">Cloudy</h5>
            </div>
          </div>
        </q-card>
      </div>
    </q-intersection>

    <q-intersection once transition="jump-up">
      <div class="col-12 q-mb-md">
        <q-card class="q-pa-lg">
          <div class="text-h6 q-mb-md">Atomic CSS Showcase (from css/lib)</div>
          <AtomicShowcase />
        </q-card>
      </div>
    </q-intersection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { CountTo } from 'vue3-count-to';
import AtomicShowcase from './components/atomic-showcase.vue';

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
    AtomicShowcase,
  },
})
export class DashboardComponent extends Vue {
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
}
export default DashboardComponent;
</script>
<style lang="scss"></style>