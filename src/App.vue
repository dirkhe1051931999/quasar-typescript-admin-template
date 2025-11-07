<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentApp',
})
export default class myComponentApp extends Vue {}
</script>

<style lang="scss"></style>