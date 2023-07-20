<template>
  <div>
    <q-list>
      <div class="fs-12 q-pb-md row items-center text-weight-regular">
        <span class="q-mr-md">
          {{ sliderParams.rules.length ? '*' : '' }} {{ sliderParams.label }}
          <span class="q-ml-sm detail-link-type" @click="handlerClickSetSlider">Input?</span>
        </span>
      </div>
      <q-item>
        <q-item-section side class="f-bold">
          {{ sliderParams.min }}
        </q-item-section>
        <q-item-section>
          <q-slider
            dense
            v-model="sliderParams.model"
            @update:model-value="(val) => (sliderParams.model = val)"
            :min="sliderParams.min"
            :step="sliderParams.step"
            label-always
            label
            :max="sliderParams.max"
          >
          </q-slider>
        </q-item-section>
        <q-item-section side class="f-bold">
          {{ sliderParams.max }}
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'mySliderComponent', emits: ['input'] })
export default class mySliderComponent extends Vue {
  $refs: any;
  @Prop({
    default: {},
  })
  option!: any;
  @Watch('sliderParams.model', { deep: true })
  onchange2(newVal: any) {
    this.$emit('input', newVal);
  }
  @Watch('option.model', { deep: true })
  onchange3(newVal: any) {
    this.sliderParams.model = newVal;
  }
  @Watch('option.label', { deep: true })
  onchange4(newVal: any) {
    this.sliderParams.label = newVal;
  }
  @Watch('option.rules', { deep: true })
  onchange5(newVal: any) {
    this.sliderParams.rules = newVal;
  }
  @Watch('option.classes', { deep: true })
  onchange6(newVal: any) {
    this.sliderParams.classes = newVal;
  }
  mounted() {
    this.sliderParams.model = this.option.model;
    this.sliderParams.rules = this.option.rules;
    this.sliderParams.label = this.option.label;
    this.sliderParams.classes = this.option.classes;
    this.sliderParams.min = this.option.min;
    this.sliderParams.max = this.option.max;
    this.sliderParams.step = this.option.step || 0.1;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public sliderParams = {
    model: 0,
    rules: [],
    classes: '',
    label: '',
    min: 0,
    max: 100,
    step: 0.1,
  };
  private handlerClickSetSlider() {
    const item = this.sliderParams;
    this.$q
      .dialog({
        title: item.label,
        message: `Please enter ${item.label}`,
        transitionHide: 'jump-up',
        transitionShow: 'jump-down',
        prompt: {
          model: this.sliderParams.model.toString(),
          noErrorIcon: true,
          clearIcon: 'app:clear',
          isValid: (val: any) => {
            if (!item && item !== 0) return false;
            if (item.step) {
              if (!/^[0-9]+$/.test(val)) return false;
              if (Number(val) < item.min || Number(val) > item.max) {
                return false;
              } else {
                return true;
              }
            } else {
              if (!/^\d+(\.\d{1})?$/.test(val)) return false;
              if (Number(val) < item.min || Number(val) > item.max) {
                return false;
              } else {
                return true;
              }
            }
          },
          rules: [
            (val: any) => {
              if (!item && item !== 0) return 'Please enter';
              if (item.step) {
                if (!/^[0-9]+$/.test(val)) return 'Please enter Integer';
                else if (Number(val) < item.min || Number(val) > item.max) {
                  return `Range of values：${item.min} - ${item.max}`;
                } else {
                  return true;
                }
              } else {
                if (!/^\d+(\.\d{1})?$/.test(val)) return 'Please enter a decimal (retain one decimal)';
                else if (Number(val) < item.min || Number(val) > item.max) {
                  return `Range of values：${item.min} - ${item.max}`;
                } else {
                  return true;
                }
              }
            },
          ],
          type: 'number', // optional
        },
        cancel: true,
        color: 'primary',
        persistent: true,
      })
      .onOk((data) => {
        this.sliderParams.model = Number(data) as any;
      });
  }
}
</script>

<style lang="scss" scoped></style>
