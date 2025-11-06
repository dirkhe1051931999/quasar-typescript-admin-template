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
        <q-select v-model="currentLanguage" :options="languageOptions" dense outlined emit-value map-options options-dense class="language-select" @update:model-value="handleLanguageChange">
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
@import 'src/css/quasar.variables.scss';

.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navigation-height, 60px);
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  z-index: 1001;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.navigation-content {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

.navigation-left {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--sidebar-width);
  height: 100%;
  padding-left: 24px;
  padding-right: 12px;
  transition: width 0.28s ease, padding 0.28s ease;
  flex-shrink: 0;

  &.is-collapse {
    width: var(--sidebar-collapse-width);
    padding: 0;
    justify-content: center;
  }
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.sidebar-brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #323232;
}

.sidebar-subtitle {
  font-size: 12px;
  color: $grey;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.collapse-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 4px;
  background: #ffffff;
  color: $grey-9;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(15, 23, 42, 0.06);
  transition: all 0.25s ease;
  flex-shrink: 0;

  .q-icon {
    font-size: 20px;
  }

  &:hover {
    background: linear-gradient(135deg, var(--q-primary) 0%, #764ba2 100%);
    border-color: var(--q-primary);
    color: #fff;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

.navigation-left.is-collapse {
  .collapse-btn {
    margin: 0 auto;
  }
}

.navigation-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  flex: 1;
  padding: 0 24px;
}

.language-select {
  min-width: 120px;
}

.logout-btn {
  color: $grey-9;

  &:hover {
    color: var(--q-primary);
    background: rgba(102, 126, 234, 0.1);
  }
}

@media (max-width: 1024px) {
  .navigation-left {
    width: 100% !important;
    border-right: none;
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  }

  .navigation-right {
    padding: 0 16px;
  }
}
</style>
