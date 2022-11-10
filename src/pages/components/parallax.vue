<template>
  <div class="q-pa-md q-gutter-md">
    <div class="row justify-between">
      <q-parallax src="https://cdn.quasar.dev/img/parallax2.jpg">
        <h1 class="text-white">Basic</h1>
      </q-parallax>
    </div>
    <q-parallax :height="200" :speed="0.5">
      <template v-slot:media>
        <img src="https://cdn.quasar.dev/img/parallax1.jpg" />
      </template>

      <h1 class="text-white">Docks</h1>
    </q-parallax>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentParallax',
})
export default class myComponentParallax extends Vue {}
</script>

<style scoped lang='scss'>
</style>
