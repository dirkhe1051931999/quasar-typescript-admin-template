<template>
  <header class="navigation-bar">
    <div class="navigation-content">
      <div class="navigation-left" :class="{ 'is-collapse': isCollapse }">
        <div class="sidebar-brand" v-show="!isCollapse">
          <div class="sidebar-brand-text">
            <span class="sidebar-title">Quasar Admin</span>
            <span class="sidebar-subtitle">控制台</span>
          </div>
        </div>
        <button class="collapse-btn" type="button" @click="toggleCollapse" aria-label="折叠侧边栏">
          <q-icon :name="isCollapse ? 'chevron_right' : 'chevron_left'" />
        </button>
      </div>
      <div class="navigation-right">
        <q-select
          v-model="currentLanguage"
          :options="languageOptions"
          dense
          outlined
          emit-value
          map-options
          options-dense
          class="language-select"
          @update:model-value="handleLanguageChange"
          popup-content-class="j-q-select-popup select-popup-content height1"
        >
          <template v-slot:prepend>
            <q-icon name="language" />
          </template>
        </q-select>
        <q-btn flat round dense icon="logout" class="logout-btn" @click="handleLogout">
          <q-tooltip>{{ $t('layouts.logout') }}</q-tooltip>
        </q-btn>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { AppModule } from 'src/store/modules/app';
import { UserModule } from 'src/store/modules/user';
import setting from 'src/setting.json';
import { Locale, setLocale } from 'rtcpt';

export default defineComponent({
  name: 'NavigationBar',
  setup() {
    const router = useRouter();
    const { locale } = useI18n();

    const languageOptions = ref([
      { value: 'en-US', label: 'English' },
      { value: 'zh-CN', label: '中文' },
    ]);

    const currentLanguage = computed({
      get: () => AppModule.language || 'zh-CN',
      set: (value: string) => {
        // This is handled by handleLanguageChange
      },
    });

    const isCollapse = computed(() => {
      return AppModule.sidebarStatus;
    });

    const handleLanguageChange = (language: string) => {
      AppModule.SET_LANGUAGE(language);
      locale.value = language;
      setting.language = language;
      setLocale(language as Locale);
    };

    const toggleCollapse = () => {
      AppModule.SET_SIDEBAR_STATUS(!isCollapse.value);
    };

    const handleLogout = async () => {
      try {
        await UserModule.LogOut();
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      languageOptions,
      currentLanguage,
      isCollapse,
      handleLanguageChange,
      toggleCollapse,
      handleLogout,
    };
  },
});
</script>

<style lang="scss" scoped>
@use './index';
</style>