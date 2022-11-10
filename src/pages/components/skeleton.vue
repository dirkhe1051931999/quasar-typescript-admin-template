<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-card
        flat
        bordered
        v-for="type in skeletonTypes"
        :key="type"
        style="width: 250px"
      >
        <q-card-section>
          <div class="text-caption">"{{ type }}"</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-skeleton :type="type" />
        </q-card-section>
      </q-card>
    </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left" style="width: 150px">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton animation="blink" type="text" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="n in 5" :key="n">
          <td class="text-left">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="35px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="65px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="25px" />
          </td>
          <td class="text-right">
            <q-skeleton animation="blink" type="text" width="85px" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentSkeleton',
})
export default class myComponentSkeleton extends Vue {
  private skeletonTypes = [
    'text',
    'rect',
    'circle',
    'QBtn',
    'QBadge',
    'QChip',
    'QToolbar',
    'QCheckbox',
    'QRadio',
    'QToggle',
    'QSlider',
    'QRange',
    'QInput',
    'QAvatar',
  ];
}
</script>

<style scoped lang='scss'>
</style>
