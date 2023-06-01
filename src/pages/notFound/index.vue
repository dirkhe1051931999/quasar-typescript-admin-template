<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>
      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>
      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/dashboard" label="Go Home" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponents404',
})
export default class myComponents404 extends Vue {
  mounted() {
    this.$router.push('/dashboard');
  }
}
</script>

<style lang="scss" scoped></style>
