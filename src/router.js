import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import SelectCompetitor from './views/SelectCompetitor.vue'
import Analytics from './views/Analytics.vue'
import Monthly from './views/Monthly.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
        },
        {
            path: '/selectcompetitor',
            name: 'selectcompetitor',
            component: SelectCompetitor,
            meta: {requiresAuth: true}
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: Analytics
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

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/')
    }
    next()
})

export default router