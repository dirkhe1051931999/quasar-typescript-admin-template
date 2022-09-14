<template>
  <div>
    <q-banner inline-actions rounded class="bg-blue text-white m-b-20" v-show="banner">
      This is a banner that can be closed manually
      <template v-slot:action>
        <q-btn flat label="close" @click="banner = false" />
      </template>
    </q-banner>
    <Construction />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '../../store/modules/user';
import Construction from '@/components/Construction/index.vue';
import settings from '@/settings.json';
@Component({
  name: 'Account',
  components: {
    Construction,
  },
})
export default class extends Vue {
  get username() {
    return UserModule.username;
  }
  private adminName = settings.adminName;
  private banner = true;
  get avatar() {
    return UserModule.avatar;
  }
}
</script>

<style scoped lang='scss'>
</style>
