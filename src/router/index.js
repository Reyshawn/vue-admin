import Vue from 'vue'
import Store from '@/store'
import Router from 'vue-router'

import Submenu from '@/components/Submenu'
import Home1 from '@/components/Home1'
import Home2 from '@/components/Home2'
import Home3 from '@/components/Home3'

import Layout from '@/views/Layout'

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
  },
  {
    path: '',
    name: 'Components',
    component: Submenu,
    meta: {
      roles: ['visiter']
    },
    children: [
      {
        path: '/components1.1',
        name: 'sub1',
        component: Home1,
        meta: {
          roles: ['visiter']
        },
      }
    ]

  },
  {
    path: '',
    name: 'Components2',
    component: Submenu,
    meta: {
      roles: ['visiter']
    },
    children: [
      {
        path: '/components2.1',
        name: 'sub2',
        component: Home2,
        meta: {
          roles: ['visiter']
        },
      },
      {
        path: '/components2.2',
        name: 'sub3',
        component: Home3,
        meta: {
          roles: ['visiter']
        },
      }
    ]

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
    component: () => import('@/views/Login'),
    meta: {
      entry: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: {
      entry: true
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = Store.getters.token
  console.log('routes', router.options.routes)
  if (token) { // check if logged in
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      const roles = Store.getters.roles
      console.log('roles', roles)
      if (roles.length > 0) {
        next()
      } else {
        try {
          console.log('here here here')
          const { roles } = await Store.dispatch('getInfo')

          console.log('roles2', roles)
          if (Store.getters.dynamicRoutes.length === 0) {
            const accessedRoutes = await Store.dispatch('generateRoutes', roles)
            router.addRoutes(accessedRoutes)
          }  
          next()
        } catch (e) {
          console.log(e)
          next(`/login?redirect=${to.path}`)
        }
      }

      next()
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
