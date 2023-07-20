<template>
  <div>
    <p class="fs-12 q-pb-sm row items-center text-weight-regular">
      <span class="q-mr-xs">{{ rules.length ? '*' : '' }} {{ label }}</span>
      <slot name="subTitle"></slot>
    </p>
    <q-input
      v-model.trim="inputModel"
      :type="type"
      :class="['q-mb-sm', classes]"
      :placeholder="inputPlaceholder"
      :rules="rules"
      :hint="hint"
      :disable="disable"
      @focus="inputFocus"
      @update:model-value="inputValue"
      ref="inputRef"
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
      <template #append>
        <slot name="append"> </slot>
      </template>
    </q-input>
    <q-menu :offset="[0, -20]" no-refocus ref="menuRef" no-parent-event no-focus persistent @show="menuShow" @hide="menuHide">
      <q-list dense :style="`width:${$refs.inputRef.$el.clientWidth}px`">
        <q-item v-for="(one, oneIndex) in inputSelectOption" :key="oneIndex" @click.prevent.stop="menuItemClick(one)" clickable style="padding: 2px 12px">
          <q-item-section>{{ one.label }}</q-item-section>
          <q-item-section side v-if="one.children.length">
            <q-icon name="app:navigation-arrow-right" />
          </q-item-section>
          <q-menu anchor="top end" self="top start" v-if="one.children.length">
            <q-list dense :style="`width:${$refs.inputRef.$el.clientWidth / 2}px`">
              <q-item v-for="(two, twoIndex) in one.children" :key="twoIndex" dense @click.prevent.stop="menuItemClick(two)" clickable style="padding: 2px 12px">
                <q-item-section>{{ two.label }}</q-item-section>
                <q-item-section side v-if="two.children.length">
                  <q-icon name="app:navigation-arrow-right" />
                </q-item-section>
                <q-menu auto-close anchor="top end" self="top start" v-if="two.children.length">
                  <q-list dense :style="`width:${$refs.inputRef.$el.clientWidth / 2}px`">
                    <q-item v-for="(three, threeIndex) in two.children" :key="threeIndex" dense @click.prevent.stop="menuItemClick(three)" clickable style="padding: 2px 12px">
                      <q-item-section>{{ three.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { cloneDeep } from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';

@Component({ name: 'MyTreeSelectComponent', emits: ['input'] })
export default class MyTreeSelectComponent extends Vue {
  declare $refs: any;
  @Prop({ default: {} }) option!: any;
  @Watch('option.disable', { deep: true })
  onDisablechange(newVal: boolean) {
    this.disable = newVal;
  }
  @Watch('option.model', { deep: true })
  onModelchange(newVal: string) {
    this.model = newVal;
  }
  @Watch('option.classes')
  onClassesChange(newVal: string) {
    this.classes = newVal;
  }
  @Watch('option.rules', { deep: true })
  onRulesChange(newVal: any[]) {
    this.rules = newVal;
  }
  @Watch('option.label', { deep: true })
  onLabelChange(newVal: string) {
    this.label = newVal;
  }
  mounted() {
    this.model = this.option.model;
    this.inputPlaceholder = this.option.inputPlaceholder ?? 'Please select';
    this.classes = this.option?.classes || '';
    this.rules = this.option.rules;
    this.label = this.option.label || '';
    this.inputSelectOptionBak = this.option.inputSelectOption;
    this.hint = this.option.hint;
    this.inputId = this.option.inputId;
    this.disable = this.option.disable || false;
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  private model = '';
  private type = '';
  private inputPlaceholder = '';
  private classes = '';
  private rules: any[] = [];
  private label = '';
  private hint: string = '';
  private disable: boolean = false;
  private inputSelectOption: any[] = [];
  private inputSelectOptionBak: any[] = [];
  private inputId: string = '';
  private userInput: boolean = false;
  private showPlaceholder = true;
  private inputModel = '';
  /* event */
  private menuItemClick(item: any) {
    if (!item.children.length) {
      this.$refs.menuRef.hide();
      this.inputModel = item.label;
      this.$emit('input', item.value);
    }
  }
  private documentClickEvent(event: any) {
    // 检查点击事件是否发生在目标元素之外
    if (this.$refs.inputRef && !this.$refs.inputRef.$el.contains(event.target)) {
      this.$refs.menuRef.hide();
    }
  }
  private menuShow() {
    document.addEventListener('click', this.documentClickEvent);
  }
  private menuHide() {
    document.removeEventListener('click', this.documentClickEvent);
  }
  private inputFocus() {
    this.inputValue(this.inputModel);
    this.$refs.menuRef.show();
  }
  private inputValue(value: any) {
    const inputSelectOptionBak = cloneDeep(this.inputSelectOptionBak);
    if (!value) {
      this.$emit('input', null);
      this.inputSelectOption = inputSelectOptionBak;
      return;
    }
    value = value.toLowerCase();
    let arr = inputSelectOptionBak.filter((one: any) => {
      if (one.label.toLowerCase().includes(value)) return true;
      else {
        one.children = one.children.filter((two: any) => {
          if (two.label.toLowerCase().includes(value)) return true;
          else {
            two.children = two.children.filter((three: any) => {
              if (three.label.toLowerCase().includes(value)) return true;
              else return false;
            });
            return two.children.length;
          }
        });
        return one.children.length;
      }
    });
    this.inputSelectOption = arr;
  }
}
</script>

<style lang="scss" scoped></style>
