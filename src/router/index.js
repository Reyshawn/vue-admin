import Vue from 'vue'
import Store from '@/store'
import Router from 'vue-router'

Vue.use(Router)

export const permissionRoutes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About'),
    meta: {
      roles: ['visiter']
    }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('@/components/Weather'),
    meta: {
      roles: ['visiter']
    }
  },
  {
    path: '/backToTop',
    name: 'BackToTop',
    component: () => import('@/components/BackToTop'),
    meta: {
      roles: ['visiter']
    }
  },
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
    name: 'Home',
    component: () => import('@/components/Home')
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
  const token = Store.getters.token
  console.log('what? ', token)
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      const roles = Store.getters.roles
      if (roles.length > 0) {
        next()
      } else {
        try {
          const { roles } = await Store.dispatch('getInfo')
          const accessedRoutes = await Store.dispatch('generateRoutes', roles)

          router.addRoutes(accessedRoutes)
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
