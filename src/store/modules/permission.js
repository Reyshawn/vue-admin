import { asyncRoutes } from '@/router'

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  dynamicRoutes: [],
  submenu: {}
}

const mutations = {
  SET_ROUTES (state, accessedRoutes) {
    state.dynamicRoutes = accessedRoutes
  },
  SET_SUBMENU (state, routes) {
    state.submenu = routes
      .filter(route => route.children && route.children.length > 0)
      .map(route => route.name)
      .reduce((acc, item) => {
        acc[item] = false
        return acc
      }, {})
  },
  RESET_SUBMENU (state) {
    for (let p in state.submenu) {
      state.submenu[p] = false
    }
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_SUBMENU', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

const getters = {
  dynamicRoutes: state => state.dynamicRoutes,
  submenu: state => state.submenu
}

export default {
  state,
  mutations,
  actions,
  getters
}
