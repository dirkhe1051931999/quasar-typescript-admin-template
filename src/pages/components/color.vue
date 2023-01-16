<template>
  <div>
    <q-chip v-for="(item, index) in colors" :key="index">
      <q-avatar :style="`background-color:${item}`" text-color="white">{{
        index
      }}</q-avatar>
      {{ item }}
    </q-chip>
    <div class="row">
      <div class="my-status grey">my-status grey</div>
      <div class="my-status green">my-status green</div>
      <div class="my-status red">my-status red</div>
      <div class="my-status yellow">my-status yellow</div>
      <div class="my-status blue">my-status blue</div>
    </div>
    <div class="row">
      <span class="my-button outline primary">my-button outline primary</span>
      <span class="my-button outline negative">my-button outline negative</span>
      <span class="my-button disabled">my-button outline</span>
    </div>
    <div class="row">
      <span class="my-label blue">my-label blue</span>
      <span class="my-label green">my-label green</span>
      <span class="my-label yellow">my-label yellow</span>
      <span class="my-label red">my-label red</span>
      <span class="my-label grey">my-label grey</span>
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
    '#f5f5f5',
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
