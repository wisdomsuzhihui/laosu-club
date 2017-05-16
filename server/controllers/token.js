/*  header-comment
/*  file   : token
/*  author : loasu
/*  date   : 2017-5-2 16:20:42
/*  last   : 2017-5-2 16:26:41
*/
"use strict"

const jwt = require("jsonwebtoken"),
  configs = require("../configs/index");
const cert = configs.jwt.cert;



module.exports.init = function* (router) {
  yield seed;
  router.post('/tokens', create);
  router.get('/tokens/check')
}
