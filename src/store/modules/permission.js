import { permissionRoutes } from '@/router'

const state = {
  dynamicRoutes: []
}

const mutations = {
  SET_ROUTES (state, accessedRoutes) {
    state.dynamicRoutes =accessedRoutes
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
      resolve(accessedRoutes)
    })
  }
}

const getters = {
  dynamicRoutes: state => state.dynamicRoutes
}

export default {
  state,
  mutations,
  actions,
  getters
}
