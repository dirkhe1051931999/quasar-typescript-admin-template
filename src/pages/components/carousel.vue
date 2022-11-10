<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <img src="/p1.png" alt />
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <img src="/p2.png" alt />
        </q-carousel-slide>
      </q-carousel>

      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="300px"
        class="bg-purple text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <img src="/p1.png" alt />
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <img src="/p2.png" alt />
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentCarousel',
})
export default class myComponentCarousel extends Vue {
  private slide = 'style';
  private lorem =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.';
}
</script>

<style scoped lang='scss'>
</style>
