import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {}
  },
  mutations: {
    ADD_USER (state, payload) {
      state.users[payload.email] = payload.password
    }
  },
  getters: {
    users: state => state.users
  },
  actions: {
    register ({ commit }, data) {
      commit('ADD_USER', data)
    }
  }
})
