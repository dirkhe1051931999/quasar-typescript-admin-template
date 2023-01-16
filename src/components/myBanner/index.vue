<template>
  <q-banner
    dense
    class="my-banner"
    v-show="show"
    :class="[bannerType, showClose ? 'p-r-32' : 'p-r-16']"
  >
    <template v-slot:avatar>
      <q-icon
        name="info"
        class="icon"
        :class="[
          {
            'text-green': bannerType === 'success',
            'text-negative': bannerType === 'negative',
            'text-yellow': bannerType === 'warn',
          },
          bannerType,
        ]"
      />
    </template>
    <div class="content" :id="bid + '-' + bannerType + '-banner-content'"></div>
    <div class="close" @click.prevent.stop="show = false" v-if="showClose">
      <q-icon name="cancel"></q-icon>
    </div>
  </q-banner>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({ name: 'BannerComponent' })
export default class BannerComponent extends Vue {
  @Prop({ default: '' }) content!: string;
  @Prop({ default: '' }) bid!: string;
  @Prop({ default: false }) showClose?: boolean;
  @Prop({ default: 'success' }) bannerType!: string;
  public show = true;
  mounted() {
    if (
      document.querySelector(`#${this.bid}-${this.bannerType}-banner-content`)
    ) {
      document.querySelector(
        `#${this.bid}-${this.bannerType}-banner-content`
      )!.innerHTML = this.content;
    }
  }
}
</script>


<style lang="scss" scoped>
.my-banner {
  border-radius: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 16px;
  position: relative;
  &.warn {
    background: $yellow-1;
    border: 1px solid rgba($yellow, 0.5);
  }
  &.success {
    background: $green-1;
    border: 1px solid rgba($green, 0.5);
  }
  &.negative {
    background: $negative-1;
    border: 1px solid rgba($negative, 0.5);
  }
  &.primary {
    background: rgba($blue, 0.2);
    border: 1px solid rgba($primary, 0.5);
  }
  .icon {
    font-size: 20px;
  }
  .close {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: $grey-5;
    &:hover {
      color: $grey-3;
    }
  }
}
</style>