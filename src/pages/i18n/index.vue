<template>
  <div class="row">
    <q-btn :label="$t('messages.success')" class="q-mr-md" color="primary" />
    <q-btn :label="$t('messages.failed')" color="primary" class="q-mr-md" />
    <q-select v-model="locale" :options="localeOptions" label="Quasar Language" @update:model-value="checkLang" dense outlined emit-value map-options options-dense style="min-width: 150px" />
  </div>
</template>
<script lang="ts">
import languages from 'quasar/lang/index.json';
import { AppModule } from 'src/store/modules/app';
import setting from 'src/setting.json';
const appLanguages = languages.filter((lang) => ['de', 'en-us'].includes(lang.isoName));
import { Component, Vue, Watch } from 'vue-facing-decorator';

@Component({
  name: 'myComponentI18n',
})
export default class myComponentI18n extends Vue {
  mounted() {
    this.locale = this.$q.lang.isoName;
  }
  public localeOptions = [
    { value: 'en-US', label: 'English' },
    { value: 'zh-CN', label: '中文' },
  ];
  public locale = '';
  public checkLang(language: string) {
    if (language === 'en-US') {
      AppModule.SET_LANGUAGE(language);
      this.$i18n.locale = language;
      setting.language = language;
    } else {
      AppModule.SET_LANGUAGE(language);
      this.$i18n.locale = language;
      setting.language = language;
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
