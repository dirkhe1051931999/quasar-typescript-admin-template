import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import { RouteLocationNormalized } from 'vue-router';
import store from 'src/store';
export type ITagsView = Partial<RouteLocationNormalized>;
export interface ITagsViewState {
  visitedViews: ITagsView[];
}
@Module({ dynamic: true, namespaced: true, store, name: 'TagsView' })
class TagsView extends VuexModule {
  public visitedViews: ITagsView[] = [];
  @Mutation
  private ADD_VISITED_VIEW(view: ITagsView) {
    if (
      this.visitedViews.some((v, index) => {
        if (v.path === view.path) {
          if (v.fullPath !== view.fullPath) {
            // 防止 query 参数丢失
            this.visitedViews[index] = Object.assign({}, view);
          }
          return true;
        }
      })
    ) {
      return;
    }
    this.visitedViews.push(Object.assign({}, view));
  }
  @Mutation
  private DEL_VISITED_VIEW(view: ITagsView) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }
  @Mutation
  private DEL_OTHER_VISITED_VIEWS(view: ITagsView) {
    this.visitedViews = this.visitedViews.filter((v) => {
      return v.meta?.affix || v.path === view.path;
    });
  }
  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    // keep affix tags
    const affixTags = this.visitedViews.filter((tag) => tag.meta?.affix);
    this.visitedViews = affixTags;
  }

  @Action
  public addView(view: ITagsView) {
    this.ADD_VISITED_VIEW(view);
  }
  @Action
  public delView(view: ITagsView) {
    this.DEL_VISITED_VIEW(view);
  }
  @Action
  public delOtherViews(view: ITagsView) {
    this.DEL_OTHER_VISITED_VIEWS(view);
  }
  @Action
  public delAllViews() {
    this.DEL_ALL_VISITED_VIEWS();
  }
}
export const TagsViewModule = getModule(TagsView);
