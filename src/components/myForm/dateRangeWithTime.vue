<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs"> {{ dateParams.required ? '*' : '' }} {{ dateParams.label }} </span>
      <slot name="subTitle"></slot>
    </p>
    <div class="pick-date">
      <div class="row">
        <span class="fs-12 q-mr-sm mt-3">Start:</span>
        <q-input
          ref="startInputEl"
          :rules="dateParams.startRules"
          :class="dateParams.startClasses"
          v-model="dateParams.startModel"
          :placeholder="dateParams.startPlaceholder"
          :spellcheck="false"
          autocapitalize="off"
          mask="####/##/## ##:##:##"
          autocomplete="new-password"
          autocorrect="off"
          outlined
          no-error-icon
          dense
          clearable
          clear-icon="app:clear"
        >
          <template v-slot:append>
            <q-icon name="o_event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="jump-up" transition-hide="jump-down">
                <div class="row">
                  <q-date v-model="dateParams.startModel" mask="YYYY/MM/DD HH:mm:ss" flat></q-date>
                  <q-time v-model="dateParams.startModel" mask="YYYY/MM/DD HH:mm:ss" format24h flat with-seconds></q-time>
                </div>
                <div class="row items-center justify-center q-my-sm">
                  <q-btn v-close-popup label="Now" color="primary" flat @click="setNow('startModel')" />
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="row">
        <span class="fs-12 q-mr-sm mt-3">End:</span>
        <q-input
          ref="endInputEl"
          :rules="dateParams.endRules"
          :class="dateParams.endClasses"
          v-model="dateParams.endModel"
          :placeholder="dateParams.endPlaceholder"
          :spellcheck="false"
          autocapitalize="off"
          mask="####/##/## ##:##:##"
          autocomplete="new-password"
          autocorrect="off"
          outlined
          no-error-icon
          dense
          clearable
          clear-icon="app:clear"
        >
          <template v-slot:append>
            <q-icon name="o_event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="jump-up" transition-hide="jump-down" :target="!!dateParams.startModel">
                <div class="row">
                  <q-date v-model="dateParams.endModel" mask="YYYY/MM/DD HH:mm:ss" flat :options="endDateOption"></q-date>
                  <q-time v-model="dateParams.endModel" mask="YYYY/MM/DD HH:mm:ss" format24h flat with-seconds></q-time>
                </div>
                <div class="row items-center justify-center q-my-sm q-gutter-x-md">
                  <q-btn v-close-popup label="Now" color="primary" flat @click="setNow('endModel')" />
                  <q-btn v-close-popup label="Close" color="primary" />
                </div>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import { date } from 'quasar';

@Component({ name: 'myDateRangeWithTImeComponent', emits: ['input'] })
export default class myDateRangeWithTImeComponent extends Vue {
  $refs: any;
  @Prop({
    default: {},
  })
  option!: any;

  @Watch('option.model', { deep: true })
  onchange5(newVal: any) {
    this.dateParams.model = newVal;
    this.dateParams.startModel = newVal.start;
    this.dateParams.endModel = newVal.end;
  }

  @Watch('dateParams.model', { deep: true })
  onResultChange(newVal: any) {
    this.$emit('input', newVal);
  }

  @Watch('option.required', { deep: true })
  onRequiredChange(newVal: any) {
    this.dateParams.required = newVal;
    if (newVal) {
      this.dateParams.startRules = [
        (v: any) => !!v || 'Start date is required',
        (v: any) => {
          if (!date.isValid(v)) {
            return 'Start date is invalid';
          }
          const start = new Date(v).getTime();
          const end = new Date(this.dateParams.endModel).getTime();
          return start < end || 'Start date must be less than end date';
        },
      ] as any;
      this.dateParams.endRules = [
        (v: any) => !!v || 'End date is required',
        (v: any) => {
          if (!date.isValid(v)) {
            return 'End date is invalid';
          }
          const start = new Date(this.dateParams.startModel).getTime();
          const end = new Date(v).getTime();
          return start < end || 'Start date must be less than end date';
        },
      ] as any;
    } else {
      this.dateParams.startRules = [] as any;
      this.dateParams.endRules = [] as any;
    }
  }

  @Watch('dateParams.startModel')
  onStartDateChange(newVal: any) {
    if (this.dateParams.endModel) {
      this.$refs.endInputEl && this.$refs.endInputEl.validate();
    }
    this.dateParams.model.start = newVal;
  }

  @Watch('dateParams.endModel')
  onEndDateChange(newVal: any) {
    if (this.dateParams.startModel) {
      this.$refs.startInputEl && this.$refs.startInputEl.validate();
    }
    this.dateParams.model.end = newVal;
  }

  get endDateOption(): any {
    return (date: string | number | Date) => {
      if (!this.dateParams.startModel) return false;
      const start = this.dateParams.startModel.split(' ')[0];
      return date >= start;
    };
  }

  mounted() {
    this.dateParams.startModel = this.option.model.start;
    this.dateParams.endModel = this.option.model.end;
    this.dateParams.label = this.option.label;
    this.dateParams.required = this.option.required;
  }

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private dateParams = {
    model: {
      start: '',
      end: '',
    },
    startModel: '',
    endModel: '',
    required: false,
    startClasses: 'col',
    endClasses: 'col',
    startRules: [],
    endRules: [],
    startPlaceholder: 'Start date & time',
    endPlaceholder: 'End date & time',
    label: '',
    placeholder: 'Select start and end times',
  };

  private setNow(type: string) {
    (this.dateParams as any)[type] = date.formatDate(new Date().getTime(), 'YYYY/MM/DD HH:mm:ss');
  }
}
</script>

<style lang="scss" scoped>
.pick-date {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
</style>
