import Vue from 'vue'
import Store from '@/store'
import Router from 'vue-router'

import Submenu from '@/components/Submenu'

Vue.use(Router)

export const asyncRoutes = [
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
        component: () => import('@/components/Permission/Visitor'),
        meta: {
          icon: 'fas fa-user-cog',
          roles: ['visitor']
        }
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/components/Permission/Admin'),
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
        path: '/gallery',
        name: 'Gallery',
        component: () => import('@/components/Gallery'),
        meta: {
          icon: 'fab fa-instagram',
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
        path: '/table',
        name: 'Table',
        component: () => import('@/components/Table'),
        meta: {
          icon: 'fas fa-th',
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

const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const router = createRouter()

router.beforeEach(async (to, from, next) => {
  const token = Store.getters['user/token']
  if (token) { // check if logged in
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      const roles = Store.getters['user/roles']
      if (roles.length > 0) {
        next()
      } else {
        try {
          const { roles } = await Store.dispatch('user/getInfo')
          const accessedRoutes = await Store.dispatch('generateRoutes', roles)
          router.addRoutes(accessedRoutes)
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

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
