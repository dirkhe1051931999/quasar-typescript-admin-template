<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-option-group
      v-model="model"
      :options="inputSelectOption"
      color="primary"
      class="q-mb-sm"
      inline
      :class="[classes]"
      :ref="inputId"
      :disable="disable || readonly"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
    />
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormRadioComponent', emits: ['input'] })
export default class FormRadioComponent extends Vue {
  declare $refs: any;
  @Prop({ default: {} }) option!: {
    model: string;
    classes?: string;
    rules: any[];
    label: string;
    inputSelectOption: any[];
    readonly: boolean;
    inputId: string;
    disable: boolean;
  };
  @Watch('option.inputSelectOption', { deep: true })
  onInputSelectOptionchange(newVal: any) {
    this.inputSelectOption = newVal;
    this.inputSelectOptionBak = newVal;
  }
  @Watch('option.model', { deep: true })
  onModelchange(newVal: any) {
    this.model = newVal;
  }
  @Watch('option.disable', { deep: true })
  onDisablechange(newVal: boolean) {
    this.disable = newVal;
  }
  @Watch('model')
  onchange() {
    this.$emit('input', this.model);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private model: string = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private inputSelectOption: any[] = [];
  private inputSelectOptionBak: any[] = [];
  private readonly: boolean = false;
  private inputId: string = '';
  private showPlaceholder = true;
  private disable = false;
  mounted() {
    this.model = this.option?.model ?? '';
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.inputSelectOptionBak = this.option?.inputSelectOption;
    this.readonly = this.option?.readonly;
    this.inputId = this.option.inputId;
    this.disable = this.option.disable || false;
  }
}
</script>

<style lang="scss" scoped></style>
