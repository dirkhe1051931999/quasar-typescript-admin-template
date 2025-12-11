/**
 * Yalc 开发模式脚本
 * 自动监听文件变化，构建并推送到 yalc
 */

import { spawn } from 'child_process';
import { watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let buildProcess = null;
let isBuilding = false;
let pendingBuild = false;

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // cyan
    success: '\x1b[32m', // green
    error: '\x1b[31m',   // red
    warn: '\x1b[33m',    // yellow
  };
  const reset = '\x1b[0m';
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors[type]}[${timestamp}]${reset} ${message}`);
}

function build() {
  if (isBuilding) {
    pendingBuild = true;
    log('构建进行中，将在完成后重新构建...', 'warn');
    return;
  }

  isBuilding = true;
  log('开始构建...', 'info');

  buildProcess = spawn('npm', ['run', 'build-all'], {
    cwd: __dirname,
    shell: true,
    stdio: 'inherit',
  });

  buildProcess.on('exit', (code) => {
    isBuilding = false;
    buildProcess = null;

    if (code === 0) {
      log('构建成功！正在推送到 yalc...', 'success');
      
      // 构建成功后推送到 yalc
      const pushProcess = spawn('npx', ['yalc', 'push'], {
        cwd: __dirname,
        shell: true,
        stdio: 'inherit',
      });

      pushProcess.on('exit', (pushCode) => {
        if (pushCode === 0) {
          log('已推送到 yalc！', 'success');
        } else {
          log('推送失败', 'error');
        }

        // 检查是否有待处理的构建
        if (pendingBuild) {
          pendingBuild = false;
          log('检测到新的变化，重新构建...', 'info');
          setTimeout(build, 100);
        }
      });
    } else {
      log('构建失败', 'error');
      
      // 即使失败，也检查是否有待处理的构建
      if (pendingBuild) {
        pendingBuild = false;
        log('重试构建...', 'warn');
        setTimeout(build, 1000);
      }
    }
  });
}

// 监听 src 目录
const srcPath = resolve(__dirname, 'src');
log(`开始监听 ${srcPath}`, 'info');
log('提示：修改文件后会自动构建并推送到 yalc', 'info');
log('按 Ctrl+C 退出', 'warn');

// 首次构建
build();

// 监听文件变化
watch(srcPath, { recursive: true }, (eventType, filename) => {
  if (filename) {
    log(`检测到文件变化: ${filename}`, 'info');
    build();
  }
});

// 也监听配置文件
const configFiles = ['vite.config.js', 'tsconfig.json', 'package.json'];
configFiles.forEach(file => {
  const filePath = resolve(__dirname, file);
  watch(filePath, (eventType) => {
    if (eventType === 'change') {
      log(`配置文件变化: ${file}`, 'info');
      build();
    }
  });
});

// 处理退出信号
process.on('SIGINT', () => {
  log('\n正在退出...', 'warn');
  if (buildProcess) {
    buildProcess.kill();
  }
  process.exit(0);
});

