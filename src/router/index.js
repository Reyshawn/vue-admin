import Vue from 'vue'
import Store from '@/store'
import Router from 'vue-router'

Vue.use(Router)

export const permissionRoutes = [
  {
    path: '/visiter',
    name: 'Visiter',
    component: () => import('@/components/Permission/visiterPermission'),
    meta: {
      roles: ['visiter']
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/components/Permission/adminPermission'),
    meta: {
      roles: ['admin']
    }
  }
]

export const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About')
      },
      {
        path: '/weather',
        name: 'Weather',
        component: () => import('@/components/Weather'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/backToTop',
        name: 'BackToTop',
        component: () => import('@/components/BackToTop'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
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

router.beforeEach(async (to, from, next) => {
  if (from.path === '/login') next()
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      const roles = Store.getters.roles
      if (roles.length > 0) {
        next()
      } else {
        try {
          const { roles } = await Store.dispatch('getInfo')  
          const accessedRoutes = await Store.dispatch('generateRoutes', roles)
          console.log('accessedRoutes', accessedRoutes)
          console.log('children before', router.options.routes[0].children)
          router.addRoutes(accessedRoutes)
          //console.log('children after', router.options.routes[0].children)
          next()
        } catch (e) {
          console.log(e)
        }
      }
    }

    next()
  } else {
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
