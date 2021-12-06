<template>
  <div class="login-container relative window-height w-full">
    <img src="~@/assets/login-bg.jpg" alt class="absolute left-0 top-0 window-height w-full" />
    <q-card class="login-card" :class="useVerifyCode ? 'h-540' : 'h-470'">
      <q-card-section>
        <h3 class="text-center fs-20">{{ PrdTitle }}</h3>
      </q-card-section>
      <q-card-section class="col justify-center">
        <q-input
          v-model="username"
          type="text"
          label="Username"
          :rules="[(val) => !!val || 'required']"
          autocapitalize="off"
          autocomplete="new-password"
        />
        <q-input
          v-model="password"
          type="password"
          label="Password"
          :rules="[(val) => !!val || 'required']"
          autocapitalize="off"
          autocomplete="off"
        />
      </q-card-section>
      <q-card-section class="row j-between a-center p-t-0" v-show="useVerifyCode">
        <q-input v-model="verifyCode" type="text" label="Verify code" style="width: 50%" autocapitalize="off" autocomplete="current-password" />
        <div id="verify-code-login" style="width: 40%; height: 100%"></div>
      </q-card-section>
      <q-card-section class="row j-between a-center p-t-0"> </q-card-section>
      <q-card-section class="text-right">
        <div :class="useSwipeVerifyCode ? 'text-primary' : 'text-grey'">
          <span>Use swipe verification code to verify?</span> <q-toggle v-model="useSwipeVerifyCode" />
        </div>
        <div :class="useVerifyCode ? 'text-primary' : 'text-grey'">
          <span>Use verification code to verify?</span>
          <q-toggle v-model="useVerifyCode" />
        </div>
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
    <div v-show="showUseSwipeVerifyCode" class="useSwipeVerifyCode">
      <q-card>
        <q-card-section>
          <div class="text-h6">Use swipe verification code to verify</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div id="captcha"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { UserModule } from '../../store/modules/user';
import { Dictionary } from 'vue-router/types/router';
import { Route } from 'vue-router';
import settings from '@/settings.json';
import { GVerify } from '@/utils/canvas_verify_code';
import { sliderCaptcha } from '@/utils/slidercaptcha';
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
  created() {}
  mounted() {
    try {
      this.verifyCodeInstance = new GVerify('verify-code-login');
    } catch (error) {
      console.log(error);
    }
  }
  private username = 'admin';
  private password = '123456';
  private verifyCode = '';
  private redirect?: string;
  private PrdTitle = settings.title;
  private otherQuery: Dictionary<string> = {};
  private useVerifyCode = false;
  private useSwipeVerifyCode = false;
  private showUseSwipeVerifyCode = false;
  private verifyCodeInstance: any;
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
  private async handLogin() {
    let verifyCodeResult = true;
    if (this.useVerifyCode) {
      verifyCodeResult = this.verifyCodeInstance.validate(this.verifyCode);
    }
    if (!verifyCodeResult) {
      this.$q.notify({
        message: `Wrong verification code`,
        color: 'negative',
        multiLine: true,
        icon: 'mood_bad',
        actions: [
          {
            label: 'Close',
            color: 'white',
          },
        ],
      });
      return;
    }
    const loginSuccess = () => {
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
          this.useSwipeVerifyCode = false;
          this.useVerifyCode = false;
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
    };
    if (this.useSwipeVerifyCode) {
      this.showUseSwipeVerifyCode = true;
      var captcha = new sliderCaptcha(document.querySelector('#captcha'), {
        id: 'captcha',
        onSuccess: () => {
          var handler = setTimeout(() => {
            this.showUseSwipeVerifyCode = false;
            window.clearTimeout(handler);
            captcha.reset();
            loginSuccess();
          }, 500);
        },
      });
    } else {
      loginSuccess();
    }
  }
}
</script>
<style lang="scss">
.slidercaptcha-block {
  position: absolute;
  left: 0;
  top: 0;
}
.sliderContainer {
  position: relative;
  text-align: center;
  line-height: 40px;
  background: $grey-3;
  border-radius: 2px;
}
.sliderbg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: $grey-3;
  height: 40px;
}
.sliderContainer_success .slider {
  background-color: $teal-4;
}
.sliderContainer_success .sliderMask {
  background-color: $teal-2;
}
.sliderContainer_fail .slider {
  background: $red-11 !important;
}
.sliderContainer_fail .sliderMask {
  background: $red-3 !important;
}
.sliderContainer_fail .slider,
.sliderContainer_success .slider {
  color: $white;
}
.sliderContainer_active .sliderText,
.sliderContainer_success .sliderText,
.sliderContainer_fail .sliderText {
  display: none;
}
.sliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  background: $light-blue-2;
  border-radius: 2px;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: $white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.1s linear;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider:hover {
  background: $light-blue-5;
  color: $white;
}
.sliderText {
  position: relative;
}
.refreshIcon {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: $grey;
  font-size: 14px;
  z-index: 5;
  transition: color 0.3s linear;
}
.refreshIcon:hover {
  color: $black;
}
</style>
<style lang="scss" scoped>
.login-card {
  width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &.h-540 {
    height: 540px;
  }
  &.h-470 {
    height: 470px;
  }
}
.useSwipeVerifyCode {
  position: absolute;
  width: 320px;
  height: 310px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>