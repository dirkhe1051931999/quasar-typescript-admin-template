<template>
  <div>
    <div class="row a-center j-center m-t-20">
      <PanThumb  :height="'100px'" :width="'100px'" :hoverable="false">
        <div>Hello</div>Admin
      </PanThumb>
    </div>
    <q-card class="m-t-50">
      <q-card-section>
        <div class="text-h6">Profile</div>
        <q-input value="admin" type="outline" label="Username" readonly />
        <q-input value="110" type="outline" label="Tel" readonly />
        <q-input value="110" type="outline" label="Tel" readonly />
        <q-input value="110" type="outline" label="Tel" readonly />
        <q-input value="110" type="outline" label="Tel" readonly />
        <q-input value="110" type="outline" label="Tel" readonly />
        <q-input value="110" type="outline" label="Tel" readonly />
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '../../store/modules/user';
import settings from '@/settings.json';
import PanThumb from '@/components/PanThumb/index.vue';

@Component({
  name: 'Profile',
  components: {
    PanThumb,
  },
})
export default class extends Vue {
  get username() {
    return UserModule.username;
  }
  private adminName = settings.adminName;
  get avatar() {
    return UserModule.avatar;
  }
}
</script>

<style scoped lang='scss'>
</style>
