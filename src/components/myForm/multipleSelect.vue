<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-select
      :ref="inputId"
      v-model="inputModel"
      :options="inputSelectOption"
      :class="['q-mb-sm', classes]"
      :rules="rules"
      :clearable="showClose"
      :multiple="true"
      :readonly="readonly"
      :use-input="userInput"
      :input-class="inputId"
      :input-debounce="100"
      :hint="hint"
      @popup-show="userInput ? popShow() : () => 0"
      @popup-hide="userInput ? popHide() : () => 0"
      @filter="filterFn"
      @input-value="inputValue"
      :spellcheck="false"
      autocapitalize="off"
      autocomplete="new-password"
      autocorrect="off"
      dense
      options-dense
      outlined
      dropdown-icon="app:topbar-arrow-bottom"
      no-error-icon
      emit-value
      map-options
      clear-icon="app:clear"
    >
      <template #selected>
        <template v-if="inputModel && inputModel.length">
          <q-chip :removable="!readonly" v-for="(item, index) in inputModel" :key="item" dense @remove="inputModel.splice(index, 1)"
            >{{ inputSelectOptionBak.find((data) => String(data.value) === String(item))?.label ?? item }}
          </q-chip>
        </template>
        <template v-if="(!inputModel || (inputModel && !inputModel.length)) && showPlaceholder">
          <span class="text-grey-5 fs-12">{{ inputPlaceholder }}</span>
        </template>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section v-close-popup>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
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

@Component({ name: 'FormMultipleSelectComponent', emits: ['input'] })
export default class FormMultipleSelectComponent extends Vue {
  declare $refs: any;
  @Prop({ default: {} }) option!: {
    model: string[] | any[];
    inputPlaceholder?: string;
    classes?: string;
    rules: any[];
    label: string;
    inputSelectOption: any[];
    showClose: boolean;
    readonly: boolean;
    userInput: boolean;
    inputId: string;
    hint: string;
  };
  @Watch('inputModel')
  onchange() {
    this.$refs[this.inputId] && this.$refs[this.inputId].updateInputValue('');
    if (!this.inputModel || (this.inputModel && !this.inputModel.length)) {
      this.showPlaceholder = true;
      this.$nextTick(() => {
        this.$refs[this.inputId] && this.$refs[this.inputId].blur();
        this.$refs[this.inputId] && this.$refs[this.inputId].hidePopup();
      });
    }
    this.$emit('input', this.inputModel);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private inputModel: string[] | any[] = [];
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private inputSelectOption: any[] = [];
  private inputSelectOptionBak: any[] = [];
  private showClose: boolean = true;
  private readonly: boolean = false;
  private userInput: boolean = false;
  private inputId: string = '';
  private hint: string = '';
  private showPlaceholder = true;
  mounted() {
    this.inputModel = this.option.model;
    this.inputPlaceholder = this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseSelect');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.inputSelectOptionBak = this.option?.inputSelectOption;
    this.showClose = this.option.showClose ?? true;
    this.readonly = this.option.readonly ?? false;
    this.userInput = this.option.userInput ?? false;
    this.inputId = this.option.inputId;
    this.hint = this.option.hint ?? '';
  }
  public async validForm() {
    return this.$refs[this.inputId].validate();
  }
  private popShow() {
    if (this.userInput) {
      this.showPlaceholder = false;
    } else {
      this.showPlaceholder = true;
    }
  }
  private popHide() {
    if (!this.inputModel || (this.inputModel && !this.inputModel.length)) {
      this.$nextTick(() => {
        this.$refs[this.inputId] && this.$refs[this.inputId].blur();
      });
    }
    this.showPlaceholder = true;
  }
  private filterFn(val: any, update: any) {
    update(() => {
      if (val === '') {
        this.inputSelectOption = this.inputSelectOptionBak;
      } else {
        this.inputSelectOption = this.inputSelectOptionBak.filter((v) => {
          return String(v.label).indexOf(val) !== -1;
        });
      }
    });
  }
  private removeItem(index: number) {
    this.inputModel.splice(index, 1);
    if (!this.inputModel.length) {
      this.showPlaceholder = true;
      this.$nextTick(() => {
        this.$refs[this.inputId] && this.$refs[this.inputId].hidePopup();
      });
    }
  }
  private inputValue(val: string) {
    if (!val) {
      this.showPlaceholder = true;
      if (!this.inputModel || (this.inputModel && !this.inputModel.length)) {
        this.$nextTick(() => {
          this.$refs[this.inputId] && this.$refs[this.inputId].blur();
          this.$refs[this.inputId] && this.$refs[this.inputId].hidePopup();
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
