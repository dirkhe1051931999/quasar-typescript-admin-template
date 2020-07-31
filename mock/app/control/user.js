/* eslint-disable */
const { login, getUserInfo, logOut } = require('../models/user');
const _signIn = async (ctx) => {
  const password = ctx.request.body.password;
  const username = ctx.request.body.username;
  const { success } = await login({ username, password });
  success && ctx.message({ success, message: '', token: 'hello' }, 200);
  !success && ctx.message({ success, message: '账号密码错误' }, 201);
};
const _getUserInfo = async (ctx) => {
  const username = ctx.request.body.username;
  const { success, roles, avatar, introduction, email } = await getUserInfo({ username });
  success && ctx.message({ success, roles, avatar, introduction, email, username, message: '' }, 200);
  !success && ctx.message({ success, message: '获取失败' }, 201);
};
const _logOut = async (ctx) => {
  const username = ctx.request.body.username;
  const { success } = await logOut({ username });
  success && ctx.message({ success, message: '' }, 200);
  !success && ctx.message({ success, message: '登出失败' }, 201);
};
module.exports = {
  signIn: _signIn,
  getUserInfo: _getUserInfo,
  logOut: _logOut,
};
