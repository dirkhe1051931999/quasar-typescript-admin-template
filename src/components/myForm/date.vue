<template>
  <div class="relative-position">
    <p class="f-bold fs-12 p-b-8 row items-center">
      <span class="m-r-6">
        {{ myDateData.rules.length ? '*' : '' }} {{ myDateData.label }}
      </span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      v-model="myDateData.model"
      :rules="myDateData.rules"
      ref=""
      :placeholder="myDateData.inputPlaceholder"
      :disable="false"
      :readonly="true"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      outlined
      no-error-icon
      dense
    >
      <template v-slot:append>
        <q-icon
          name="app:clear"
          v-if="myDateData.model"
          @click.prevent.stop="clickDateClear"
        ></q-icon>
        <q-icon name="o_calendar_month" class="cursor-pointer text-grey-5">
          <q-popup-proxy transition-show="jump-up" transition-hide="jump-down">
            <q-date v-model="myDateData.dateModel" mask="YYYY-MM-DD">
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="$t(`action.confirm`)"
                  color="primary"
                  no-caps
                  outline
                  @click="monitorDateChange"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
        <q-icon name="o_schedule" class="cursor-pointer text-grey-5">
          <q-popup-proxy transition-show="jump-up" transition-hide="jump-down">
            <q-time
              v-model="myDateData.timeModel"
              mask="HH:mm:ss"
              format24h
              with-seconds
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="$t(`action.confirm`)"
                  color="primary"
                  no-caps
                  outline
                  @click="monitorTimeChange"
                />
              </div>
            </q-time>
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
    default: {
      model: '',
      label: '',
      rules: [],
    },
  })
  option!: any;
  @Watch('myDateData.inputModelList', { deep: true })
  onchange() {
    this.myDateData.model =
      this.myDateData.inputModelList.join(' ') === ' '
        ? ''
        : this.myDateData.inputModelList.join(' ');
    this.$emit('input', this.myDateData.model);
  }
  mounted() {
    this.myDateData.model = this.option.model;
    this.myDateData.label = this.option.label;
    this.myDateData.rules = this.option.rules;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private myDateData = {
    model: '',
    inputModelList: ['', ''],
    label: '',
    inputPlaceholder: this.globals.$t('messages.pleaseSelectDate'),
    dateModel: '',
    timeModel: '',
    rules: [],
  };
  private clickDateClear() {
    this.myDateData.model = '';
    this.myDateData.inputModelList = ['', ''];
    this.myDateData.dateModel = '';
    this.myDateData.timeModel = '';
  }
  private monitorDateChange() {
    this.myDateData.inputModelList[0] = this.myDateData.dateModel;
  }
  private monitorTimeChange() {
    this.myDateData.inputModelList[1] = this.myDateData.timeModel;
  }
}
</script>


<style lang="scss" scoped>
</style>