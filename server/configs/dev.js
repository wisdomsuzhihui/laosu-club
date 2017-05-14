/**
 * Created by laosu on 16/8/7.
 */
module.exports = {
  env: 'development',
  debug: true,
  mongoConfig: {
    url: 'mongodb://localhost:27017/laosu-blog-dev',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'laosu-blog-dev'
  },
}
