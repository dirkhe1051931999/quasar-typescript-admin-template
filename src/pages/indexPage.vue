<template>
  <q-page class="row items-center justify-evenly">
    <p>{{ $t('failed') }}</p>
    <Example
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></Example>
    <p
      class="
        count
        fs-14
        bg-yellow
        text-black text-center
        absolute
        bold
        fs-30
        w-100
        bg-grey-5
      "
      v-permission="['admin']"
    >
      {{ count }}
    </p>
    <q-btn
      color="primary"
      icon="table_bar"
      label="Vuex click to add "
      @click="onClick"
    />
    <q-btn
      color="primary"
      icon="table_bar"
      label="switch language"
      @click="onClick2"
    />
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import { Component, Vue } from 'vue-facing-decorator';
import Example from 'src/components/example.vue';
import { countModule } from 'src/store/modules/index';
import { AppModule } from 'src/store/modules/app';
import setting from 'src/setting.json';
import { i18n } from 'src/boot/i18n';

@Component({
  name: 'indexPage',
  components: {
    Example,
  },
})
export default class myComponents extends Vue {
  get count() {
    return countModule.count;
  }
  public todos: Todo[] = [
    {
      id: 1,
      content: 'ct1',
    },
    {
      id: 2,
      content: 'ct2',
    },
    {
      id: 3,
      content: 'ct3',
    },
    {
      id: 4,
      content: 'ct4',
    },
    {
      id: 5,
      content: 'ct5',
    },
  ];
  public meta: Meta = {
    totalCount: 1200,
  };
  public onClick() {
    countModule.INCREMENT();
    this.$q.notify({
      message: 'Upload success',
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
  }
  public onClick2() {
    let language = AppModule.language === 'en-US' ? 'zh-CN' : 'en-US';
    AppModule.SET_LANGUAGE(language);
    this.$i18n.locale = language;
    setting.language = language;
    this.$q
      .dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        // console.log('>>>> OK')
      });
  }
  mounted() {
    // countModule.incrementAfterTime({});
  }
}
</script>
<style lang="scss" scoped>
.count {
  // color: $primary;
  color: $positive;
}
</style>