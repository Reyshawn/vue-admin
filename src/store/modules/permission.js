import { permissionRoutes } from '@/router'

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
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = permissionRoutes || []
      } else {
        accessedRoutes = permissionRoutes.filter((route) => {
          return roles.some(role => route.meta.roles.includes(role))
        })
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
