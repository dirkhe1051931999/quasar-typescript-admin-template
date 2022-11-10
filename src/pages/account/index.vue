<template>
  <div>
    <q-banner
      inline-actions
      rounded
      class="bg-primary text-white m-b-20"
      v-show="banner"
    >
      This is a banner that can be closed manually
      <template v-slot:action>
        <q-btn flat label="close" @click="banner = false" />
      </template>
    </q-banner>
    <Construction />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { UserModule } from '../../store/modules/user';
import Construction from 'src/components/Construction/index.vue';
import setting from 'src/setting.json';
@Component({
  name: 'AccountComponent',
  components: {
    Construction,
  },
})
export default class AccountComponent extends Vue {
  get username() {
    return UserModule.username;
  }
  private adminName = setting.adminName;
  private banner = true;
}
</script>

<style scoped lang='scss'>
</style>
