<template>
  <div>
    <Topology
      width="54em"
      height="51em"
      :link="link"
      v-if="link.length"
    ></Topology>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import Topology from './components/topology.vue';
@Component({
  name: 'myComponentRelationship',
  components: {
    Topology,
  },
})
export default class myComponentRelationship extends Vue {
  private link = [
    {
      name: 'A',
      status: false,
      type: '1',
    },
    {
      name: 'B',
      status: false,
      type: '1',
    },
    {
      name: 'O',
      status: true,
      type: '0',
    },
    {
      name: 'C',
      status: true,
      type: '2',
    },
    {
      name: 'D',
      status: true,
      type: '2',
    },
    {
      name: 'E',
      status: true,
      type: '2',
    },
    {
      name: 'F',
      status: false,
      type: '2',
    },
  ];
  async mounted() {}
}
</script>

<style lang='scss' scoped>
</style>
