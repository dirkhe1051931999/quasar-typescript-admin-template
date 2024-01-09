<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular" v-show="!hideTitle">
      <span class="q-mr-xs">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-select
      :ref="inputId"
      v-model="model"
      :options="inputSelectOption"
      :class="['q-mb-sm', classes]"
      :rules="rules"
      :clearable="showClose"
      :readonly="readonly"
      :disable="disable"
      :hint="hint"
      :use-input="model ? false : userInput"
      :input-class="inputId"
      :placeholder="$t('messages.pleaseSelect')"
      :input-debounce="100"
      @filter="filterFn"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      dense
      dropdown-icon="expand_more"
      no-error-icon
      options-dense
      outlined
      emit-value
      map-options
      clear-icon="app:clear"
    >
      <template #selected>
        <template v-if="(typeof model === 'object' && model && model.length) || (typeof model !== 'object' && model)">
          {{ inputSelectOptionBak.find((data) => String(data.value) === String(model))?.label ?? model }}
        </template>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section v-close-popup>
            <q-item-label
              >{{ scope.opt.label }}
              <slot name="extra-label-content" :opt="scope.opt" />
            </q-item-label>
            <q-item-label caption v-if="scope.opt.description" class="text-grey">{{ scope.opt.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormSelectComponent', emits: ['input'] })
export default class FormSelectComponent extends Vue {
  declare $refs: any;
  @Prop({ default: {} }) option!: {
    model: string;
    inputPlaceholder?: string;
    classes?: string;
    rules: any[];
    label: string;
    inputSelectOption: any[];
    showClose: boolean;
    readonly: boolean;
    hint: string;
    userInput: boolean;
    inputId: string;
    disable: boolean;
    hideTitle: boolean;
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
    this.$nextTick(() => {
      this.$refs[this.inputId] && this.$refs[this.inputId].hidePopup();
    });
    this.$emit('input', this.model);
  }

  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private model: string = '';
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private inputSelectOption: any[] = [];
  private inputSelectOptionBak: any[] = [];
  private showClose: boolean = true;
  private readonly: boolean = false;
  private hint: string = '';
  private inputId: string = '';
  private userInput: boolean = false;
  private disable = false;
  private hideTitle = false;

  mounted() {
    this.model = this.option?.model ?? '';
    this.inputPlaceholder = this.option?.inputPlaceholder ?? 'Please select';
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.inputSelectOptionBak = this.option?.inputSelectOption;
    this.showClose = this.option.showClose ?? true;
    this.readonly = this.option?.readonly;
    this.userInput = this.option?.userInput;
    this.hint = this.option.hint;
    this.inputId = this.option.inputId;
    this.disable = this.option.disable || false;
    this.hideTitle = this.option.hideTitle || false;
  }

  public async validForm() {
    return this.$refs[this.inputId].validate();
  }

  private filterFn(val: any, update: any) {
    update(() => {
      if (val === '') {
        this.inputSelectOption = this.inputSelectOptionBak;
      } else {
        this.inputSelectOption = this.inputSelectOptionBak.filter((v) => {
          return String(v.label.toLowerCase()).indexOf(val.toLocaleString()) !== -1;
        });
      }
    });
  }
}
</script>

<style lang="scss" scoped></style>
