import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { componentRoutes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorMessages: [],
    componentRoutes
  },
  mutations: {
    ADD_ERROR_MSG (state, payload) {
      let l = state.errorMessages.length
      payload.id = l ? state.errorMessages[l-1].id+1 : 0
      state.errorMessages.push(payload)
    },

    DELETE_ERROR_MSG (state, id) {
      state.errorMessages = state.errorMessages.filter(err => err.id !== id)
    }
  },
  getters: {
    errorMessages: state => state.errorMessages,
    componentRoutes: state => state.componentRoutes
  },
  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('access_token', response.data.token)
              resolve(response.data)
            }
          })
          .catch(err => {
            commit('ADD_ERROR_MSG', { msg: err.response.data })
            reject(err.response)
          })
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/auth/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            resolve(response.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },

    register ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/register', data)
          .then((response) => {
            resolve(response.data)
          })
          .catch(err => {
            commit('ADD_ERROR_MSG', { msg: err.response.data })
            reject(err)
          })
      })
    }
  }
})
