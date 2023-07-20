<template>
  <div class="relative-position">
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs"> {{ myDateData.rules.length ? '*' : '' }} {{ myDateData.label }} </span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      :class="myDateData.classes"
      :rules="myDateData.rules"
      v-model="myDateData.model"
      :placeholder="myDateData.placeholder"
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
        <q-icon name="app:clear" class="cursor-pointer" v-if="myDateData.model" @click="(myDateData.model = ''), (myDateData.dateRange = '')"> </q-icon>
        <q-icon name="o_event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="jump-up" transition-hide="jump-down">
            <q-date v-model="myDateData.dateRange" range>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormDateComponent', emits: ['input'] })
export default class FormDateComponent extends Vue {
  @Prop({
    default: {},
  })
  option!: any;
  @Watch('myDateData.dateRange', { deep: true })
  onchange1(newVal: any) {
    if (!newVal) this.myDateData.model = '';
    else if (typeof newVal === 'string') {
      this.myDateData.model = newVal;
    } else {
      this.myDateData.model = newVal.from && newVal.to ? `${newVal.from}-${newVal.to}` : '';
    }
  }
  @Watch('myDateData.model', { deep: true })
  onchange2(newVal: any) {
    this.$emit('input', newVal);
  }
  @Watch('option.model', { deep: true })
  onchange3(newVal: any) {
    this.myDateData.model = newVal;
  }
  @Watch('option.label', { deep: true })
  onchange4(newVal: any) {
    this.myDateData.label = newVal;
  }
  @Watch('option.rules', { deep: true })
  onchange5(newVal: any) {
    this.myDateData.rules = newVal;
  }
  @Watch('option.classes', { deep: true })
  onchange6(newVal: any) {
    this.myDateData.classes = newVal;
  }
  @Watch('option.dateRange', { deep: true })
  onchange8(newVal: any) {
    this.myDateData.dateRange = newVal;
  }
  mounted() {
    this.myDateData.model = this.option.model;
    this.myDateData.label = this.option.label;
    this.myDateData.rules = this.option.rules;
    this.myDateData.classes = this.option.classes;
    this.myDateData.dateRange = this.option.dateRange;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private myDateData = {
    model: '',
    dateRange: { from: '', to: '' },
    label: '',
    placeholder: 'Click on the icon on the right to select the time interval',
    rules: [],
    classes: '',
  };
}
</script>

<style lang="scss" scoped></style>
