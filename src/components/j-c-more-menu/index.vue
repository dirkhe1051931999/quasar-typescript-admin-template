<template>
  <div v-if="hasVisibleActions" class="jc-more-menu">
    <div class="jc-more-menu__icon">
      <slot name="trigger">
        <q-icon class="cursor-pointer" name="more_vert" :size="triggerSize" />
      </slot>

      <q-menu
        :fit="computedFit"
        :class="computedMenuClass"
        :offset="computedOffset"
        :anchor="computedAnchor"
        :self="computedSelf"
        :styling-menu-option="preset === 'option'"
        :styling-menu-action="preset === 'action'"
      >
        <q-list :dense="dense" :style="computedListStyle">
          <template v-for="(action, index) in actions" :key="action.key ?? index">
            <j-c-permission :rm-dom="action.rmDom ?? true" :code="action.permissionCode ?? null" :default-content="action.defaultContent ?? '--'">
              <q-item
                v-if="isActionVisible(action)"
                :clickable="action.clickable ?? true"
                v-close-popup="action.closePopup ?? true"
                :disable="isActionDisabled(action)"
                @click="handleActionClick(action)"
              >
                <q-item-section>
                  {{ getActionLabel(action) }}
                </q-item-section>
              </q-item>
            </j-c-permission>
          </template>
        </q-list>
      </q-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import { QIcon, QItem, QItemSection, QList, QMenu } from 'quasar';
import type { QMenuProps } from 'quasar';
import JCPermission from 'src/components/j-c-permission/index.vue';
import { useI18n } from 'src/composables/useI18n';

type BoolLike<T> = boolean | ((item: T) => boolean);
type LabelLike<T> = string | ((ctx: { item: T; action: JCMoreMenuAction<T> }) => string);
type TranslateFn = (key: string, variables?: Record<string, any>) => string;

export type JCMoreMenuAction<T = any> = {
  key?: string | number;
  /** 权限码；不传则默认当作有权限 */
  permissionCode?: string | null;
  /** 无权限时是否移除 DOM（默认 true） */
  rmDom?: boolean;
  /** 无权限且 rmDom=false 时显示的默认文案 */
  defaultContent?: string;
  /** 文案：优先 label，其次 i18nKey */
  label?: LabelLike<T>;
  i18nKey?: string;
  /** 是否可点击（默认 true） */
  clickable?: boolean;
  /** 点击后是否自动关闭弹层（默认 true） */
  closePopup?: boolean;
  /** 是否显示该 action（默认 true） */
  visible?: BoolLike<T>;
  /** 是否禁用该 action（默认 false） */
  disabled?: BoolLike<T>;
  /** 点击回调 */
  onClick?: (item: T) => void | Promise<void>;
};

export default defineComponent({
  name: 'JCMoreMenu',
  components: {
    QIcon,
    QMenu,
    QList,
    QItem,
    QItemSection,
    JCPermission,
  },
  props: {
    item: {
      type: null as unknown as PropType<any>,
      default: null,
    },
    actions: {
      type: Array as PropType<JCMoreMenuAction<any>[]>,
      default: () => [],
    },
    /**
     * option: 使用全局 `styling-menu-option` 皮肤（默认 fit + padding 风格）
     * action: 使用全局 `styling-menu-action` 皮肤（支持 offset/anchor/self/minWidth）
     */
    preset: {
      type: String as PropType<'option' | 'action'>,
      default: 'option',
    },
    fit: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    triggerSize: {
      type: String,
      default: '16px',
    },
    /**
     * action preset 时生效：默认 offset/anchor/self/minWidth 贴近业务中的写法
     */
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: undefined,
    },
    anchor: {
      type: String as PropType<QMenuProps['anchor']>,
      default: undefined,
    },
    self: {
      type: String as PropType<QMenuProps['self']>,
      default: undefined,
    },
    listMinWidth: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    menuClass: {
      type: [String, Array, Object] as PropType<any>,
      default: undefined,
    },
    /**
     * 外部翻译函数（推荐传业务侧的 $t 或 useI18n().t）
     * - 如果不传，i18nKey 会回退使用组件库内置的 t()
     */
    translate: {
      type: Function as PropType<TranslateFn | undefined>,
      default: undefined,
    },
  },
  emits: {
    action: (payload: { action: JCMoreMenuAction<any>; item: any }) => true,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const translate = computed<TranslateFn>(() => props.translate ?? t);

    const resolveBoolLike = <T>(val: BoolLike<T> | undefined, item: T, defaultValue: boolean) => {
      if (typeof val === 'function') return Boolean(val(item));
      if (typeof val === 'boolean') return val;
      return defaultValue;
    };

    const isActionVisible = (action: JCMoreMenuAction<any>) => resolveBoolLike(action.visible, props.item, true);
    const isActionDisabled = (action: JCMoreMenuAction<any>) => resolveBoolLike(action.disabled, props.item, false);

    const hasVisibleActions = computed(() => props.actions.some((a) => isActionVisible(a)));

    const computedFit = computed(() => {
      if (typeof props.fit === 'boolean') return props.fit;
      return props.preset === 'option';
    });

    const computedOffset = computed(() => {
      if (props.preset !== 'action') return undefined;
      return props.offset ?? ([5, 10] as [number, number]);
    });

    const computedAnchor = computed<QMenuProps['anchor'] | undefined>(() => {
      if (props.preset !== 'action') return undefined;
      return props.anchor ?? 'bottom left';
    });

    const computedSelf = computed<QMenuProps['self'] | undefined>(() => {
      if (props.preset !== 'action') return undefined;
      return props.self ?? 'top start';
    });

    const computedListStyle = computed(() => {
      if (props.preset !== 'action') return undefined;
      const minWidth = props.listMinWidth ?? '80px';
      return { minWidth };
    });

    const computedMenuClass = computed(() => {
      return props.menuClass ?? undefined;
    });

    const getActionLabel = (action: JCMoreMenuAction<any>) => {
      if (typeof action.label === 'function') return action.label({ item: props.item, action });
      if (typeof action.label === 'string' && action.label) return action.label;
      if (action.i18nKey) return translate.value(action.i18nKey);
      return '';
    };

    const handleActionClick = async (action: JCMoreMenuAction<any>) => {
      emit('action', { action, item: props.item });
      if (action.onClick) {
        await action.onClick(props.item);
      }
    };

    return {
      hasVisibleActions,
      isActionVisible,
      isActionDisabled,
      preset: computed(() => props.preset),
      computedFit,
      computedOffset,
      computedAnchor,
      computedSelf,
      computedListStyle,
      computedMenuClass,
      getActionLabel,
      handleActionClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.jc-more-menu {
  display: inline-flex;
  align-items: center;
}

.jc-more-menu__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
