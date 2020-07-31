<template>
  <div>
    editor和admin
    <q-btn color="primary" icon="check" label="ADMIN" v-permission />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'Index',
})
export default class extends Vue {
  created() {}
}
</script>
<style lang="scss" scoped>
</style>
