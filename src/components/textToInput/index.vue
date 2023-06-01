<template>
  <q-input outlined class="text-to-input" v-model="text" :loading="_loading" dense>
    <template v-slot:append>
      <q-icon name="app:text-to-input-close" class="cursor-pointer" @click.stop.prevent="close" />
      <q-icon name="app:text-to-input-confirm" class="cursor-pointer comfirm-button" @click.stop.prevent="confirm" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'TextToInputComponent', emits: ['confirm', 'close'] })
export default class TextToInputComponent extends Vue {
  declare $props: { value: string };
  @Prop({ default: '' }) value!: string;
  @Prop({ default: {} }) that!: any;
  @Prop({ default: {} }) loading!: boolean;
  @Watch('loading')
  onLoadingChange() {
    this._loading = this.loading;
  }
  @Watch('value')
  onValueChange(newVal: string, oldValue: string) {
    this.oldText = newVal;
    this.text = newVal;
  }
  private text = '';
  private oldText = '';
  private _loading = false;
  private close() {
    this.text = this.oldText;
    this.$emit('close', { value: this.text, that: this.that });
  }
  private confirm() {
    this.oldText = this.text;
    this.$emit('confirm', { value: this.text, that: this.that });
  }
  mounted() {
    this.oldText = this.$props.value;
    this.text = this.$props.value;
  }
}
</script>

<style lang="scss">
.body--dark {
  .comfirm-button {
    img {
      border-radius: 50%;
      transform: scale(0.88);
    }
  }
}
.body--light {
  .comfirm-button {
    img {
      border-radius: 50%;
      transform: scale(1.05);
    }
  }
}
</style>