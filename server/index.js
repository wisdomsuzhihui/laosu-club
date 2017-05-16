/**
 * Created by laosu on 13/5/17
 */

// "use strict"
// const config = require('./configs/index');

// const path = require('path'),
//   co = require('co'),
//   assert = require('assert'),
//   // app = require('koa')(),
//   Koa = require('koa'),
//   app = new Koa(),
//   bodyParser = require('koa-bodyparser'),
//   cors = require('koa-cors'),
//   staticFiles = require('koa-static'),
//   router = require('koa-router')({
//     prefix: config.app.adminPath
//   }),
//   onerror = require('koa-onerror'),
//   mongoose = require('mongoose'),
//   jwt = require('jsonwebtoken'),
//   controllers = require('./controllers/index.js');

import config from './configs/index';
import path from 'path';
import co from 'co'
import assert from 'assert'
import koa from 'koa'
import bodyParser from 'koa-bodyParser'
import cors from 'koa-cors'
import staticFiles from 'koa-static'
import onerror from 'koa-onerror'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import controllers from './controllers/index'
import utils from './utils/index'
/**
 * 如果你的node版本高于4.0 ,可以使用node自带promise
 * mongoose.Promise = global.Promise;
 */
mongoose.Promise = Promise


jwt.co_verify = function (jwtString, secretOrPublicKey, options) {
  return function (cb) {
    jwt.verify(jwtString, secretOrPublicKey, options, cb);
  }
}
co(function* () {
  mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)
  /**
   * 将config注入中间件的ctx
   */
  app.context.config = config

  app.use(cors({
    maxAge: 7 * 24 * 60 * 60,
    // 7 days 预请求头有效期
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
    headers: 'Content-Type, Accept, Authorization'
  }))

  /**
   * error信息优化
   * */
  onerror(app);
  app.on('error', function (err, ctx) {
    if ((ctx.status === 404 && err.status === undefined) || err.status === 500) {
      utils.logger.error('server error', err)
      utils.logger.error(ctx);
    }
    utils.print(err)
  })

  app.use(bodyParser())
  app.use(async ctx => {
    ctx.body = ctx.request.body
  })
  yield controllers.init(router)
  app.use(router.router())
  app.listen(config.app.port, () => {
    utils.print('app is listening on port ' + config.app.port)
  }).catch(function (err) {
    utils.print(err.stack);
  })

})
