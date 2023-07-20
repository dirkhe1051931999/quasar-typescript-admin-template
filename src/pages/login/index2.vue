<template>
  <div class="full-width full-height overflow-hidden absolute left-0 top-0 row">
    <div class="row items-center justify-center full-width">
      <!-- 修改密码 -->
      <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 q-m-auto row" style="z-index: 1000" v-if="pageType === 'changePassword'">
        <div class="col-md-8 col-lg-8 col-xl-6 col-sm-8 col-xs-8 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 q-pb-md">Change password</div>
            <div class="p-b-24 fs-16">Please enter the following information to change your password</div>
            <q-form ref="changePasswordForm">
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="w-p-30">* Username</label>
                </div>
                <q-input
                  type="text"
                  v-model="changePasswordForm.username"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  placeholder="Please enter"
                  dense
                  clear-icon="app:clear"
                  no-error-icon
                  :rules="changePasswordRules.username"
                />
              </div>
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="w-p-30">* Old password</label>
                </div>
                <q-input
                  type="text"
                  v-model="changePasswordForm.oldPassword"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  class="input-password"
                  placeholder="Please enter"
                  dense
                  clear-icon="app:clear"
                  no-error-icon
                  :rules="changePasswordRules.oldPassword"
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="resetPasswordForm.rePassword = resetPasswordForm.rePassword.replace(/[\u4e00-\u9fa5]/gi, '')"
                />
              </div>
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="q-mr-sm">* New password</label>
                  <el-popover placement="top" title="Password rules" :width="320" popper-style="z-index:9999" trigger="hover">
                    <p v-for="(item, index) in passwordRules" :key="index">{{ index + 1 }}. {{ item }}</p>
                    <template #reference>
                      <q-icon name="o_info" class="text-grey cursor-pointer" />
                    </template>
                  </el-popover>
                </div>
                <q-input
                  type="text"
                  ref="changePassword"
                  v-model="changePasswordForm.password"
                  autocapitalize="off"
                  class="input-password"
                  autocomplete="new-password"
                  outlined
                  placeholder="Please enter"
                  dense
                  clear-icon="app:clear"
                  no-error-icon
                  :rules="changePasswordRules.password"
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="resetPasswordForm.rePassword = resetPasswordForm.rePassword.replace(/[\u4e00-\u9fa5]/gi, '')"
                />
              </div>
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="w-p-30">* Confirm Password</label>
                </div>
                <q-input
                  type="text"
                  ref="changeRePassword"
                  v-model="changePasswordForm.rePassword"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  class="input-password"
                  placeholder="Please enter"
                  dense
                  clear-icon="app:clear"
                  no-error-icon
                  :rules="changePasswordRules.rePassword"
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="resetPasswordForm.rePassword = resetPasswordForm.rePassword.replace(/[\u4e00-\u9fa5]/gi, '')"
                />
              </div>
              <q-btn class="full-width q-my-lg" @click.prevent="handlerChangePassword" label="Confirm" color="primary" />
            </q-form>
            <div class="text-center">
              Already have an account?
              <span class="detail-link-type" @click="resetPasswordToSignIn"> Sign In </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 发邮件忘记密码 -->
      <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 q-m-auto row" style="z-index: 1000" v-if="pageType === 'forgotPassword'">
        <div class="col-md-8 col-lg-8 col-xl-6 col-sm-8 col-xs-8 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 q-pb-md">Forgot password</div>
            <div class="p-b-24 fs-16">Please enter your username and email address to reset your password.</div>
            <q-form ref="forgotPasswordForm">
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="w-p-30">* Username</label>
                </div>
                <q-input
                  type="text"
                  v-model="forgotPasswordForm.username"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  placeholder="Please enter"
                  dense
                  clear-icon="app:clear"
                  no-error-icon
                  :rules="forgotPasswordRules.username"
                />
              </div>
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="w-p-30">* Email</label>
                </div>
                <q-input
                  type="text"
                  v-model="forgotPasswordForm.email"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  placeholder="Please enter"
                  dense
                  clear-icon="app:clear"
                  no-error-icon
                  :rules="forgotPasswordRules.email"
                />
              </div>
              <q-btn class="full-width q-my-lg" @click.prevent="handlerForgetPassword" label="Confirm" color="primary" />
            </q-form>
            <div class="text-center">
              Already have an account?
              <span class="detail-link-type" @click="resetPasswordToSignIn"> Sign In </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 重置密码 -->
      <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 q-m-auto row" style="z-index: 1000" v-if="pageType === 'resetPassword'">
        <div class="col-md-8 col-lg-8 col-xl-6 col-sm-8 col-xs-8 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 q-pb-md">Reset Password</div>
            <div class="p-b-24 fs-16">Please reset your password.</div>
            <q-form ref="resetPasswordForm">
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="q-mr-sm">* Password</label>
                  <el-popover placement="top" title="Password rules" :width="320" trigger="hover">
                    <p v-for="(item, index) in passwordRules" :key="index">{{ index + 1 }}. {{ item }}</p>
                    <template #reference>
                      <q-icon name="o_info" class="text-grey-3 cursor-pointer" />
                    </template>
                  </el-popover>
                </div>
                <q-input
                  type="text"
                  class="input-password"
                  v-model="resetPasswordForm.password"
                  autocapitalize="off"
                  autocomplete="new-password"
                  placeholder="Please enter"
                  outlined
                  dense
                  ref="resetPassword"
                  clear-icon="app:clear"
                  no-error-icon
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="resetPasswordForm.password = resetPasswordForm.password.replace(/[\u4e00-\u9fa5]/gi, '')"
                  :rules="resetPasswordRules.password"
                />
              </div>
              <div class="field">
                <div class="row q-pb-md q-pt-xs f-bold">
                  <label>* Confirm password</label>
                </div>
                <q-input
                  type="text"
                  class="input-password"
                  v-model="resetPasswordForm.rePassword"
                  placeholder="Please enter"
                  autocapitalize="off"
                  autocomplete="new-password"
                  outlined
                  dense
                  ref="resetRePassword"
                  clear-icon="app:clear"
                  no-error-icon
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="resetPasswordForm.rePassword = resetPasswordForm.rePassword.replace(/[\u4e00-\u9fa5]/gi, '')"
                  :rules="resetPasswordRules.rePassword"
                />
              </div>
              <q-btn class="full-width q-my-lg" @click.prevent="handlerResetPassword" label="Confirm" color="primary" />
            </q-form>
            <div class="text-center">
              Already have an account?
              <span class="detail-link-type" @click="resetPasswordToSignIn"> Sign In </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 登录 -->
      <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 q-m-auto row" style="z-index: 1000" v-if="pageType === 'signIn'">
        <div class="col-md-8 col-lg-8 col-xl-6 col-sm-8 col-xs-8 q-mx-auto">
          <div class="p-24">
            <div class="f-bold bold fs-24 q-pb-md">Sign In</div>
            <div class="fs-16 lh-24">Please enter your username and password.</div>
            <p class="text-grey p-b-24">(Login by typing in any username, code and password)</p>
            <q-form>
              <div class="field">
                <div class="row q-pb-md text-weight-medium">
                  <label>Username</label>
                </div>
                <q-input
                  type="text"
                  autocapitalize="off"
                  v-model="signInParams.username"
                  autocomplete="new-password"
                  @keyup.enter="handlerSignIn"
                  placeholder="Please enter"
                  outlined
                  dense
                  no-error-icon
                  clear-icon="app:clear"
                />
              </div>
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label>Code</label>
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <q-select
                      v-model="signInParams.method"
                      :options="signInParams.methodSelectOption"
                      placeholder="Please enter"
                      :spellcheck="false"
                      autocomplete="new-password"
                      outlined
                      @keyup.enter="handlerSignIn"
                      no-error-icon
                      map-options
                      options-dense
                      emit-value
                      dense
                      dropdown-icon="app:topbar-arrow-bottom"
                      clear-icon="app:clear"
                    />
                  </div>
                  <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <q-input
                      type="text"
                      v-model="signInParams.code"
                      autocapitalize="off"
                      placeholder="Please enter"
                      autocomplete="new-password"
                      outlined
                      @keyup.enter="handlerSignIn"
                      no-error-icon
                      dense
                      clear-icon="app:clear"
                    />
                  </div>
                  <div class="text-right col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <q-btn color="primary" class="full-height full-width" label="Send" @click="handleClickSendCode" v-if="!signInParams.getCodeConfig.toGetVerifyCode" />
                    <q-btn color="primary" class="full-height full-width" disabled v-else :label="`${signInParams.getCodeConfig.verifyCodeCount} 秒`" />
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="row q-py-md text-weight-medium">
                  <label class="w-p-30">Password</label>
                  <div class="text-right w-p-70">
                    <span class="detail-link-type" @click="pageType = 'forgotPassword'">Forgot password?</span>
                  </div>
                </div>
                <q-input
                  type="text"
                  class="input-password"
                  v-model="signInParams.password"
                  autocapitalize="off"
                  placeholder="Please enter"
                  autocomplete="new-password"
                  outlined
                  @paste.capture.prevent="() => 0"
                  @copy.capture.prevent="() => 0"
                  @update:model-value="signInParams.password = signInParams.password.replace(/[\u4e00-\u9fa5]/gi, '')"
                  @keyup.enter="handlerSignIn"
                  no-error-icon
                  dense
                  clear-icon="app:clear"
                />
              </div>
              <q-btn class="full-width q-my-lg" @click.prevent="handlerSignIn" label="Sign In" color="primary" />
              <div class="text-center">
                <span class="detail-link-type" @click="pageType = 'changePassword'">Change password? </span>
              </div>
            </q-form>
          </div>
        </div>
      </div>
      <!-- 插画 -->
      <div class="col-md-6 col-lg-6 col-xl-6 full-height relative-position q-pa-md" :class="$q.screen.xs || $q.screen.sm ? 'hidden' : ''">
        <div class="cover row column">
          <div class="img">
            <q-img src="~assets/500.png" alt="chat-img" fit="fit" />
          </div>
          <div class="intro">
            <h4 class="f-bold lh-48" style="font-size: 2.5em">“{{ $t('login.illustrationDescription') }}”</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { UserModule } from 'src/store/modules/user';
import { Dictionary } from 'lodash';
import { getCurrentInstance } from 'vue';
import { isValidEmail, isValidPassword } from 'src/utils/validate';
import { getToken } from 'src/utils/cookie';
import { PermissionModule } from 'src/store/modules/permission';
import setting from 'src/setting.json';
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
    this.changePasswordForm.username = '';
    this.changePasswordForm.oldPassword = '';
    this.changePasswordForm.password = '';
    this.changePasswordForm.rePassword = '';
    this.forgotPasswordForm.username = '';
    this.forgotPasswordForm.email = '';
    this.resetPasswordForm.password = '';
    this.resetPasswordForm.rePassword = '';
    this.$nextTick(() => {
      this.$refs.changePasswordForm && this.$refs.changePasswordForm.resetValidation();
      this.$refs.forgotPasswordForm && this.$refs.forgotPasswordForm.resetValidation();
      this.$refs.resetPasswordForm && this.$refs.resetPasswordForm.resetValidation();
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
  @Watch('changePasswordForm.password', { deep: true })
  onChangePasswordChange() {
    this.$refs['changeRePassword'].validate();
  }
  @Watch('changePasswordForm.rePassword', { deep: true })
  onChangeRePasswordChange() {
    this.$refs['changePassword'].validate();
  }
  get token() {
    return this.$route.query.token;
  }
  created() {}
  async mounted() {
    if (this.token) {
      this.pageType = 'resetPassword';
      // token生成时间超过30分钟
      try {
        // const { code } = await UserModule.checkToken({
        //   token: this.token,
        // });
        if (['123'].includes('code')) {
          this.$q
            .dialog({
              title: '提示',
              message: '链接过期，请重新申请链接',
              persistent: true,
              cancel: false,
            })
            .onOk(() => {
              if (getToken()) {
                const routes = PermissionModule.routes;
                this.$router.push(`${routes[1].path}${routes[1] && routes[1].children && routes[1].children![0].path ? `/${routes[1].children![0].path}` : ''}`);
              } else {
                this.pageType = 'signIn';
                this.$router.push('/login2');
              }
            });
        }
      } catch (error) {
        this.$q
          .dialog({
            title: '提示',
            message: '链接过期，请重新申请链接',
            persistent: true,
            cancel: false,
          })
          .onOk(() => {
            this.pageType = 'signIn';
            this.$router.push('/login2');
          });
        console.log(error);
      }
    }
  }
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  public passwordRules = setting.passwordRules;
  public pageType = 'signIn';
  private otherQuery: Dictionary<string> = {};
  public changePasswordForm = {
    username: '',
    oldPassword: '',
    password: '',
    rePassword: '',
  };
  public forgotPasswordForm = {
    email: '',
    username: '',
  };
  public resetPasswordForm = {
    password: '',
    rePassword: '',
  };
  public signInParams = {
    username: '',
    password: '',
    code: '',
    method: 'ALI_SMS_VERIFY',
    methodSelectOption: [
      { label: 'SMS', value: 'ALI_SMS_VERIFY' },
      { label: 'EMAIL', value: 'EMAIL' },
    ],
    getCodeConfig: {
      toGetVerifyCode: false,
      getVerifyCodeLoading: false,
      verifyCodeCount: 10,
    },
  };
  public changePasswordRules = {
    username: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
    ],
    oldPassword: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
    ],
    password: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
      (val: string) => {
        return isValidPassword(val) || '无效密码';
      },
      (val: string) => {
        return this.changePasswordForm.rePassword === val || '两次密码不一致';
      },
    ],
    rePassword: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
      (val: string) => {
        return isValidPassword(val) || '无效密码';
      },
      (val: string) => {
        return this.changePasswordForm.password === val || '两次密码不一致';
      },
    ],
  };
  public forgotPasswordRules = {
    username: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
    ],
    email: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
      (val: string) => {
        return isValidEmail(val) || '无效邮箱';
      },
    ],
  };
  public resetPasswordRules = {
    password: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
      (val: string) => {
        return isValidPassword(val) || '无效密码';
      },
      (val: string) => {
        return this.resetPasswordForm.rePassword === val || '两次密码不一致';
      },
    ],
    rePassword: [
      (val: string) => {
        return (val && String(val).length > 0) || '必填';
      },
      (val: string) => {
        return isValidPassword(val) || '无效密码';
      },
      (val: string) => {
        return this.resetPasswordForm.password === val || '两次密码不一致';
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
      const result = await this.$globalConfirm.show({
        title: '再次确认',
        color: 'primary',
        content: '您已经登录，是否要注销登录并重新登录？',
        confirmButtonText: 'Confirm',
      });
      if (result) {
        UserModule.ResetToken();
        this.pageType = 'signIn';
        this.$router.push('/login2');
      } else {
        const routes = PermissionModule.routes;
        this.$router.push(`${routes[1].path}${routes[1] && routes[1].children && routes[1].children![0].path ? `/${routes[1].children![0].path}` : ''}`);
      }
    }
    this.pageType = 'signIn';
    this.$router.push('/login2');
  }
  /* http */
  private async handlerSignIn() {
    if (!this.signInParams.username || !this.signInParams.password) {
      this.$globalMessage.show({
        type: 'error',
        content: '用户名或密码不能为空',
      });
      return;
    }
    if (!this.signInParams.code) {
      this.$globalMessage.show({
        type: 'error',
        content: '验证码不能为空',
      });
      return;
    }
    this.$q.loading.show();
    await UserModule.Login({
      username: this.signInParams.username,
      password: this.signInParams.password,
      code: this.signInParams.code,
    });
    this.$q.loading.hide();
    this.$globalMessage.show({
      type: 'success',
      content: '登录成功',
    });
    location.reload();
  }
  private async handleClickSendCode() {
    if (!this.signInParams.username) {
      this.$globalMessage.show({
        type: 'error',
        content: '请输入用户名',
      });
      return;
    }
    try {
      this.signInParams.getCodeConfig.getVerifyCodeLoading = true;
      // const { email, mobile } = await UserModule.sendCode({
      //   username: this.signInParams.username,
      //   sendMethod: this.signInParams.method,
      // });
      this.signInParams.getCodeConfig.getVerifyCodeLoading = false;
      this.signInParams.getCodeConfig.toGetVerifyCode = true;
      this.$globalMessage.show({
        type: 'success',
        content: this.signInParams.method === 'EMAIL' ? `验证码已经发送到您的邮箱（${'email'}）` : `短信验证码已发送到您的手机（${'mobile'}）`,
      });
      var start = +new Date();
      let count = this.signInParams.getCodeConfig.verifyCodeCount;
      let _count = this.signInParams.getCodeConfig.verifyCodeCount;
      var timer = setInterval(() => {
        var cur = +new Date();
        count--;
        this.signInParams.getCodeConfig.verifyCodeCount = count;
        if (cur - start >= _count * 1000) {
          clearInterval(timer);
          this.signInParams.getCodeConfig.toGetVerifyCode = false;
          this.signInParams.getCodeConfig.verifyCodeCount = _count;
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      this.signInParams.getCodeConfig.getVerifyCodeLoading = false;
    }
  }
  private handlerChangePassword() {
    this.$refs.changePasswordForm.validate().then(async (valid: boolean) => {
      if (valid) {
        // await UserModule.modifyPassWithOld({
        //   username: this.changePasswordForm.username,
        //   oldPassword: this.changePasswordForm.oldPassword,
        //   newPassword: this.changePasswordForm.password,
        // });
        this.$globalMessage.show({
          type: 'success',
          content: '修改成功',
        });
        this.changePasswordForm.username = '';
        this.changePasswordForm.oldPassword = '';
        this.changePasswordForm.password = '';
        this.changePasswordForm.rePassword = '';
        this.$nextTick(() => {
          this.$refs.changePasswordForm && this.$refs.changePasswordForm.resetValidation();
        });
        this.pageType = 'signIn';
      }
    });
  }
  private handlerForgetPassword() {
    this.$refs.forgotPasswordForm.validate().then(async (valid: boolean) => {
      if (valid) {
        // await UserModule.findPassword({
        //   username: this.forgotPasswordForm.username,
        //   email: this.forgotPasswordForm.email,
        // });
        this.$globalMessage.show({
          type: 'success',
          content: '操作成功，请检查您的电子邮件以重置您的密码',
        });
        this.forgotPasswordForm.email = '';
        this.forgotPasswordForm.username = '';
        this.$nextTick(() => {
          this.$refs.forgotPasswordForm && this.$refs.forgotPasswordForm.resetValidation();
        });
        this.pageType = 'signIn';
      }
    });
  }
  private handlerResetPassword() {
    this.$refs.resetPasswordForm.validate().then(async (valid: boolean) => {
      if (valid) {
        // await UserModule.modifyPassWithoutOld({
        //   token: this.token,
        //   newPassword: this.resetPasswordForm.password,
        // });
        if (!getToken()) {
          this.$globalMessage.show({
            type: 'success',
            content: '修改成功，请重新登录',
          });
        }
        this.resetPasswordForm.password = '';
        this.resetPasswordForm.rePassword = '';
        this.$nextTick(() => {
          this.$refs.resetPasswordForm && this.$refs.resetPasswordForm.resetValidation();
        });
        this.resetPasswordToSignIn();
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.body--dark {
  .cover {
    box-shadow: 0px 6px 16px 3px rgba($color: #ffffff, $alpha: 0.09);
  }
}
.body--light {
  .cover {
    box-shadow: 0px 6px 16px 3px rgba($color: #000000, $alpha: 0.09);
  }
}
.cover {
  width: 100%;
  height: 100%;
  background: var(--my-grey-1);
  border-radius: 16px;
  .intro {
    text-align: center;
    padding: 16px;
    position: absolute;
    width: 100%;
    bottom: 10%;
  }
  .img {
    padding: 16px;
    margin: 32px auto;
  }
}

body.screen--md {
  .cover {
    .img {
      width: 600px;
    }
  }
  .intro {
    bottom: 5%;
  }
}
body.screen--lg {
  .cover {
    .img {
      width: 700px;
    }
  }
}
body.screen--xl {
  .cover {
    .img {
      width: 800px;
    }
  }
}
</style>
