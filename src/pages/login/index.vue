<template>
  <div class="login-container relative window-height w-full">
    <img src="~@/assets/login-bg.jpg" alt class="absolute left-0 top-0 window-height w-full" />
    <q-card class="login-card">
      <q-card-section>
        <h3 class="text-center fs-20">{{ PrdTitle }}</h3>
      </q-card-section>
      <q-card-section class="col justify-center">
        <q-input v-model="username" type="text" label="Username" :rules="[(val) => !!val || 'required']" />
        <q-input v-model="password" type="password" label="Password" :rules="[(val) => !!val || 'required']" />
      </q-card-section>
      <q-card-section class="text-primary text-right">
        <span class="cursor-pointer">Change your Password?</span>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          icon="login"
          label="Login"
          @click.prevent="handLogin"
          class="w-full h-50"
          :loading="loginLoading"
          :disable="loginLoading"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { UserModule } from '../../store/modules/user';
import { Dictionary } from 'vue-router/types/router';
import { Route } from 'vue-router';
import settings from '@/settings.json';
@Component({
  name: 'Index',
})
export default class extends Vue {
  get loginLoading() {
    return UserModule.loginLoading;
  }
  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }
  private username = 'admin';
  private password = '123456';
  private redirect?: string;
  private PrdTitle = settings.title;
  private otherQuery: Dictionary<string> = {};

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
  private async handLogin() {
    UserModule.SET_LOGIN_LOADING(true);
    setTimeout(async () => {
      await UserModule.Login({ username: this.username, password: this.password });
      if (!this.redirect) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push(
          { path: this.redirect || '/dashboard' },
          () => {},
          () => {},
        );
      }
      setTimeout(() => {
        UserModule.SET_LOGIN_LOADING(false);
        this.$q.notify({
          message: `${this.$i18n.tc('messages.success')}`,
          color: 'primary',
          multiLine: true,
          icon: 'mood',
          actions: [
            {
              label: 'Close',
              color: 'white',
            },
          ],
        });
      }, 1000);
    }, 1000);
  }
  created() {}
}
</script>
<style lang="scss" scoped>
.login-card {
  width: 500px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>