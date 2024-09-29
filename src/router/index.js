import Vue from 'vue'
import VueRouter from 'vue-router'

// COMPONENTS
import Home from '../views/Home'
import Detail from '../views/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/albumhinh/:slug',
    component: Detail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
