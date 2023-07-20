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
      :mask="mask"
      ref="inputDom"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      clearable
      no-error-icon
      unmasked-value
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
/* #	数字
S	字母，a到z，不区分大小写
N	字母数字，不区分大小写
A	字母，转换为大写
a	字母，转换为小写
X	字母数字，字母转换为大写
x	字母数字，字母转换为小写 */
@Component({ name: 'FormMaskInputComponent', emits: ['input'] })
export default class FormMaskInputComponent extends Vue {
  declare $refs: any;
  @Prop({ default: {} }) option!: {
    model: string;
    type: string;
    inputPlaceholder?: string;
    classes?: string;
    rules: any[];
    label: string;
    hint: string;
    mask: string;
    readonly: boolean;
  };
  @Watch('option.model')
  onModelchange(newVal: any) {
    this.model = newVal;
  }
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
  private hint: string = '';
  private mask: string = '';
  private readonly: boolean = false;
  mounted() {
    this.model = this.option.model ?? '';
    this.type = this.option?.type ?? 'text';
    this.inputPlaceholder = this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseEnter');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.hint = this.option.hint ?? '';
    this.mask = this.option.mask;
    this.readonly = this.option.readonly ?? false;
  }
  public async validForm() {
    return this.$refs['inputDom'].validate();
  }
}
</script>

<style lang="scss" scoped></style>
