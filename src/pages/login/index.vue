<template>
  <div class="login-container relative w-full h-full">
    <img src="~@/assets/login-bg.jpg" alt class="absolute left-0 top-0 w-full h-full" />
    <div :class="['row j-end  a-center window-height',!$q.platform.is.mobile?'p-100':'p-20']">
      <q-card :class="['my-card ',!$q.platform.is.mobile?'w-p-28':'w-full']">
        <q-card-section>
          <h3 class="text-subtitle2 text-center fs-20 relative">{{PrdTitle}}</h3>
          <span class="sub"></span>
        </q-card-section>
        <q-card-section class="col justify-center p-b-20">
          <q-input v-model="username" type="text" label="Username" class="m-b-10" />
          <q-input v-model="password" type="password" label="Password" class="m-b-10" />
          <div class="row a-center text-primary fs-14 j-end m-t-20 cursor-pointer">
            <span>修改密码</span>
            <q-icon name="keyboard_arrow_right" class="fs-18" />
          </div>
          <q-btn
            color="primary"
            icon="login"
            label="Login"
            @click.prevent="handLogin"
            class="w-full m-t-20 h-44"
            :loading="loginLoading"
            :disable="loginLoading"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { AddressbarColor } from 'quasar';
import { setToken } from '../../utils/cookies';
import axios from '../../utils/request';
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
.sub {
  width: 30px;
  height: 4px;
  background: $blue;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
}
</style>
