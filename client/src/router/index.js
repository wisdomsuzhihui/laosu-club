import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'

Vue.use(Router)
const routes = [{
  path: '/',
  component: Hello
}]
export default new Router({
  routes
})
