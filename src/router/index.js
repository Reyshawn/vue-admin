import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

export const componentRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/Dashboard')
  },
  {
    path: '/backToTop',
    name: 'BackToTop',
    component: () => import('@/components/BackToTop')
  }
]

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout'),
    beforeEnter: (to, from, next) => {
      if (Cookies.get('user')) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About')
      },
      ...componentRoutes
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

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
