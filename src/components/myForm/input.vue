<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      v-model.trim="model"
      :type="type"
      :class="['q-mb-sm', classes]"
      :placeholder="inputPlaceholder"
      :rules="rules"
      :hint="hint"
      :readonly="readonly"
      :disable="disable"
      ref="inputDom"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      clearable
      no-error-icon
      dense
      outlined
      clear-icon="app:clear"
      :spellcheck="false"
    >
      <template #append>
        <slot name="append"> </slot>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormInputComponent', emits: ['input'] })
export default class FormInputComponent extends Vue {
  declare $refs: any;
  @Prop({ default: {} }) option!: {
    model: string;
    type?: string;
    inputPlaceholder?: string;
    classes?: string;
    rules: any[];
    label: string;
    hint: string;
    readonly: boolean;
    disable: boolean;
  };
  @Watch('option.disable', { deep: true })
  onDisablechange(newVal: boolean) {
    this.disable = newVal;
  }
  @Watch('option.model', { deep: true })
  onModelchange(newVal: string) {
    this.model = newVal;
  }
  @Watch('model')
  onchange(newVal: string) {
    this.$emit('input', newVal);
  }
  @Watch('option.classes')
  onClassesChange(newVal: string) {
    this.classes = newVal;
  }
  @Watch('option.rules', { deep: true })
  onRulesChange(newVal: any[]) {
    this.rules = newVal;
  }
  @Watch('option.label', { deep: true })
  onLabelChange(newVal: string) {
    this.label = newVal;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private model = '';
  private type = '';
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private hint: string = '';
  private readonly: boolean = false;
  private disable: boolean = false;
  mounted() {
    this.model = this.option.model ?? '';
    this.type = this.option?.type ?? 'text';
    this.inputPlaceholder = this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseEnter');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.hint = this.option.hint;
    this.readonly = this.option.readonly;
    this.disable = this.option.disable || false;
  }
  public async validForm() {
    return await this.$refs['inputDom'].validate();
  }
}
</script>

<style lang="scss" scoped></style>
