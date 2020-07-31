/* eslint-disable */
module.exports = async (ctx, next) => {
  try {
    ctx.message = function(data, code = 200) {
      ctx.body = {
        code,
        data,
      };
    };
    if (ctx.query && Object.keys(ctx.query).length > 0) {
      ctx.log.info(`请求参数:${ctx.method} ${ctx.path}  ,接受到的参数:===>${JSON.stringify(ctx.query)}`);
    }
    if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
      ctx.log.info(`请求参数:${ctx.method} ${ctx.path}  ,接受到的参数:===>${JSON.stringify(ctx.request.body)}`);
    }
    if (ctx.params && Object.keys(ctx.params).length > 0) {
      ctx.log.info(`请求参数:${ctx.method} ${ctx.path}  ,接受到的参数:===>${JSON.stringify(ctx.params)}`);
    }
    await next();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err.stack);
    }
    if (err instanceof Error) {
      ctx.body = {
        msg: err.errors || err.message,
        code: err.errorCode || -1,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
    } else {
      ctx.body = {
        msg: `we made a mistake, O(∩_∩)O哈哈~`,
        code: -1,
        requestUrl: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
    ctx.log.error(`发生错误:${ctx.method}-> ${ctx.path}-> ${ctx.status}: ${err.stack}`);
  }
};
