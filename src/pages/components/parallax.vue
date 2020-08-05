<template>
  <div class="w-full h-full relative">
    <q-card class="my-card">
      <img src="/p1.png" />

      <q-card-section>Lorem ipsum dolor sit amet, consectetur adipiscing elit</q-card-section>
    </q-card>
    <q-parallax>
      <template v-slot:media>
        <img src="/p2.png" class="absolute" />
      </template>
      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.45 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
        >
          <div class="text-h3 text-primary text-center">Quasar Framework</div>
          <div class="text-h6 text-dark text-center">v{{ $q.version }}</div>
        </div>
      </template>
    </q-parallax>
    <q-video src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" />
    <q-chat-message name="me" avatar="p2.ong" :text="['hey, how are you?']" stamp="7 minutes ago" sent bg-color="amber-7" />
    <q-chat-message name="me" avatar="/p1.png" :text="['hey, how are you?']" stamp="7 minutes ago" sent bg-color="amber-7" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style scoped lang='scss'>
</style>
