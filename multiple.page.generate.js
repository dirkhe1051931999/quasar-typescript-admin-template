const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let appConfig = require('./multiple.config.js').app;

let pageList = null;
let isBuild = ['production'].includes(process.env.NODE_ENV);

function readPages(dir) {
  if (!pageList) {
    const pagesPath = path.resolve('./' + dir);
    pageList = [];
    fs.readdirSync(pagesPath).forEach((pageFile) => {
      let fullPath = pagesPath + '/' + pageFile;
      let isDir = fs.statSync(fullPath).isDirectory();
      // 如果pages下的文件是一个js文件，js文件会被重写成html文件
      if (!isDir) {
        if (pageFile.slice(-3) === '.ts') {
          let baseName = pageFile.slice(0, pageFile.lastIndexOf('.'));
          pageList.push({
            entry: fullPath,
            chunkName: baseName,
            template: 'multiple.index.template.html',
          });
        }
      }
    });
  }
  return pageList;
}

exports.getEntryPages = function (dir) {
  let pages = readPages(dir).reduce((r, page) => {
    r[page.chunkName] = page.entry;
    return r;
  }, {});
  console.log(' App • Getting enter files');
  return pages;
};

exports.htmlPlugins = function (dir) {
  let exChunks = isBuild ? ['manifest', 'vendor'] : [];
  let list = readPages(dir).map((page) => {
    let options = {
      filename: page.chunkName + '.html',
      template: page.template,
      title: appConfig[page.chunkName] ? appConfig[page.chunkName].title : '',
      chunks: [...exChunks, page.chunkName],
      inject: true,
      minify: {
        removeComments: isBuild ? true : false,
        collapseWhitespace: isBuild ? true : false,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      appConfig: appConfig[page.chunkName] || { title: '', description: '' },
    };
    return new HtmlWebpackPlugin(options);
  });
  console.log(' App • Generating html file');
  return list;
};
