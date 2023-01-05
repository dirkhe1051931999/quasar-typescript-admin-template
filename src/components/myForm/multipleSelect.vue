<template>
  <div>
    <p class="f-bold fs-12 p-b-8" :class="[classes]">
      {{ rules.length ? '*' : '' }} {{ label }}
    </p>
    <q-select
      v-model="inputModel"
      :options="inputSelectOption"
      :class="['m-b-5', classes]"
      :placeholder="inputPlaceholder"
      :rules="rules"
      :clearable="showClose"
      :multiple="true"
      :readonly="readonly"
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
        <template v-if="inputModel.length">
          <q-chip
            removable
            v-for="(item, index) in inputModel"
            :key="item"
            dense
            @remove="inputModel.splice(index, 1)"
            >{{
              inputSelectOption.find(
                (data) => String(data.value) === String(item)
              )?.label ?? item
            }}
          </q-chip>
        </template>
        <template v-else>
          <span class="text-grey-3 fs-12">{{ inputPlaceholder }}</span>
        </template>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'FormMultipleSelectComponent', emits: ['input'] })
export default class FormMultipleSelectComponent extends Vue {
  @Prop({ default: {} }) option!: {
    model: string[] | any[];
    inputPlaceholder?: string;
    classes?: string;
    rules: any[];
    label: string;
    inputSelectOption: any[];
    showClose?: boolean;
    readonly?: boolean;
  };
  @Watch('model', { deep: true })
  onchange() {
    this.$emit('input', this.inputModel);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private inputModel: string | any[] = [];
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private inputSelectOption: any[] = [];
  private showClose?: boolean;
  private readonly?: boolean;
  mounted() {
    this.inputModel = this.option.model;
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseSelect');
    this.classes = this.option?.classes ?? '';
    this.rules = this.option?.rules;
    this.label = this.option?.label;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.showClose = this.option?.showClose ?? true;
    this.readonly = this.option?.readonly ?? false;
  }
}
</script>


<style lang="scss" scoped>
</style>
