<template>
  <div>
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
  get avatar() {
    return UserModule.avatar;
  }
}
</script>

<style scoped lang='scss'>
</style>
