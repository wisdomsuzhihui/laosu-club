/**
 * Code by laosu on 20170516
 * koa2 中间件：https://github.com/koajs/koa/wiki
 */

"use strict"


module.exports.init = function* (router) {
  yield token.init(router);

}
