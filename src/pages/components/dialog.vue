<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Radio Options" color="primary" @click="radio" />
    <q-btn label="Checkbox Options" color="primary" @click="checkbox" />
    <q-btn label="Toggle Options" color="primary" @click="toggle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({ name: 'myComponentDialog' })
export default class myComponentDialog extends Vue {
  private radio() {
    this.$q
      .dialog({
        title: 'Options',
        message: "Choose your option, but make sure it's the second one :)",
        options: {
          type: 'radio',
          model: 'opt1',
          isValid: (val: any) => val === 'opt2',
          // inline: true
          items: [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
            { label: 'Option 3', value: 'opt3' },
          ],
        },
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        // console.log('>>>> OK, received', data)
      });
  }

  private checkbox() {
    this.$q
      .dialog({
        title: 'Options',
        message:
          'Choose your options, but make sure you also pick the second one.',
        options: {
          type: 'checkbox',
          model: [],
          isValid: (model: any) => model.includes('opt2'),
          // inline: true
          items: [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
            { label: 'Option 3', value: 'opt3' },
          ],
        },
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        // console.log('>>>> OK, received', data)
      });
  }

  private toggle() {
    this.$q
      .dialog({
        title: 'Options',
        message:
          'Choose your options, but make sure you also pick the first two.',
        options: {
          type: 'toggle',
          model: [],
          isValid: (model: any) =>
            model.includes('opt1') && model.includes('opt2'),
          // inline: true,
          items: [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
            { label: 'Option 3', value: 'opt3' },
          ],
        },
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        // console.log('>>>> OK, received', data)
      });
  }
}
</script>

<style scoped lang='scss'>
</style>
