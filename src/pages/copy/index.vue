<template>
  <div>
    <q-input v-model="loremipsum" type="textarea" label="Copy" />
    <q-btn color="primary" icon="content_cut" label="copy" @click="onClick" />
  </div>
</template>

<script lang="ts">
import { copyToClipboard } from 'quasar';
import { Component, Vue } from 'vue-property-decorator';
import { date } from 'quasar';

@Component({
  name: 'Index',
})
export default class extends Vue {
  private loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ';
  private onClick() {
    copyToClipboard(this.loremipsum)
      .then(() => {
        this.$q.notify({
          message: this.loremipsum,
          caption: date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
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
      })
      .catch(() => {
        // 失败
      });
  }
}
</script>

<style scoped lang='scss'>
.animate-bounce {
  animation: q-bounce 2s infinite;
}

@keyframes q-bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
