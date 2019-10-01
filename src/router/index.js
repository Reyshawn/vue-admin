import Vue from 'vue'
import Store from '@/store'
import Router from 'vue-router'

import Submenu from '@/components/Submenu'

Vue.use(Router)

export const permissionRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/components/Dashboard'),
    meta: {
      icon: 'fab fa-cloudscale',
      roles: ['visitor']
    }
  },
  {
    path: '',
    name: 'Permission',
    component: Submenu,
    meta: {
      icon: 'fas fa-user-lock',
      roles: ['visitor']
    },
    children: [
      {
        path: '/visitor',
        name: 'Visitor',
        component: () => import('@/components/Permission/visitorPermission'),
        meta: {
          icon: 'fas fa-user-cog',
          roles: ['visitor']
        }
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/components/Permission/adminPermission'),
        meta: {
          icon: 'fas fa-user-cog',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '',
    name: 'Apps',
    component: Submenu,
    meta: {
      icon: 'fab fa-app-store',
      roles: ['visitor']
    },
    children: [
      {
        path: '/weather',
        name: 'Weather',
        component: () => import('@/components/Weather'),
        meta: {
          icon: 'fab fa-cloudversify',
          roles: ['visitor']
        }
      },
      {
        path: '/todo',
        name: 'Todo',
        component: () => import('@/components/Todo'),
        meta: {
          icon: 'fas fa-check',
          roles: ['visitor']
        }
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('@/components/Calendar'),
        meta: {
          icon: 'fas fa-calendar-alt',
          roles: ['visitor']
        }
      },
      {
        path: '/notes',
        name: 'Notes',
        component: () => import('@/components/Notes'),
        meta: {
          icon: 'fas fa-clipboard',
          roles: ['visitor']
        }
      }
    ]

  },
  {
    path: '',
    name: 'Components',
    component: Submenu,
    meta: {
      icon: 'fas fa-compact-disc',
      roles: ['visitor']
    },
    children: [
      {
        path: '/backToTop',
        name: 'BackToTop',
        component: () => import('@/components/BackToTop'),
        meta: {
          icon: 'fas fa-chevron-up',
          roles: ['visitor']
        }
      }
    ]

  }
]

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Dashboard')
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
  if (token) { // check if logged in
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      const roles = Store.getters.roles
      if (roles.length > 0) {
        next()
      } else {
        try {
          const { roles } = await Store.dispatch('getInfo')

          if (Store.getters.dynamicRoutes.length === 0) {
            const accessedRoutes = await Store.dispatch('generateRoutes', roles)
            router.addRoutes(accessedRoutes)
          }
          next()
        } catch (e) {
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
