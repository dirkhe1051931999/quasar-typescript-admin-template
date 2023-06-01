<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-tabs v-model="tab" class="text-teal">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>

      <q-tabs v-model="tab" inline-label class="bg-purple shadow-2">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>

      <q-tabs v-model="tab" class="bg-orange shadow-2">
        <q-tab name="mails" label="Mails" />
        <q-tab name="alarms" label="Alarms" />
        <q-tab name="movies" label="Movies" />
      </q-tabs>

      <q-tabs v-model="tab" class="bg-teal text-yellow shadow-2">
        <q-tab name="mails" icon="mail" />
        <q-tab name="alarms" icon="alarm" />
        <q-tab name="movies" icon="movie" />
      </q-tabs>

      <q-tabs v-model="tab" inline-label class="bg-primary shadow-2">
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
        <q-tab name="photos" icon="photo" label="Photos" />
        <q-tab name="videos" icon="slow_motion_video" label="Videos" />
        <q-tab name="addressbook" icon="people" label="Address Book" />
      </q-tabs>
    </div>
    <q-card class="m-t-30">
      <div class="row items-center justify-between p-10">
        <q-splitter v-model="splitterModel" class="w-p-48 splitter">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab name="mails" icon="mail" label="Mails" />
              <q-tab name="alarms" icon="alarm" label="Alarms" />
              <q-tab name="movies" icon="movie" label="Movies" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
              <q-tab-panel name="mails">
                <div class="text-h4 q-mb-md">Mails</div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
              </q-tab-panel>

              <q-tab-panel name="alarms">
                <div class="text-h4 q-mb-md">Alarms</div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
              </q-tab-panel>

              <q-tab-panel name="movies">
                <div class="text-h4 q-mb-md">Movies</div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur
                  culpa fuga nulla ullam. In, libero.
                </p>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
        <div class="q-gutter-y-md w-p-50">
          <q-list>
            <q-item v-for="item in allTabs" :key="item.tab.name" tag="label" dense v-ripple>
              <q-item-section side>
                <q-checkbox
                  :value="item.selected"
                  @update:model-value="
                    (status) => {
                      setTabSelected(item.tab, status);
                    }
                  "
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.tab.label }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon :name="item.tab.icon" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-toolbar class="bg-purple shadow-2 rounded-borders">
            <q-btn flat label="Homepage" />
            <q-space />

            <!--
          notice shrink property since we are placing it
          as child of QToolbar
            -->
            <q-tabs v-model="tab" inline-label shrink stretch>
              <q-tab v-for="tab in tabs" :key="tab.name" v-bind="tab" />
            </q-tabs>
          </q-toolbar>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
const allTabs = [
  { name: 'mails', icon: 'mail', label: 'Mails' },
  { name: 'alarms', icon: 'alarm', label: 'Alarms' },
  { name: 'movies', icon: 'movie', label: 'Movies' },
  { name: 'photos', icon: 'photo', label: 'Photos' },
  { name: 'videos', icon: 'slow_motion_video', label: 'Videos' },
  { name: 'addressbook', icon: 'people', label: 'Address Book' },
];
@Component({
  name: 'myComponentTabs',
})
export default class myComponentTabs extends Vue {
  private tab = 'mails';
  private splitterModel = 20;
  get allTabs() {
    return allTabs.map((tab) => ({
      tab,
      selected: this.tabs.indexOf(tab) > -1,
    }));
  }
  private tabs = allTabs.slice(0, 1);
  private setTabSelected(tab: any, status: any) {
    if (status === true) {
      this.tabs.push(tab);
    } else {
      const index = this.tabs.indexOf(tab);

      if (index > -1) {
        this.tabs.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.body--dark {
  .splitter {
    background: #000000;
  }
}
.body--light {
  .splitter {
    background: #f5f5f5;
  }
}
</style>
