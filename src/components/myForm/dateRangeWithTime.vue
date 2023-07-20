<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs"> {{ dateParams.rules.length ? '*' : '' }} {{ dateParams.label }} </span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      :class="dateParams.classes"
      :rules="dateParams.rules"
      v-model="dateParams.model"
      :placeholder="dateParams.placeholder"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      readonly
      outlined
      no-error-icon
      dense
    >
      <template v-slot:append>
        <q-icon
          name="app:clear"
          class="cursor-pointer"
          v-if="dateParams.startModel"
          @click="(dateParams.model = ''), (dateParams.startModel = ''), (dateParams.endModel = ''), (dateParams.list = ['', ''])"
        >
        </q-icon>
        <q-icon :name="$q.dark.isActive ? 'app:start-time-dark' : 'app:start-time'" class="cursor-pointer q-mr-xs" size="18px">
          <q-popup-proxy cover transition-show="jump-up" transition-hide="jump-down" ref="proxy1">
            <div class="row">
              <q-date v-model="dateParams.startModel" mask="YYYY/MM/DD HH:mm:ss" flat> </q-date>
              <q-time v-model="dateParams.startModel" mask="YYYY/MM/DD HH:mm:ss" format24h flat with-seconds> </q-time>
            </div>
            <div class="row items-center justify-center q-my-sm">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-popup-proxy>
        </q-icon>
        <q-icon :name="$q.dark.isActive ? 'app:end-time-dark' : 'app:end-time'" class="cursor-pointer" size="18px">
          <q-popup-proxy cover transition-show="jump-up" transition-hide="jump-down" ref="proxy2">
            <div class="row">
              <q-date v-model="dateParams.endModel" mask="YYYY/MM/DD HH:mm:ss" flat> </q-date>
              <q-time v-model="dateParams.endModel" mask="YYYY/MM/DD HH:mm:ss" format24h flat with-seconds> </q-time>
            </div>
            <div class="row items-center justify-center q-my-sm">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'myDateRangeWithTImeComponent', emits: ['endInput', 'startInput'] })
export default class myDateRangeWithTImeComponent extends Vue {
  $refs: any;
  @Prop({
    default: {},
  })
  option!: any;
  @Watch('dateParams.startModel', { deep: true })
  onchange1(newVal: any) {
    if (this.dateParams.endModel && +new Date(newVal) >= +new Date(this.dateParams.endModel)) {
      this.$globalMessage.show({ type: 'error', content: 'start time < end time' });
      this.$refs.proxy1 && this.$refs.proxy1.hide();
      this.$refs.proxy2 && this.$refs.proxy2.hide();
      return;
    }
    if (newVal) {
      this.$emit('startInput', newVal);
      this.dateParams.list[0] = `Start: ${newVal} `;
    }
  }
  @Watch('dateParams.endModel', { deep: true })
  onchange2(newVal: any) {
    if (this.dateParams.startModel && +new Date(newVal) <= +new Date(this.dateParams.startModel)) {
      this.$globalMessage.show({ type: 'error', content: 'start time < end time' });
      this.$refs.proxy1 && this.$refs.proxy1.hide();
      this.$refs.proxy2 && this.$refs.proxy2.hide();
      return;
    }
    if (newVal) {
      this.$emit('endInput', newVal);
      this.dateParams.list[1] = `End: ${newVal}`;
    }
  }
  @Watch('dateParams.list', { deep: true })
  onchange3(newVal: any) {
    this.dateParams.model = newVal.join('');
  }
  @Watch('option.startModel', { deep: true })
  onchange5(newVal: any) {
    this.dateParams.startModel = newVal;
  }
  @Watch('option.endModel', { deep: true })
  onchange6(newVal: any) {
    this.dateParams.endModel = newVal;
  }
  @Watch('option.rules', { deep: true })
  onchange7(newVal: any) {
    this.dateParams.rules = newVal;
  }
  @Watch('option.classes', { deep: true })
  onchange8(newVal: any) {
    this.dateParams.classes = newVal;
  }
  @Watch('option.label', { deep: true })
  onchange10(newVal: any) {
    this.dateParams.label = newVal;
  }
  mounted() {
    this.dateParams.model = this.option.model;
    this.dateParams.startModel = this.option.startModel;
    this.dateParams.endModel = this.option.endModel;
    this.dateParams.list = [this.dateParams.startModel, this.dateParams.endModel];
    this.dateParams.rules = this.option.rules;
    this.dateParams.label = this.option.label;
    this.dateParams.classes = this.option.classes;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public dateParams = {
    model: '',
    startModel: '',
    endModel: '',
    list: ['', ''],
    rules: [],
    classes: '',
    label: '',
    placeholder: 'Select start and end times',
  };
}
</script>

<style lang="scss" scoped></style>
