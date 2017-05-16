/*  header-comment
/*  file   : index
/*  author : loasu
/*  date   : 2017-5-2 16:20:59
/*  last   : 2017-5-2 16:27:51
*/
"use strict"
const fs = require('fs'),
  middlewares = {},
  // 以异步的方式读取文件目录
  files = fs.readdirSync(__dirname);
for (let file of files) {
  if (file !== 'index.js') {
    const fileName = file.split('.')[0];
    middlewares[fileName] = require('./' + file)
  }
}

module.exports = middlewares;
