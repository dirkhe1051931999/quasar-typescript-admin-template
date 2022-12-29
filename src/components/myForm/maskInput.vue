<template>
  <div>
    <p class="f-bold fs-12 p-b-8">
      {{ inputRules.length ? '*' : '' }} {{ inputLabel }}
    </p>
    <q-input
      v-model.trim="inputModel"
      :type="inputType"
      :class="['m-b-5', inputClass]"
      :placeholder="inputPlaceholder"
      :rules="inputRules"
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
    inputModel: string;
    inputType?: string;
    inputPlaceholder?: string;
    inputClass?: string;
    inputRules: any[];
    inputLabel: string;
    hint?: string;
    mask: string;
    readonly?: boolean;
  };
  @Watch('inputModel')
  onchange(newVal: string) {
    this.$emit('input', newVal);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private inputModel = '';
  private inputType = '';
  private inputPlaceholder = '';
  private inputClass = '';
  private inputRules: any[] = [];
  private inputLabel = '';
  private hint?: string;
  private mask?: string;
  private readonly?: boolean;
  mounted() {
    this.inputModel = this.option.inputModel ?? '';
    this.inputType = this.option?.inputType ?? 'text';
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseEnter');
    this.inputClass = this.option?.inputClass ?? '';
    this.inputRules = this.option?.inputRules;
    this.inputLabel = this.option?.inputLabel;
    this.hint = this.option.hint ?? '';
    this.mask = this.option.mask ?? '';
    this.readonly = this.option.readonly ?? false;
  }
  public validForm() {
    this.$refs['inputDom'].validate();
  }
}
</script>


<style lang="scss" scoped>
</style>