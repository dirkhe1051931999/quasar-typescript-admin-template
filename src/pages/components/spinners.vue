<template>
  <div class="q-pa-md q-gutter-xs">
    <div
      class="q-gutter-md row justify-center"
      style="font-size: 3em; margin-bottom: 20px"
    >
      <q-spinner-audio color="secondary" />
      <q-spinner-ball color="red" />
      <q-spinner-bars color="purple" />
      <q-spinner-comment color="deep-purple" />
      <q-spinner-cube color="indigo" />
      <q-spinner-dots color="blue" />
      <q-spinner-facebook color="light-blue" />
      <q-spinner-gears color="cyan" />
      <q-spinner-grid color="teal" />
      <q-spinner-hearts color="green" />
      <q-spinner-hourglass color="light-green" />
      <q-spinner-infinity color="lime" />
      <q-spinner-ios color="yellow" />
      <q-spinner-oval color="amber" />
      <q-spinner-pie color="orange" />
      <q-spinner-puff color="deep-orange" />
      <q-spinner-radio color="brown" />
      <q-spinner-rings color="grey" />
      <q-spinner-tail color="blue-grey" />
    </div>
    <q-btn color="teal" @click="showLoading" label="Show Loading (Sanitized)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({ name: 'myComponentSpinners' })
export default class myComponentSpinners extends Vue {
  private timer: any;
  private showLoading() {
    this.$q.loading.show({
      message:
        'Some important <b>process</b> is in progress.<br/><span class="text-amber text-italic">Please wait...</span>',
      html: true,
    });
    // hiding in 3s
    this.timer = setTimeout(() => {
      this.$q.loading.hide();
      this.timer = void 0;
    }, 3000);
  }
}
</script>

<style scoped lang='scss'>
</style>
