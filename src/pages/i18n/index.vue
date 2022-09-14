<template>
  <div class="row">
    <q-btn :label="$t('messages.success')" class="m-r-20" />
    <q-btn :label="$t('messages.failed')" />
    <q-select
      v-model="lang"
      :options="langOptions"
      label="Quasar Language"
      dense
      borderless
      emit-value
      map-options
      options-dense
      style="min-width: 150px"
    />
  </div>
</template>

<script lang="ts">
import languages from 'quasar/lang/index.json';

const appLanguages = languages.filter((lang) => ['de', 'en-us'].includes(lang.isoName));
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'Index',
})
export default class extends Vue {
  private lang = this.$q.lang.isoName;
  private langOptions = {};
  @Watch('lang')
  onchange(lang: string) {
    import(
      /* webpackInclude: /(de|en-us)\.js$/ */
      `quasar/lang/${lang}`
    ).then((lang) => {
      this.$q.lang.set(lang.default);
    });
  }
  created() {
    this.langOptions = appLanguages.map((lang) => ({
      label: lang.nativeName,
      value: lang.isoName,
    }));
  }
}
</script>

<style scoped lang='scss'>
</style>
