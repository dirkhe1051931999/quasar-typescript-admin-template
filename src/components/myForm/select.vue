<template>
  <div>
    <p class="f-bold fs-12 p-b-8 row items-center">
      <span class="m-r-6">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-select
      :ref="inputId"
      v-model="model"
      :options="inputSelectOption"
      :class="['m-b-5', classes]"
      :rules="rules"
      :clearable="showClose"
      :readonly="readonly"
      :hint="hint"
      :use-input="model ? false : userInput"
      :input-class="inputId"
      :input-debounce="100"
      @popup-show="userInput ? popShow() : () => 0"
      @popup-hide="userInput ? popHide() : () => 0"
      @filter="filterFn"
      @input-value="inputValue"
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
        <template v-if="model && model.length">
          {{
            inputSelectOptionBak.find(
              (data) => String(data.value) === String(model)
            )?.label ?? model
          }}
        </template>
        <template
          v-if="(!model || (model && !model.length)) && showPlaceholder"
        >
          <span class="fs-12 text-grey-5 user-select-none">
            {{ inputPlaceholder }}
          </span>
        </template>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label v-close-popup>{{ scope.opt.label }}</q-item-label>
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
    showClose?: boolean;
    readonly?: boolean;
    hint?: string;
    userInput?: boolean;
    inputId: string;
  };
  @Watch('model')
  onchange() {
    this.$refs[this.inputId] && this.$refs[this.inputId].updateInputValue('');
    if (!this.model || (this.model && !this.model.length)) {
      this.showPlaceholder = true;
      this.$nextTick(() => {
        this.$refs[this.inputId] && this.$refs[this.inputId].blur();
        this.$refs[this.inputId] && this.$refs[this.inputId].hidePopup();
      });
    }
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
  private showClose?: boolean;
  private readonly?: boolean;
  private hint?: string;
  private inputId: string = '';
  private userInput?: boolean;
  private showPlaceholder = true;
  mounted() {
    this.model = this.option?.model ?? '';
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseSelect');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.inputSelectOptionBak = this.option?.inputSelectOption;
    this.showClose = this.option?.showClose ?? true;
    this.readonly = this.option?.readonly ?? false;
    this.userInput = this.option?.userInput ?? false;
    this.hint = this.option.hint ?? '';
    this.inputId = this.option.inputId;
  }
  private popShow() {
    if (this.userInput) {
      this.showPlaceholder = false;
    } else {
      this.showPlaceholder = true;
    }
  }
  private popHide() {
    if (!this.model || (this.model && !this.model.length)) {
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
  private inputValue(val: string) {
    if (!val) {
      this.showPlaceholder = true;
      if (!this.model || (this.model && !this.model.length)) {
        this.$nextTick(() => {
          this.$refs[this.inputId] && this.$refs[this.inputId].blur();
          this.$refs[this.inputId] && this.$refs[this.inputId].hidePopup();
        });
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
