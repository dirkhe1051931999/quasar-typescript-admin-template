<template>
  <div>
    <p class="f-bold fs-12 p-b-8">{{ rules.length ? '*' : '' }} {{ label }}</p>
    <q-select
      v-model="model"
      :options="inputSelectOption"
      :class="['m-b-5', classes]"
      :placeholder="inputPlaceholder"
      :rules="rules"
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
        <template v-if="model">
          {{
            inputSelectOption.find(
              (data) => String(data.value) === String(model)
            )?.label ?? model
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
    model: string | any[];
    inputPlaceholder?: string;
    classes?: string;
    rules: any[];
    label: string;
    inputSelectOption: any[];
    showClose?: boolean;
    readonly?: boolean;
    hint?: string;
  };
  @Watch('model')
  onchange() {
    this.$emit('input', this.model);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private model: string | any[] = '';
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private inputSelectOption: any[] = [];
  private showClose?: boolean;
  private readonly?: boolean;
  private hint?: string;
  mounted() {
    this.model = this.option?.model ?? '';
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseSelect');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.showClose = this.option?.showClose ?? true;
    this.readonly = this.option?.readonly ?? false;
    this.hint = this.option.hint ?? '';
  }
}
</script>


<style lang="scss" scoped>
</style>
