<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-color v-model="hex" class="my-picker" />
      <q-color v-model="hexa" class="my-picker" />
      <q-color v-model="rgb" class="my-picker" />
      <q-color v-model="rgba" class="my-picker" />
    </div>
    <div class="q-gutter-md row items-start">
      <q-input filled v-model="color" class="my-input">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input filled v-model="secondColor" :rules="['anyColor']" hint="With validation" class="my-input">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="secondColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentColorPicker',
})
export default class myComponentColorPicker extends Vue {
  private hex = 'var(--q-negative)';
  private hexa = '#0f0';
  private rgb = 'rgb(0,0,0)';
  private rgba = 'rgba(66,0,1,0.8)';
  private color = '#FF00FF';
  private secondColor = '#027be3';
}
</script>

<style scoped lang='scss'>
</style>
