const Router = require('koa-router');
const getTable = require('../../control/table');

const router = new Router({
  prefix: '/mock-api/v1/table',
});
router.get('/get', getTable);
module.exports = router;
