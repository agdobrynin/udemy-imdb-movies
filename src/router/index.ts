import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/top',
    name: 'Top',
    component: () => import(/* webpackChunkName: "top" */ '../views/Top.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
