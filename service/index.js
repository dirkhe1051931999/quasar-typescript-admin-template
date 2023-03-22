const pty = require('node-pty');
const os = require('os');
const WebSocket = require('ws');
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', (ws) => {
  console.log('socket connection success');
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 180,
    rows: 124,
    cwd: process.env.HOME,
    env: process.env,
  });
  //接受数据
  ws.on('message', (res) => {
    ptyProcess.write(res);
  });
  //发送数据
  ptyProcess.on('data', function (data) {
    process.stdout.write(data);
    ws.send(data);
  });
});
