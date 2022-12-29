<template>
  <div>
    <p class="f-bold fs-12 p-b-8" :class="[inputClass]">
      {{ inputRules.length ? '*' : '' }} {{ inputLabel }}
    </p>
    <q-select
      v-model="inputModel"
      :options="inputSelectOption"
      :class="['m-b-5', inputClass]"
      :placeholder="inputPlaceholder"
      :rules="inputRules"
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
    inputModel: string | any[];
    inputPlaceholder?: string;
    inputClass?: string;
    inputRules: any[];
    inputLabel: string;
    inputSelectOption: any[];
    showClose?: boolean;
    readonly?: boolean;
  };
  @Watch('inputModel', { deep: true })
  onchange() {
    this.$emit('input', this.inputModel);
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private inputModel: string | any[] = [];
  private inputPlaceholder = '';
  private inputClass = '';
  private inputRules: any[] = [];
  private inputLabel = '';
  private inputSelectOption: any[] = [];
  private showClose?: boolean;
  private readonly?: boolean;
  mounted() {
    this.inputModel = this.option.inputModel;
    this.inputPlaceholder =
      this.option?.inputPlaceholder ?? this.globals.$t('messages.pleaseSelect');
    this.inputClass = this.option?.inputClass ?? '';
    this.inputRules = this.option?.inputRules;
    this.inputLabel = this.option?.inputLabel;
    this.inputSelectOption = this.option?.inputSelectOption;
    this.showClose = this.option?.showClose ?? true;
    this.readonly = this.option?.readonly ?? false;
  }
}
</script>


<style lang="scss" scoped>
</style>
