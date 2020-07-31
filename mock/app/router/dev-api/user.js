/* eslint-disable */
const Router = require('koa-router');
const { signIn, getUserInfo, logOut } = require('../../control/user');

const router = new Router({
  prefix: '/mock-api/v1/user',
});

router.post('/login', signIn);
router.post('/info', getUserInfo);
router.post('/logout', logOut);
module.exports = router;
