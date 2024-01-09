<template>
  <div class="relative-position">
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs"> {{ dateParams.required ? '*' : '' }} {{ dateParams.label }} </span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      :rules="dateParams.rules"
      v-model="dateParams.model"
      :placeholder="dateParams.placeholder"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      outlined
      mask="####/##/## - ####/##/##"
      no-error-icon
      clearable
      clear-icon="app:clear"
      dense
    >
      <template v-slot:append>
        <q-icon name="o_event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="jump-up" transition-hide="jump-down">
            <q-date v-model="dateParams.dateRange" range>
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
import { date } from 'quasar';
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormDateComponent', emits: ['input'] })
export default class FormDateComponent extends Vue {
  @Prop({
    default: {},
  })
  option!: any;

  @Watch('option.model', { deep: true })
  onOptionModelChange(newVal: any) {
    if (!newVal) return;
    this.dateParams.model = newVal.from && newVal.to ? `${newVal.from} - ${newVal.to}` : '';
    this.dateParams.dateRange = newVal;
  }

  @Watch('dateParams.dateRange', { deep: true })
  onDateRangeChange(newVal: any) {
    if (newVal) {
      this.dateParams.model = newVal.from && newVal.to ? `${newVal.from} - ${newVal.to}` : '';
    }
  }

  @Watch('option.required', { deep: true })
  onOptionRulesChange(newVal: any) {
    if (newVal) {
      this.dateParams.rules = [
        (val: any) => !!val || this.globals.$t('messages.required'),
        (val: any) => {
          if (val) {
            const start = val.split(' - ')[0];
            const end = val.split(' - ')[1];
            if (date.isValid(start) && date.isValid(end)) {
              if (new Date(start) > new Date(end)) {
                return 'Start date must be less than end date';
              } else {
                this.$emit('input', { from: start, to: end });
              }
            } else {
              return 'Invalid date format';
            }
          }
        },
      ] as any;
    } else {
      this.dateParams.rules = [];
    }
  }

  mounted() {
    this.dateParams.label = this.option.label;
    this.dateParams.required = this.option.required;
    this.dateParams.model = this.option.model.from && this.option.model.to ? `${this.option.model.from} - ${this.option.model.to}` : '';
    this.dateParams.dateRange = this.option.model;
  }

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private dateParams = {
    model: '',
    result: { from: '', to: '' },
    dateRange: { from: '', to: '' },
    label: '',
    placeholder: 'Please select date range',
    rules: [],
    required: false,
    classes: '',
  };
}
</script>

<style lang="scss" scoped></style>
