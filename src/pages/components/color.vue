<template>
  <div>
    <q-chip v-for="(item, index) in colors" :key="index">
      <q-avatar :style="`background-color:${item}`" text-color="white">{{ index }}</q-avatar>
      {{ item }}
    </q-chip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
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

<style scoped lang='scss'>
</style>
