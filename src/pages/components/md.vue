<template>
  <div>
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-input v-model="mdString" type="textarea" borderless autofocus class="border p-10" />
      </template>
      <template v-slot:after>
        <div v-html="calac" class="border p-10"></div>
      </template>
    </q-splitter>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import marked from 'marked';
@Component({
  name: 'Md',
})
export default class extends Vue {
  private splitterModel = 50;
  private mdString = '# hello';
  get calac() {
    return marked(this.mdString);
  }
  created() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      breaks: true,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  }
}
</script>

<style scoped lang='scss'>
</style>
