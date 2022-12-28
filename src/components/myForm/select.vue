<template>
  <div>
    <p class="f-bold fs-12 p-b-8">
      {{ inputRules.length ? '*' : '' }} {{ inputLabel }}
    </p>
    <q-select
      v-model="inputModel"
      :options="inputSelectOption"
      :class="['m-b-5', inputClass]"
      :placeholder="inputPlaceholder"
      :rules="inputRules"
      :clearable="showClose"
      :readonly="readonly"
      :hint="hint"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      dense
      dropdown-icon="app:topbar-arrow-bottom"
      no-error-icon
      options-dense
      outlined
      emit-value
      map-options
      clear-icon="app:clear"
    >
      <template #selected>
        <template v-if="inputModel">
          {{
            inputSelectOption.find(
              (data) => String(data.value) === String(inputModel)
            )?.label ?? inputModel
          }}
        </template>
        <template v-else>
          <span class="fs-12 text-grey-3 user-select-none">
            {{ inputPlaceholder }}
          </span>
        </template>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormSelectComponent', emits: ['input'] })
export default class FormSelectComponent extends Vue {
  @Prop({ default: {} }) option!: {
    inputModel: string | any[];
    inputPlaceholder?: string;
    inputClass?: string;
    inputRules: any[];
    inputLabel: string;
    inputSelectOption: any[];
    showClose?: boolean;
    readonly?: boolean;
    hint?: string;
  };
  @Watch('inputModel')
  onchange() {
    this.$emit('input', this.inputModel);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private inputModel: string | any[] = '';
  private inputPlaceholder = '';
  private inputClass = '';
  private inputRules: any[] = [];
  private inputLabel = '';
  private inputSelectOption: any[] = [];
  private showClose?: boolean;
  private readonly?: boolean;
  private hint?: string;
  mounted() {
    this.inputModel = this.option?.inputModel ?? '';
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseSelect');
    this.inputClass = this.option?.inputClass ?? '';
    this.inputRules = this.option?.inputRules;
    this.inputLabel = this.option?.inputLabel;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.showClose = this.option?.showClose ?? true;
    this.readonly = this.option?.readonly ?? false;
    this.hint = this.option.hint ?? '';
  }
}
</script>


<style lang="scss" scoped>
</style>
