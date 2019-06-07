import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { componentRoutes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    componentRoutes
  },
  mutations: {
    UPDATE_USERS (state, payload) {
      state.users = payload
    },
    ADD_USER (state, payload) {
      state.users.push(payload)
    }
  },
  getters: {
    users: state => state.users,
    componentRoutes: state => state.componentRoutes
  },
  actions: {
    getUsers ({ commit }) {
      axios.get('http://localhost:3000/api/users').then((response) => {
        console.log(response.data.data)
        commit('UPDATE_USERS', response.data.data)
      })
    },
    register ({ commit }, data) {
      axios.post('http://localhost:3000/api/users', data)
        .then((response) => {
          commit('ADD_USER', response.data)
        })
    }
  }
})
