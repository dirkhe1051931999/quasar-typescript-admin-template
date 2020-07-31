<template>
  <div class="q-pa-md">
    <q-table
      :fullscreen="$q.fullscreen.isActive"
      :grid="grid"
      :data="data"
      separator="cell"
      color="primary"
      square
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      no-data-label="No Data"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      loading-label="Loading..."
      :rows-per-page-options="[10,20,50]"
    >
      <template v-slot:top>
        <q-select
          outlined
          dense
          value="Twitter"
          :options="['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']"
          :options-dense="false"
          class="w-200 m-r-10"
        >
          <template v-slot:prepend>
            <q-icon name="filter_alt" />
          </template>
        </q-select>
        <q-input outlined debounce="300" label="Search" dense class="m-r-10">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" icon="touch_app" label="Confirm" />
        <q-space />
        <q-btn
          flat
          stretch
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :label="$q.fullscreen.isActive?'fullscreen_exit':'fullscreen'"
        ></q-btn>
        <q-btn flat stretch @click="grid=!grid" :icon="grid?'grid_off':'grid_on'" label="grid"></q-btn>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-primary q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>Well this is sad... {{ message }}</span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td class="text-center">
            <q-checkbox dense v-model="props.selected" />
          </q-td>
          <q-td key="name" :props="props">{{ props.row.name }}</q-td>
          <q-td key="calories" :props="props">{{ props.row.calories }}</q-td>
          <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
          <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
          <q-td key="option" class="text-right row a-center j-end">
            <span class="link-type">details</span>
            <span class="m-l-5 delete-type vertical-middle relative">
              <q-icon name="delete_forever" />delete
              <q-popup-edit v-model="props.row.name" buttons title="Confirm?" label-set="ok" square></q-popup-edit>
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'Index',
})
export default class extends Vue {
  private loading = false;
  private grid = false;
  private selected = [];
  @Watch('pagination', { deep: true })
  onchange(newVal: any) {}
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.pagination.rowsNumber = 100;
      this.data = [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
      ];
    }, 1000);
  }
  private columns = [
    {
      name: 'name',
      label: 'Dessert (100g serving)',
      align: 'left',
      field: (row: any) => row.name,
      format: (val: string) => `${val}`,
    },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories' },
    { name: 'fat', label: 'Fat (g)', field: 'fat' },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    { name: 'protein', label: 'Protein (g)', field: 'protein' },
    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    { name: 'calcium', label: 'Calcium (%)', field: 'calcium' },
    { name: 'iron', label: 'Iron (%)', field: 'iron' },
    { name: 'option', label: 'option' },
  ];
  private data: any[] = [];
  private pagination = {
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 0,
  };
}
</script>

<style scoped lang='scss'>
.grid-style-transition {
  transition: transform 0.28s, background-color 0.28s;
}
</style>
