<template>
  <div>
    <q-chip v-for="(item, index) in colors" :key="index">
      <q-avatar :style="`background-color:${item}`" text-color="white">{{ index }}</q-avatar>
      {{ item }}
    </q-chip>
    <div>
      <div class="row">
        <span class="my-label green">label green</span>
        <span class="my-label blue">label blue</span>
        <span class="my-label yellow">label yellow</span>
        <span class="my-label red">label red</span>
        <span class="my-label grey">label grey</span>
      </div>
      <div class="row">
        <span class="my-button">button </span>
        <span class="my-button negative">button outline negative</span>
        <span class="my-button primary">button outline primary</span>
        <span class="my-button disabled">button outline disabled</span>
      </div>
      <div class="row">
        <span class="my-status green">status green</span>
        <span class="my-status blue">status blue</span>
        <span class="my-status yellow">status yellow</span>
        <span class="my-status red">status red</span>
        <span class="my-status grey">status grey</span>
      </div>
      <div class="row">
        <div class="my-warn text-critical q-mr-sm">warn critical</div>
        <div class="my-warn critical q-mr-sm"></div>
        <div class="my-warn text-major q-mr-sm">warn major</div>
        <div class="my-warn major q-mr-sm"></div>
        <div class="my-warn text-minor q-mr-sm">warn minor</div>
        <div class="my-warn minor q-mr-sm"></div>
        <div class="my-warn text-warning q-mr-sm">warn warning</div>
        <div class="my-warn warning q-mr-sm"></div>
        <div class="my-warn text-cleared q-mr-sm">warn cleared</div>
        <div class="my-warn cleared q-mr-sm"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentColor',
})
export default class myComponentColor extends Vue {
  private colors = [
    '#323232',
    '#5d5d5d',
    '#d0e3fc',
    'var(--my-grey-1)',
    '#0080ff',
    '#03a6ff',
    '#a3daff',
    '#cf2a2a',
    '#f1404b',
    '#fd999a',
    '#009d8d',
    '#4ab7bd',
    '#fec171',
    '#30b08f',
    '#889aa4',
    '#fe5578',
  ];
}
</script>
