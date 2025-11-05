/* eslint-disable */
const execSync = require('child_process').execSync;
let nodeVersion = require('./package.json').itemVersion.node;
let yarnVersion = require('./package.json').itemVersion.yarn;
function consoleError(msg) {
  console.error(`\x1b[31m%s\x1b[0m`, msg);
}
function consoleInfo(msg) {
  console.info(`\x1b[36m%s\x1b[0m`, msg);
}
// 获取yarn版本
function getYarnVersion() {
  try {
    return execSync('yarn --version', { encoding: 'utf8' }).replace(/v/i, '').trim();
  } catch (error) {
    consoleError('Yarn is not installed.');
    process.exit(1);
  }
}
// 获取node版本
function getNodeVersion() {
  try {
    return execSync('node --version', { encoding: 'utf8' }).replace(/v/i, '').trim();
  } catch (error) {
    consoleError('Node is not installed.');
    process.exit(1);
  }
}
// yarn.lock 文件是否存在
function haveYarnLock() {
  const fs = require('fs');
  return fs.existsSync('yarn.lock');
}

// 1. yarn.lock 文件是否存在
if (!haveYarnLock()) {
  consoleError('yarn.lock file does not exist.');
  process.exit(1);
}
// 2. yarn 是否安装
const currentYarnversion = getYarnVersion().replace(/\./g, '');
const currentNodeVersion = getNodeVersion().replace(/\./g, '');
const _nodeVersion = nodeVersion.replace(/\./g, '').split(' ')[1];
const _yarnVersion = yarnVersion.replace(/\./g, '').split(' ')[1];

// 3. node版本是否符合

if (currentNodeVersion !== _nodeVersion) {
  consoleError(`Current node version is ${getNodeVersion()}, the required version is ${nodeVersion}`);
  consoleInfo(`Please use nvm to switch the node version, https://github.com/coreybutler/nvm-windows`);
  process.exit(1);
}

// 4. yarn版本是否符合
if (currentYarnversion < _yarnVersion) {
  consoleError(`Current yarn version is ${getYarnVersion()}, the required version is ${yarnVersion}`);
  consoleInfo(`Please upgrade yarn to the required version, https://github.com/yarnpkg/yarn/releases`);
  process.exit(1);
}
