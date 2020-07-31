/* eslint-disable */
const { port } = require('./config');
const Koa = require('koa');
const app = new Koa();
const error = require('./middlewares/error.js');
const bodyParser = require('koa-bodyparser');
const parameter = require('koa-parameter');
const logger = require('./middlewares/logger.js');
const routeMapping = require('./app/router/index');


app.use(bodyParser());
app.use(logger);
app.use(error);
parameter(app);
routeMapping(app);

app.listen(port, () => {
  console.log(`app listen http://127.0.0.1:${port}`);
});
