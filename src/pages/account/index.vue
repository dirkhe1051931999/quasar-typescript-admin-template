<template>
  <div>No Data</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { UserModule } from 'src/store/modules/user';
import setting from 'src/setting.json';

@Component({
  name: 'AccountComponent',
  components: {},
})
export default class AccountComponent extends Vue {
  get username() {
    return UserModule.username;
  }

  private adminName = setting.adminName;
  private banner = true;
}
</script>

<style scoped lang="scss"></style>
