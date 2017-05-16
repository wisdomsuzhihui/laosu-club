/**
 * Created by laosu on 13/5/17
 */

// "use strict"
// const path = require('path'),
//   serverRoot = path.dirname(__dirname),
//   root = path.resolve(serverRoot, '../'),
//   staticDir = path.join(root, 'static'),
//   dev = require('./dev.js'),
//   fs = require('fs'),
//   _ = require('lodash');

import path from 'path'
import dev from './dev'
import fs from 'fs'
import _ from 'loadsh'

const serverRoot = path.dirname(__dirname),
  root = path.resolve(serverRoot, '../'),
  staticDir = path.join(root, 'static');

// 默认生产环境

let config = {
  app: {
    name: 'laosu-blog',
    port: '8091',
    adminPath: '/api' // 后台路径
  },
  debug: false,
  env: 'producton',
  mongoConfig: { // 数据库配置
    url: 'mongodb://localhost:27017/laosu-blog',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'laosu-blog'
  },
  dir: { // 目录配置
    root,
    log: path.join(__dirname, '..', 'logs'),
    server: serverRoot,
    static: staticDir,
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  }
}

//本地调试环境
if (process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev)
}

// 私有配置
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(__dirname + '/private.js')) {
    config = _.merge(config, require('./private.js'))
  }
}
config.log(config)
export default config
