import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {}
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
    users: state => state.users
  },
  actions: {
    getUsers ({ commit }) {
      axios.get('http://localhost:3000/api/users').then((response) => {
        console.log(response.data.data)
        commit('UPDATE_USERS', response.data.data)
      })
    },
    register ({ commit }, data) {
      console.log(data)
      data = JSON.stringify(data)
      axios.post('http://localhost:3000/api/users', data, {
        headers: { 'ContentType': 'application/json' }
      }).then((response) => {
        commit('ADD_USER', data)
      })
    }
  }
})
