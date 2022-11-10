<template>
  <div class="app-container">
    <q-card title="menu 1">
      <router-view />
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({ name: 'myComponentMenu1' })
export default class myComponentMenu1 extends Vue {}
</script>


<style lang="scss" scoped>
</style>