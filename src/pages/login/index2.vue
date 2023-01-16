<template>
  <div class="full-width full-height overflow-hidden absolute left-0 top-0 row">
    <div
      class="row items-center reverse justify-center col-12"
      style="flex-basis: 100%"
    >
      <!-- 发邮件忘记密码 -->
      <div
        class="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-xs-12 q-m-auto"
        style="z-index: 1000"
        v-show="pageType === 'changePasswrod'"
      >
        <div class="max-w-440 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 p-b-16 text-black">
              {{ $t('login.forgotPassword2') }}
            </div>
            <div class="p-b-24 fs-16">{{ $t('login.forgotPasswordSub') }}</div>
            <q-form ref="forgotPasswordForm">
              <div class="field">
                <div class="row q-py-md f-bold">
                  <label for="email" class="w-p-30"
                    >* {{ $t('login.email') }}</label
                  >
                </div>
                <q-input
                  type="text"
                  name="email"
                  v-model="forgotPasswordForm.email"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  :placeholder="$t('messages.pleaseEnter')"
                  dense
                  clear-icon="app:clear"
                  :rules="forgotPasswordRules.email"
                />
              </div>
              <div
                class="login-submit-button bg-gradient-primary"
                @click.prevent="handlerForgetPassword"
                v-ripple
              >
                {{ $t('action.submit').toUpperCase() }}
              </div>
            </q-form>
            <div class="text-center">
              {{ $t('login.haved') }}
              <span
                class="text-primary bg-gradient-primary text-gradient"
                @click="pageType = 'signIn'"
              >
                {{ $t('login.signIn') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 重置密码 -->
      <div
        class="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-xs-12 q-m-auto"
        style="z-index: 1000"
        v-if="pageType === 'resetPasswrod'"
      >
        <div class="max-w-440 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 p-b-16 text-black">
              {{ $t('login.resetPassword') }}
            </div>
            <div class="p-b-24 fs-16">{{ $t('login.resetPasswordSub') }}</div>
            <q-form ref="resetPasswordForm">
              <div class="field">
                <div class="row q-py-md f-bold">
                  <label for="email" class="w-p-30"
                    >* {{ $t('login.email') }}</label
                  >
                </div>
                <q-input
                  type="text"
                  name="email"
                  class="m-b-5"
                  v-model="resetPasswordForm.email"
                  autocapitalize="off"
                  autocomplete="new-password"
                  :placeholder="$t('messages.pleaseEnter')"
                  outlined
                  dense
                  readonly
                ></q-input>
              </div>
              <div class="field">
                <div class="row q-py-md f-bold">
                  <label class="w-p-30">* {{ $t('login.password') }}</label>
                </div>
                <q-input
                  type="text"
                  class="input-password m-b-5"
                  v-model="resetPasswordForm.password"
                  autocapitalize="off"
                  autocomplete="new-password"
                  :placeholder="$t('messages.pleaseEnter')"
                  outlined
                  dense
                  ref="resetPassword"
                  clear-icon="app:clear"
                  no-error-icon
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="
                    resetPasswordForm.password =
                      resetPasswordForm.password.replace(
                        /[\u4e00-\u9fa5]/gi,
                        ''
                      )
                  "
                  :rules="resetPasswordRules.password"
                >
                  <template v-slot:append>
                    <el-popover
                      placement="top"
                      :title="$t('login.rules')"
                      :width="320"
                      trigger="hover"
                    >
                      <p
                        v-for="(item, index) in $t('login.passwordRules').split(
                          '{}'
                        )"
                        :key="index"
                      >
                        {{ index + 1 }}. {{ item }}
                      </p>
                      <template #reference>
                        <q-icon
                          name="o_info"
                          class="text-grey-3 cursor-pointer"
                        />
                      </template>
                    </el-popover>
                  </template>
                </q-input>
              </div>
              <div class="field">
                <div class="row q-pb-md p-t-5 f-bold">
                  <label>* {{ $t('login.confirmPassword') }}</label>
                </div>
                <q-input
                  type="text"
                  class="input-password m-b-5"
                  v-model="resetPasswordForm.rePassword"
                  :placeholder="$t('messages.pleaseEnter')"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  dense
                  ref="resetRePassword"
                  clear-icon="app:clear"
                  no-error-icon
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="
                    resetPasswordForm.rePassword =
                      resetPasswordForm.rePassword.replace(
                        /[\u4e00-\u9fa5]/gi,
                        ''
                      )
                  "
                  :rules="resetPasswordRules.rePassword"
                />
              </div>
              <div
                class="login-submit-button bg-gradient-primary"
                @click.prevent="handlerResetPassword"
                v-ripple
              >
                {{ $t('login.resetPassword').toUpperCase() }}
              </div>
            </q-form>
            <div class="text-center">
              {{ $t('login.haved') }}
              <span
                class="text-primary bg-gradient-primary text-gradient"
                @click="resetPasswordToSignIn"
              >
                {{ $t('login.signIn') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 登录 -->
      <div
        class="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-xs-12 q-m-auto"
        style="z-index: 1000"
        v-show="pageType === 'signIn'"
      >
        <div class="max-w-440 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 p-b-16 text-black">
              {{ $t('login.signIn') }}
            </div>
            <div class="p-b-24 fs-16">{{ $t('login.signInSub') }}</div>
            <q-form>
              <div class="field">
                <div class="row">
                  <label for="email" class="q-pb-md f-bold">{{
                    $t('login.email')
                  }}</label>
                </div>
                <q-input
                  type="text"
                  name="email"
                  autocapitalize="off"
                  v-model="signInParams.email"
                  autocomplete="new-password"
                  @keyup.enter="handlerSignIn"
                  :placeholder="$t('messages.pleaseEnter')"
                  outlined
                  dense
                  no-error-icon
                  clear-icon="app:clear"
                />
              </div>
              <div class="field">
                <div class="row q-py-md f-bold">
                  <label class="w-p-30">{{ $t('login.password') }}</label>
                  <div class="text-right w-p-70">
                    <span
                      class="text-primary bg-gradient-primary text-gradient"
                      @click="pageType = 'changePasswrod'"
                      >{{ $t('login.forgotPassword') }}</span
                    >
                  </div>
                </div>
                <q-input
                  type="text"
                  class="input-password"
                  v-model="signInParams.password"
                  autocapitalize="off"
                  :placeholder="$t('messages.pleaseEnter')"
                  autocomplete="new-password"
                  outlined
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="
                    signInParams.password = signInParams.password.replace(
                      /[\u4e00-\u9fa5]/gi,
                      ''
                    )
                  "
                  @keyup.enter="handlerSignIn"
                  no-error-icon
                  dense
                  clear-icon="app:clear"
                />
              </div>
              <div
                class="login-submit-button bg-gradient-primary"
                @click.prevent="handlerSignIn"
                v-ripple
              >
                {{ $t('login.signIn').toUpperCase() }}
              </div>
            </q-form>
            <div class="text-center">
              {{ $t('login.doyouhave') }}
              <span
                class="text-primary bg-gradient-primary text-gradient"
                @click="pageType = 'signUp'"
              >
                {{ $t('login.signUp') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 注册 -->
      <div
        class="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-xs-12 q-m-auto"
        style="z-index: 1000"
        v-show="pageType === 'signUp'"
      >
        <div class="max-w-440 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 p-b-16 text-black">
              {{ $t('login.signUp') }}
            </div>
            <div class="p-b-24 fs-16">{{ $t('login.signUpSub') }}</div>
            <q-form ref="signUpForm">
              <div class="field">
                <label for="email" class="q-pb-md block f-bold"
                  >* {{ $t('login.email') }}</label
                >

                <q-input
                  type="text"
                  name="email"
                  autocapitalize="off"
                  v-model="signUpParams.email"
                  autocomplete="new-password"
                  outlined
                  clearable
                  :placeholder="$t('messages.pleaseEnter')"
                  dense
                  class="m-b-5"
                  no-error-icon
                  clear-icon="app:clear"
                  :rules="signUpRules.email"
                />
              </div>
              <div class="field">
                <label class="q-pb-md block f-bold"
                  >* {{ $t('login.password') }}</label
                >
                <q-input
                  type="text"
                  autocapitalize="off"
                  v-model="signUpParams.password"
                  autocomplete="new-password"
                  outlined
                  clearable
                  :placeholder="$t('messages.pleaseEnter')"
                  dense
                  clear-icon="app:clear"
                  class="m-b-5 input-password"
                  no-error-icon
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="
                    signUpParams.password = signUpParams.password.replace(
                      /[\u4e00-\u9fa5]/gi,
                      ''
                    )
                  "
                  :rules="signUpRules.password"
                >
                  <template v-slot:append>
                    <el-popover
                      placement="top"
                      :title="$t('login.rules')"
                      :width="320"
                      trigger="hover"
                    >
                      <p
                        v-for="(item, index) in $t('login.passwordRules').split(
                          '{}'
                        )"
                        :key="index"
                      >
                        {{ index + 1 }}. {{ item }}
                      </p>
                      <template #reference>
                        <q-icon
                          name="o_info"
                          class="text-grey-3 cursor-pointer"
                        />
                      </template>
                    </el-popover>
                  </template>
                </q-input>
              </div>
              <div class="row justify-between m-b-5">
                <div class="col-6">
                  <div class="field m-r-16">
                    <label for="firstName" class="q-pb-md block f-bold"
                      >* {{ $t('login.firstName') }}</label
                    >
                    <q-input
                      type="text"
                      name="firstName"
                      autocapitalize="off"
                      v-model="signUpParams.firstName"
                      :rules="signUpRules.firstName"
                      autocomplete="new-password"
                      clearable
                      outlined
                      no-error-icon
                      :placeholder="$t('messages.pleaseEnter')"
                      dense
                      clear-icon="app:clear"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="field">
                    <label for="lastName" class="q-pb-md block f-bold"
                      >* {{ $t('login.lastName') }}</label
                    >
                    <q-input
                      type="text"
                      name="lastName"
                      autocapitalize="off"
                      v-model="signUpParams.lastName"
                      :rules="signUpRules.lastName"
                      autocomplete="new-password"
                      clearable
                      class="m-b-5"
                      outlined
                      :placeholder="$t('messages.pleaseEnter')"
                      no-error-icon
                      dense
                      clear-icon="app:clear"
                    />
                  </div>
                </div>
              </div>
              <div class="field">
                <label for="companyName" class="q-pb-md block f-bold"
                  >* {{ $t('login.companyName') }}</label
                >
                <q-input
                  type="text"
                  name="companyName"
                  autocapitalize="off"
                  v-model="signUpParams.companyName"
                  :rules="signUpRules.companyName"
                  autocomplete="new-password"
                  clearable
                  class="m-b-5"
                  outlined
                  dense
                  :placeholder="$t('messages.pleaseEnter')"
                  no-error-icon
                  clear-icon="app:clear"
                />
              </div>
              <div>
                <label for="country" class="q-pb-md block f-bold"
                  >* {{ $t('login.country') }}</label
                >
                <q-select
                  outlined
                  v-model="signUpParams.country"
                  :rules="signUpRules.country"
                  :options="countrySelectOption"
                  emit-value
                  autocomplete="new-password"
                  dense
                  options-dense
                  clear-icon="app:clear"
                  clearable
                  class="m-b-5"
                  no-error-icon
                  :placeholder="$t('messages.pleaseSelect')"
                  dropdown-icon="app:topbar-arrow-bottom"
                >
                  <template #selected>
                    <template v-if="signUpParams.country">
                      {{
                        countrySelectOption.find(
                          (data) =>
                            String(data.value) === String(signUpParams.country)
                        )?.label ?? signUpParams.country
                      }}
                    </template>
                    <template v-else>
                      <span class="fs-12 text-grey-3 user-select-none">
                        {{ $t('messages.pleaseSelect') }}
                      </span>
                    </template>
                  </template>
                </q-select>
              </div>
              <div
                class="login-submit-button bg-gradient-primary"
                @click.prevent="handlerSignUp"
                v-ripple
              >
                {{ $t('login.signUp').toUpperCase() }}
              </div>
            </q-form>
            <div class="text-center">
              {{ $t('login.haved') }}
              <span
                class="text-primary bg-gradient-primary text-gradient"
                @click="pageType = 'signIn'"
              >
                {{ $t('login.signIn') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 插画 -->
      <div
        class="col-xl-6 col-lg-6 full-height relative-position p-16"
        :class="$q.screen.md || $q.screen.sm || $q.screen.xs ? 'hidden' : ''"
      >
        <div
          class="full-width full-height border-box b-r-16 bg-gradient-primary"
        >
          <div class="absolute-center" style="z-index: 1000; top: 35%">
            <q-img
              src="~src/assets/quasar-logo-vertical.svg"
              alt="chat-img"
              class="w-490 max-w-500"
              fit="fit"
            />
          </div>
          <div
            class="text-white absolute-x-center w-p-90 text-center"
            style="bottom: 15%"
          >
            <h4 class="f-bold lh-48" style="font-size: 2.5em">
              {{ $t('login.illustrationDescription') }}
            </h4>
            <p class="fs-16 p-t-15 lh-24">
              {{ $t('login.illustrationaDescriptionSub') }}
            </p>
          </div>
        </div>
        <img
          src="~src/assets/pattern-lines.svg"
          alt
          class="absolute left-0 top-0"
          style="z-index: 100; opacity: 0.4"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { UserModule } from 'src/store/modules/user';
import { Dictionary } from 'lodash';
import { AppModule } from 'src/store/modules/app';
import { CountrySelectOption, COUNTRY_SELECT_OPTION } from 'src/utils/country';
import { getCurrentInstance } from 'vue';
import { isValidEmail, isValidPassword } from 'src/utils/validate';
import { sleep } from 'src/utils/tools';
import { getToken } from 'src/utils/cookie';

@Component({ name: 'LoginPage2' })
export default class LoginPage2 extends Vue {
  declare $refs: any;
  @Watch('$route', { immediate: true })
  private onRouteChange(route: any) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }
  @Watch('pageType')
  private onPageTypeChange(route: any) {
    this.$nextTick(() => {
      this.$refs.forgotPasswordForm &&
        this.$refs.forgotPasswordForm.resetValidation();
      this.$refs.resetPasswordForm &&
        this.$refs.resetPasswordForm.resetValidation();
      this.$refs.signUpForm && this.$refs.signUpForm.resetValidation();
    });
  }
  @Watch('resetPasswordForm.password', { deep: true })
  onResetPasswordChange() {
    this.$refs['resetRePassword'].validate();
  }
  @Watch('resetPasswordForm.rePassword', { deep: true })
  onResetRePasswordChange() {
    this.$refs['resetPassword'].validate();
  }
  get countrySelectOption() {
    let arr: CountrySelectOption[] = [];
    if (AppModule.language === 'en-US') {
      for (let item of COUNTRY_SELECT_OPTION) {
        arr.push(
          Object.assign({
            label: item.value,
            value: item.value,
          })
        );
      }
    } else if (AppModule.language === 'zh-CN') {
      arr = COUNTRY_SELECT_OPTION;
    }
    return arr;
  }
  get token() {
    return this.$route.query.token;
  }
  created() {}
  mounted() {
    if (this.token) {
      this.pageType = 'resetPasswrod';
    }
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public pageType = 'signIn';
  private otherQuery: Dictionary<string> = {};
  public forgotPasswordForm = {
    email: '',
  };
  public resetPasswordForm = {
    email: this.globals.$route.query.email,
    password: '',
    rePassword: '',
  };
  public signInParams = {
    email: '',
    password: '',
  };
  public signUpParams = {
    platform: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    country: '',
    password: '',
  };
  public signUpRules = {
    email: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string) => {
        return isValidEmail(val) || this.globals.$t('messages.invalidEmail');
      },
      (val: string | number | undefined | null) => {
        return (
          String(val).length <= 32 ||
          "this.globals.$t('messages.lengthLessThan32')"
        );
      },
    ],
    password: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string) => {
        return (
          isValidPassword(val) || "this.globals.$t('messages.invalidPassword')"
        );
      },
    ],
    firstName: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string | number | undefined | null) => {
        return (
          String(val).length <= 32 ||
          "this.globals.$t('messages.lengthLessThan32')"
        );
      },
    ],
    lastName: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string | number | undefined | null) => {
        return (
          String(val).length <= 32 ||
          "this.globals.$t('messages.lengthLessThan32')"
        );
      },
    ],
    companyName: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string | number | undefined | null) => {
        return (
          String(val).length <= 32 ||
          "this.globals.$t('messages.lengthLessThan32')"
        );
      },
    ],
    country: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
    ],
  };
  public resetPasswordRules = {
    password: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string) => {
        return (
          isValidPassword(val) || " this.globals.$t('messages.invalidPassword')"
        );
      },
      (val: string) => {
        return (
          this.resetPasswordForm.rePassword === val ||
          "this.globals.$t('messages.twoDontMatchPassword')"
        );
      },
    ],
    rePassword: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string) => {
        return (
          isValidPassword(val) || "this.globals.$t('messages.invalidPassword')"
        );
      },
      (val: string) => {
        return (
          this.resetPasswordForm.password === val ||
          "this.globals.$t('messages.twoDontMatchPassword')"
        );
      },
    ],
  };
  public forgotPasswordRules = {
    email: [
      (val: string) => {
        return (
          (val && String(val).length > 0) ||
          this.globals.$t('messages.required')
        );
      },
      (val: string) => {
        return isValidEmail(val) || "this.globals.$t('messages.invalidEmail')";
      },
    ],
  };
  private redirect?: string;
  /* event */
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
  private async resetPasswordToSignIn() {
    if (getToken()) {
      await this.$globalConfirm.show({
        title: this.$t('messages.tishi'),
        color: 'primary',
        content: "this.$t('messages.confirmToSignOut')",
        confirmButtonText: this.$t('action.confirm'),
      });
      UserModule.ResetToken();
      this.pageType = 'signIn';
      this.$router.push('/login');
    }
    this.pageType = 'signIn';
    this.$router.push('/login');
  }
  /* http */
  private async handlerSignIn() {
    if (!this.signInParams.email || !this.signInParams.password) {
      this.$globalMessage.show({
        type: 'error',
        content: "this.$t('messages.failedObject.requiredPswAndUsername')",
      });
      return;
    }
    this.$q.loading.show();
    await UserModule.Login({
      username: this.signInParams.email,
      password: this.signInParams.password,
    });
    this.$q.loading.hide();
    this.$globalMessage.show({
      type: 'success',
      content: this.$t('messages.success'),
    });
    await sleep(500);
    location.reload();
  }
  private handlerSignUp() {
    this.$refs.signUpForm.validate().then(async (valid: boolean) => {
      if (valid) {
        this.$globalMessage.show({
          type: 'success',
          content: 'sure?',
        });
        this.signUpParams.platform = '';
        this.signUpParams.firstName = '';
        this.signUpParams.lastName = '';
        this.signUpParams.companyName = '';
        this.signUpParams.email = '';
        this.signUpParams.password = '';
        this.signUpParams.country = '';
        this.$nextTick(() => {
          this.$refs.signUpForm.resetValidation();
        });
      }
    });
  }
  private handlerResetPassword() {
    this.$refs.resetPasswordForm.validate().then(async (valid: boolean) => {
      if (valid) {
        this.$globalMessage.show({
          type: 'success',
          content: this.$t('login.resetToLogin'),
        });
        this.resetPasswordForm.password = '';
        this.resetPasswordForm.rePassword = '';
        this.$nextTick(() => {
          this.$refs.resetPasswordForm.resetValidation();
        });
        this.resetPasswordToSignIn();
      }
    });
  }
  private handlerForgetPassword() {
    this.$refs.forgotPasswordForm.validate().then(async (valid: boolean) => {
      if (valid) {
        this.$globalMessage.show({
          type: 'success',
          content: this.$t('login.forgotPasswordSuccess'),
        });
        this.forgotPasswordForm.email = '';
        this.$nextTick(() => {
          this.$refs.forgotPasswordForm.resetValidation();
        });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.login-submit-button {
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  line-height: 36px;
  width: 100%;
  height: 36px;
  border: unset;
  text-align: center;
  border-radius: 8px;
  margin: 24px 0;
  box-shadow: 0 4px 7px -1px rgb(0 0 0 / 11%), 0 2px 4px -1px rgb(0 0 0 / 7%);
  transition: all 0.15s ease-in;
  transform: scale(1);
  user-select: none;
}

.login-submit-button:hover {
  transform: scale(1.02);
}
</style>
