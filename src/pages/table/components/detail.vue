<template>
  <div>
    <j-c-tabs v-model="dialogParams.tab.model" :options="dialogParams.tab.options" variant="default" class="q-mb-md" />
    <j-c-tabs v-model="dialogParams.tab.model" :options="dialogParams.tab.options" variant="flat" class="q-mb-sm" />
    <j-c-tabs v-model="dialogParams.tab.model" :options="dialogParams.tab.options" variant="line" class="q-mb-md" />
    <keep-alive>
      <Component :is="dynamicComponent" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import DetailBaseComponent from './detail-base.vue';
import DetailWorldMapComponent from './detail-world.vue';
import DetailChartComponent from './detail-chart.vue';
import { JCTabs } from 'qcpt';

@Component({
  name: 'TableDetailComponent',
  components: { JCTabs },
})
export default class TableDetailComponent extends Vue {
  get dynamicComponent() {
    switch (this.dialogParams.tab.model) {
      case 'base':
        return DetailBaseComponent;
      case 'map':
        return DetailWorldMapComponent;
      case 'chart':
        return DetailChartComponent;
      default:
        return void 0;
    }
  }

  public dialogParams = {
    tab: {
      options: [
        { label: 'Base', value: 'base' },
        { label: 'World Map', value: 'map' },
        { label: 'Chart', value: 'chart' },
        { label: 'Disabled', value: 'disabled', disable: true },
      ],
      model: 'base',
    },
  };
}
</script>

<style scoped></style>
