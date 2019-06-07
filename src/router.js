import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      beforeEnter: (to, from, next) => {
        if (Cookies.get('user')) {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/components/Dashboard')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/About')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
      beforeEnter: (to, from, next) => {
        if (Cookies.get('user')) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register')
    }
  ]
})
