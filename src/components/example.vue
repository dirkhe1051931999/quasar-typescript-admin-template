<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import { Todo, Meta } from 'components/models';
import { countModule } from 'src/store/modules';
@Component({
  name: 'Example',
})
export default class ExampleComponent extends Vue {
  @Prop({
    default: '',
  })
  title!: string;
  @Prop({
    default: [],
  })
  todos?: Todo[];
  @Prop({
    default: {},
  })
  meta!: Meta;
  @Prop({
    default: '',
  })
  active!: boolean;
  get todoCount() {
    return this.todos?.length;
  }
  public clickCount = 0;
  public increment() {
    this.clickCount++;
    this.todos?.push({ id: 111, content: '123' });
  }
}
</script>


<style lang="scss" scoped>
</style>