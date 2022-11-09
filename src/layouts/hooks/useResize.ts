import { useRoute } from 'vue-router';
import { AppModule, DeviceType } from 'src/store/modules/app';
import { Component, Vue, Watch } from 'vue-facing-decorator';

/** 参考 Bootstrap 的响应式设计 WIDTH = 992 */
const WIDTH = 992;
/** 根据大小变化重新布局 */
@Component({
  name: 'UseResize',
})
export default class UseResize extends Vue {
  @Watch('route.name')
  private onchange() {
    if (AppModule.device === DeviceType.Mobile && AppModule.sidebar.opened) {
      AppModule.CLOSE_SIDEBAR(false);
    }
  }

  beforeMount() {
    window.addEventListener('resize', this._resizeHandler);
  }
  beforeUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
  }
  mounted() {
    if (this._isMobile()) {
      AppModule.TOGGLE_DEVICE(DeviceType.Mobile);
      AppModule.CLOSE_SIDEBAR(true);
    }
  }
  public route = useRoute();
  private _isMobile() {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }
  private _resizeHandler() {
    if (!document.hidden) {
      const isMobile = this._isMobile();
      AppModule.TOGGLE_DEVICE(
        isMobile ? DeviceType.Mobile : DeviceType.Desktop
      );
      if (isMobile) {
        AppModule.CLOSE_SIDEBAR(true);
      }
    }
  }
}
