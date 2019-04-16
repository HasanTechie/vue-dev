import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SelectCompetitor from './views/SelectCompetitor.vue'
import Analytics from './views/Analytics.vue'
import Monthly from './views/Monthly.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/selectcompetitor',
      name: 'selectcompetitor',
      component: SelectCompetitor
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    },
    {
      path: '/monthly',
      name: 'monthly',
      component: Monthly
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
