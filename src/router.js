import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SelectCompetitor from './views/SelectCompetitor.vue'
import SelectCompetitorTest from './views/SelectCompetitorTest.vue'
import Analytics from './views/Analytics.vue'
import Analytics2 from './views/Analytics2.vue'
import Monthly from './views/Monthly.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/selectcompetitortest',
      name: 'selectcompetitortest',
      component: SelectCompetitorTest
    },
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
      path: '/analytics2',
      name: 'analytics2',
      component: Analytics2
    },
    {
      path: '/monthly',
      name: 'monthly',
      component: Monthly,
      //props: [today]
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
