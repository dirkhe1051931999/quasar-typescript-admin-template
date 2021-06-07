<template>
  <div class="p-20 text-center">你没有页面权限</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'page404',
})
export default class extends Vue {
  created() {}
}
</script>
