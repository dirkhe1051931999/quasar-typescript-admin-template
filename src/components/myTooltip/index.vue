<template>
  <div class="block ellipsis" v-tooltip :style="style">
    {{ content }}
    <q-tooltip :class="toolTipClass" anchor="top middle" self="bottom middle">
      {{ content }}
    </q-tooltip>
  </div>
</template>

<script lang="ts">
import { AppModule } from 'src/store/modules/app';
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({ name: 'MyTooltipComponent' })
export default class MyTooltipComponent extends Vue {
  @Prop({ default: '' }) content!: string;
  @Prop({ default: 'width:100%' }) style!: string;
  get toolTipClass() {
    return AppModule.toolTipClass;
  }
}
</script>


<style lang="scss" scoped>
</style>