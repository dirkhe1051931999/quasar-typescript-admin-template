<template>
  <div>
    <div class="container">
      <div id="xterm" class="xterm" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import 'xterm/css/xterm.css';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';

@Component({ name: 'myTerminalComponent' })
export default class myTerminalComponent extends Vue {
  private terminal: any;
  private socket: any;
  mounted() {
    this.initSocket();
    window.addEventListener('resize', this.onTerminalResize);
  }
  beforeDestroy() {
    this.socket.close();
    this.terminal.dispose();
  }
  private initTerm() {
    const term = new Terminal({
      cols: 80,
      rows: 24,
      convertEol: false,
      cursorBlink: false,
      cursorStyle: 'block',
      drawBoldTextInBrightColors: true,
      fontFamily: 'courier-new, courier, monospace',
      fontSize: 15,
      fontWeight: 'normal',
      fontWeightBold: 'bold',
      lineHeight: 1.0,
      letterSpacing: 0,
      scrollback: 1000,
      screenReaderMode: false,
      macOptionIsMeta: false,
      macOptionClickForcesSelection: false,
      disableStdin: false,
      allowTransparency: false,
      tabStopWidth: 8,
      theme: undefined,
      rightClickSelectsWord: false,
      windowsMode: false,
    });
    const attachAddon = new AttachAddon(this.socket);
    const fitAddon = new FitAddon();
    term.open(document.getElementById('xterm')!);
    term.loadAddon(attachAddon);
    term.loadAddon(fitAddon);
    fitAddon.fit();
    term.focus();
    this.terminal = term;
    this.terminal.onData((data: any) => {});
    window.addEventListener('resize', this.onTerminalResize);
  }
  private onTerminalResize() {
    const terminalContainer: any = document.getElementById('xterm');
    const width = terminalContainer.parentElement.clientWidth;
    const height = terminalContainer.parentElement.clientHeight;
    const { terminal } = this;
    // 计算cols，rows
    const cols = (width - terminal._core.viewport.scrollBarWidth - 15) / terminal._core._renderService._renderer.dimensions.actualCellWidth;
    const rows = height / terminal._core._renderService._renderer.dimensions.actualCellHeight - 1;
    this.terminal.resize(cols, rows);
  }
  private initSocket() {
    this.socket = new WebSocket('ws://localhost:4001');
    this.socketOnClose();
    this.socketOnOpen();
    this.socketOnError();
  }
  private socketOnOpen() {
    this.socket.onopen = () => {
      // 链接成功后
      this.initTerm();
      this.onTerminalResize();
    };
  }
  private socketOnClose() {
    this.socket.onclose = () => {
      // console.log('close socket')
      window.removeEventListener('resize', this.onTerminalResize);
    };
  }
  private socketOnError() {
    this.socket.onerror = () => {
      // console.log('socket 链接失败')
    };
  }
}
</script>


<style lang="scss">
#xterm {
  width: 100%;
  height: 1000px;
  border-radius: 8px;
}
</style>