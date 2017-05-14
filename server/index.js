/**
 * Created by laosu on 13/5/17
 */

"use strict"
const config = require('./configs/index');

const path = require('path'),
  co = require('co'),
  assert = require('assert'),
  app = require('koa')(),
  bodyParser = require('koa-bodyparser'),
  cors = require('koa-cors'),
  staticFiles = require('koa-static'),
  router = require('koa-router')({
    prefix: config.app.adminPath
  }),
  onerror = require('koa-onerror'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  controllers = require('../c')
