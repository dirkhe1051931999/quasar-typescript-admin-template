<template>
  <div class="p-20 text-center">You don't have page permissions</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'page404',
})
export default class extends Vue {
  created() {
    this.$router.push('/dashboard')
  }
}
</script>
