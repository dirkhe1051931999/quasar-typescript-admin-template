<template>
  <div>
    <p class="f-bold fs-12 p-b-8">
      {{ myDateData.inputRules.length ? '*' : '' }} {{ myDateData.inputLabel }}
    </p>
    <q-input
      v-model="myDateData.inputModel"
      :rules="myDateData.inputRules"
      :placeholder="myDateData.inputPlaceholder"
      :disable="false"
      :readonly="true"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      outlined
      dense
    >
      <template v-slot:append>
        <q-icon
          name="app:clear"
          v-show="myDateData.inputModel"
          @click.prevent.stop="
            (myDateData.inputModel = ''),
              (myDateData.inputModelList = ['', '']),
              (myDateData.dateModel = ''),
              (myDateData.timeModel = '')
          "
        ></q-icon>
        <q-icon name="o_calendar_month" class="cursor-pointer">
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
        <q-icon name="o_schedule" class="cursor-pointer">
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
      inputModel: '',
      inputLabel: '',
      inputRules: [],
    },
  })
  option!: any;
  @Watch('myDateData.inputModelList', { deep: true })
  onchange() {
    this.myDateData.inputModel = this.myDateData.inputModelList.join(' ');
    this.$emit('input', this.myDateData.inputModel);
  }
  mounted() {
    this.myDateData.inputModel = this.option.inputModel;
    this.myDateData.inputLabel = this.option.inputLabel;
    this.myDateData.inputRules = this.option.inputRules;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private myDateData = {
    inputModel: '',
    inputModelList: ['', ''],
    inputLabel: '',
    inputPlaceholder: this.globals.$t('messages.pleaseSelectDate'),
    dateModel: '',
    timeModel: '',
    inputRules: [],
  };
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