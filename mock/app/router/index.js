/* eslint-disable */
const fs = require('fs');
const path = require('path');
module.exports = (app) => {
  fs.readdirSync(path.join(__dirname, 'dev-api')).forEach((file) => {
    const router = require(`./dev-api/${file}`);
    if (file !== 'index.js') {
      app.use(router.routes()).use(router.allowedMethods());
    }
  });
};
