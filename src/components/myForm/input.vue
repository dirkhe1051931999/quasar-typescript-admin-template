<template>
  <div>
    <p class="f-bold fs-12 p-b-8 row items-center">
      <span class="m-r-6">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      v-model.trim="model"
      :type="type"
      :class="['m-b-5', classes]"
      :placeholder="inputPlaceholder"
      :rules="rules"
      :hint="hint"
      :readonly="readonly"
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
    hint?: string;
    readonly?: boolean;
  };
  @Watch('model')
  onchange(newVal: string) {
    this.$emit('input', newVal);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private model = '';
  private type = '';
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private hint?: string;
  private readonly?: boolean;
  mounted() {
    this.model = this.option.model ?? '';
    this.type = this.option?.type ?? 'text';
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseEnter');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.hint = this.option.hint ?? '';
    this.readonly = this.option.readonly ?? false;
  }
  public validForm() {
    this.$refs['inputDom'].validate();
  }
}
</script>


<style lang="scss" scoped>
</style>