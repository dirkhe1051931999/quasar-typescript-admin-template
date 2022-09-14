<template>
  <div class="timeline-wrapper">
    <div class="van-skeleton van-skeleton--animate">
      <div class="van-skeleton__content">
        <h3 class="van-skeleton__title" style="width: 40%"></h3>
        <div class="van-skeleton__row" style="width: 100%"></div>
        <div class="van-skeleton__row" style="width: 100%"></div>
        <div class="van-skeleton__row" style="width: 60%"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'page-middleware',
})
export default class extends Vue {
  created() {
    this.$router.push('/dashboard');
  }
}
</script>
<style scoped lang="scss">
@keyframes van-skeleton-blink {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}
.van-skeleton {
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  padding: 0 16px;
}
.van-skeleton--animate {
  animation: van-skeleton-blink 1.2s ease-in-out infinite;
  -webkit-animation: van-skeleton-blink 1.2s ease-in-out infinite;
}
.van-skeleton__content {
  width: 100%;
}
.van-skeleton__row,
.van-skeleton__title {
  height: 16px;
  background-color: #f2f3f5;
}
.van-skeleton__title {
  margin: 0;
}
.van-skeleton__title + .van-skeleton__row {
  margin-top: 20px;
}
.van-skeleton__row {
  margin-top: 12px;
}
</style>