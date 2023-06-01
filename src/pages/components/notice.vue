<template>
  <div class="q-pa-md q-gutter-y-sm column items-center">
    <MyTooltip content="tip tip tip tip tip tip tip tip tip tip tip tip tip tip tip tip" style="width: 100px"> </MyTooltip>
    <TextToInput value="text text" :that="textToInputThat" :loading="textToInputLoading" @confirm="textToInputConfirm" @close="textToInputClose"> </TextToInput>
    <MyBanner content="ok ok ok ok ok ok ok ok ok ok ok ok" bid="notice-banner-1" bannerType="warn" :showClose="true"></MyBanner>
    <MyBanner content="ok ok ok ok ok ok ok ok ok ok ok ok" bid="notice-banner-2" bannerType="success" :showClose="true"></MyBanner>
    <MyBanner content="ok ok ok ok ok ok ok ok ok ok ok ok" bid="notice-banner-3" bannerType="negative" :showClose="true"></MyBanner>
    <MyBanner content="ok ok ok ok ok ok ok ok ok ok ok ok" bid="notice-banner-4" bannerType="primary" :showClose="true"></MyBanner>
    <div class="q-pa-md q-gutter-sm">
      <q-banner dense class="bg-primary text-white">
        Unfortunately, the credit card did not go through, please try again.
        <template v-slot:action>
          <q-btn flat color="white" label="Dismiss" />
          <q-btn flat color="white" label="Update Credit Card" />
        </template>
      </q-banner>

      <q-banner dense>
        <template v-slot:avatar>
          <q-icon name="signal_wifi_off" color="primary" />
        </template>
        You have lost connection to the internet. This app is offline.
        <template v-slot:action>
          <q-btn flat color="primary" label="Turn on Wifi" />
        </template>
      </q-banner>
      <q-banner dense inline-actions class="text-white bg-red">
        You have lost connection to the internet. This app is offline.
        <template v-slot:action>
          <q-btn flat color="white" label="Turn ON Wifi" />
        </template>
      </q-banner>
    </div>
    <q-btn push color="white" text-color="primary" label="Grid BottomSheet" @click="show(true)" />

    <div class="q-pa-md q-gutter-sm">
      <q-btn push color="white" text-color="primary" label="Unread Mails">
        <q-badge color="orange" floating>22</q-badge>
      </q-btn>

      <q-btn dense color="purple" round icon="email" class="q-ml-md">
        <q-badge color="red" floating>4</q-badge>
      </q-btn>
    </div>
    <div class="q-pa-md q-gutter-md" style="font-size: 36px">
      <q-icon name="settings_remote" class="text-brown cursor-pointer">
        <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
          <q-banner class="bg-brown text-white">
            <template v-slot:avatar>
              <q-icon name="signal_wifi_off" />
            </template>
            You have lost connection to the internet. This app is offline.
          </q-banner>
        </q-popup-proxy>
      </q-icon>

      <q-icon name="perm_data_setting" class="text-purple cursor-pointer">
        <q-popup-proxy :offset="[10, 10]">
          <q-banner class="bg-purple text-white">
            <template v-slot:avatar>
              <q-icon name="signal_wifi_off" />
            </template>
            You have lost connection to the internet. This app is offline.
          </q-banner>
        </q-popup-proxy>
      </q-icon>
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-btn color="primary">
          Hover
          <q-tooltip content-class="bg-indigo" :offset="[10, 10]">Here I am!</q-tooltip>
        </q-btn>

        <q-btn color="primary">
          Over
          <q-tooltip content-class="bg-red" :offset="[10, 10]">Here I am!</q-tooltip>
        </q-btn>

        <q-btn color="primary">
          These
          <q-tooltip content-class="bg-purple" content-style="font-size: 16px" :offset="[10, 10]">Here I am!</q-tooltip>
        </q-btn>

        <q-btn color="primary">
          Buttons
          <q-tooltip content-class="bg-amber  shadow-4" :offset="[10, 10]">Here I am!</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Alert" color="primary" @click="alert" />
      <q-btn label="Confirm" color="primary" @click="confirm" />
      <q-btn label="Prompt" color="primary" @click="prompt" />
    </div>
    <div>
      <div class="row q-gutter-sm">
        <q-btn round size="sm" color="secondary" @click="showNotif('top-left')">
          <q-icon name="arrow_back" class="rotate-45" />
        </q-btn>
        <q-btn round size="sm" color="accent" @click="showNotif('top')">
          <q-icon name="arrow_upward" />
        </q-btn>
        <q-btn round size="sm" color="secondary" @click="showNotif('top-right')">
          <q-icon name="arrow_upward" class="rotate-45" />
        </q-btn>
      </div>
    </div>

    <div>
      <div class="row q-gutter-sm">
        <div>
          <q-btn round size="sm" color="accent" @click="showNotif('left')">
            <q-icon name="arrow_back" />
          </q-btn>
        </div>
        <div>
          <q-btn round size="sm" color="accent" @click="showNotif('center')">
            <q-icon name="fullscreen_exit" />
          </q-btn>
        </div>
        <div>
          <q-btn round size="sm" color="accent" @click="showNotif('right')">
            <q-icon name="arrow_forward" />
          </q-btn>
        </div>
      </div>
    </div>

    <div>
      <div class="row q-gutter-sm">
        <div>
          <q-btn round size="sm" color="secondary" @click="showNotif('bottom-left')">
            <q-icon name="arrow_forward" class="rotate-135" />
          </q-btn>
        </div>
        <div>
          <q-btn round size="sm" color="accent" @click="showNotif('bottom')">
            <q-icon name="arrow_downward" />
          </q-btn>
        </div>
        <div>
          <q-btn round size="sm" color="secondary" @click="showNotif('bottom-right')">
            <q-icon name="arrow_forward" class="rotate-45" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
const alerts = [
  {
    color: 'negative',
    message: 'Woah! Danger! You are getting good at this!',
    icon: 'report_problem',
  },
  { message: 'You need to know about this!', icon: 'warning' },
  { message: 'Wow! Nice job!', icon: 'thumb_up' },
  { color: 'teal', message: 'Quasar is cool! Right?', icon: 'tag_faces' },
  {
    color: 'purple',
    message: 'Jim just pinged you',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
  },
  {
    multiLine: true,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic quisquam non ad sit assumenda consequuntur esse inventore officia. Corrupti reiciendis impedit vel, fugit odit quisquam quae porro exercitationem eveniet quasi.',
  },
];
@Component({
  name: 'myComponentNotice',
})
export default class myComponentNotice extends Vue {
  private textToInputLoading = false;
  private textToInputThat = { a: 1, b: 2 };
  private textToInputConfirm({ value, that }: { value: string; that: any }) {
    console.log(value);
    console.log(that);
  }
  private textToInputClose({ value, that }: { value: string; that: any }) {
    console.log(value);
    console.log(that);
  }
  private showNotif(position: any) {
    const { color, multiLine, icon, message, avatar } = alerts[Math.floor(Math.random() * 10) % alerts.length];
    const random = Math.random() * 100;

    const twoActions = random > 70;
    const buttonColor = color ? 'white' : void 0;

    this.$q.notify({
      color,
      textColor: 'hello',
      icon,
      message,
      position,
      avatar,
      multiLine,
      actions: [
        {
          label: 'Reply',
          color: buttonColor,
          handler: () => {
            /* console.log('wooow') */
          },
        },
        {
          label: 'Dismiss',
          color: 'yellow',
          handler: () => {
            /* console.log('wooow') */
          },
        },
      ],
      timeout: Math.random() * 5000 + 3000,
    });
  }
  private alert() {
    this.$q
      .dialog({
        title: 'Alert',
        message: 'Some message',
      })
      .onOk(() => {
        // console.log('OK')
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }

  private confirm() {
    this.$q
      .dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        // console.log('>>>> OK')
      })
      .onOk(() => {
        // console.log('>>>> second OK catcher')
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }

  private prompt() {
    this.$q
      .dialog({
        title: 'Prompt',
        message: 'What is your name?',
        prompt: {
          model: '',
          type: 'text', // optional
        },
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        // console.log('>>>> OK, received', data)
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }
  private show(grid: any) {
    this.$q
      .bottomSheet({
        message: 'Bottom Sheet message',
        grid,
        actions: [
          {
            label: 'Drive',
            icon: 'thumb_up',
          },
          {
            label: 'Keep',
            icon: 'touch_app',
          },
          {
            label: 'Google Hangouts',
            icon: 'settings_phone',
          },
          {
            label: 'Calendar',
            icon: 'pets',
          },
          {},
          {
            label: 'Share',
            icon: 'pan_tool',
          },
          {
            label: 'Upload',
            icon: 'fingerprint',
          },
          {},
          {
            label: 'John',
            icon: 'mail',
          },
        ],
      })
      .onOk(() => {
        // console.log('Action chosen:', action.id)
      })
      .onCancel(() => {
        // console.log('Dismissed')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
  }
}
</script>

<style scoped lang="scss"></style>
