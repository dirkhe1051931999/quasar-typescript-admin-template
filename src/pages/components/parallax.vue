<template>
  <div class="w-full h-full relative">
    <q-card class="l-h-2">
      <q-card-section>Lorem ipsum dolor sit amet, consectetur adipiscing elit</q-card-section>
      <q-card-section>
        How to Start Coding in 2021 | Learn How To Code On Your Own. In this video, I am sharing with you some of the best resources out there to
        start learning how to code. There are so many different paths you can take now to learn how to code and also become a Software Developer.
      </q-card-section>
    </q-card>
    <q-parallax :height="250" :speed="0.8">
      <template v-slot:media>
        <img src="https://cdn.quasar.dev/img/parallax1.jpg" />
      </template>
      <h1 class="text-white">Docks</h1>
    </q-parallax>
    <q-video src="https://www.youtube.com/embed/fThGKOgSo5I?rel=0" class="h-300 m-t-100 m-b-100" />
    <q-chat-message
      name="mayuko "
      avatar="https://yt3.ggpht.com/ytc/AAUvwnivjbUJ86-ZYW6puGnhv0Rey-osg2TL00CF-sEXXw=s48-c-k-c0x00ffffff-no-rj"
      :text="['coming man!']"
      stamp="10 minutes ago"
      sent
      class="m-b-50"
    />
    <q-chat-message
      name="mayuko "
      avatar="https://yt3.ggpht.com/ytc/AAUvwnivjbUJ86-ZYW6puGnhv0Rey-osg2TL00CF-sEXXw=s48-c-k-c0x00ffffff-no-rj"
      sent
      :text="[
        'my youtube home page is  <a class=link-type target=_blank href=https://www.youtube.com/channel/UCEDkO7wshcDZ7UZo17rPkzQ>https://www.youtube.com/channel/UCEDkO7wshcDZ7UZo17rPkzQ</a>',
      ]"
      stamp="7 minutes ago"
      class="m-b-100"
    />
    <q-chat-message
      name="老梁 "
      avatar="https://yt3.ggpht.com/ytc/AAUvwnhN0MMUQXUaqFJoHXyZN4PuGA4SvIHShPO0SidJ=s88-c-k-c0x00ffffff-no-rj"
      :text="['uhhh~', 'nice to meet you!']"
      stamp="5 minutes ago"
      class="m-b-100"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style scoped lang='scss'>
</style>
