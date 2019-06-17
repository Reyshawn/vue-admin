import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { componentRoutes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Messages: [],
    componentRoutes
  },
  mutations: {
    ADD_MSG (state, payload) {
      state.Messages.push(payload)
    },

    DELETE_MSG (state, id) {
      state.Messages = state.Messages.filter(msg => msg.id !== id)
    }
  },
  getters: {
    Messages: state => state.Messages,
    componentRoutes: state => state.componentRoutes
  },
  actions: {
    login ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('access_token', response.data.token)
              resolve(response.data)
            }
          })
          .catch(err => {
            dispatch('pushMessage', {
              type: 'warning',
              msg: err.response.data
            })
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

    register ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/register', data)
          .then((response) => {
            resolve(response.data)
          })
          .catch(err => {
            dispatch('pushMessage', {
              type: 'warning',
              msg: err.response.data
            })
            reject(err)
          })
      })
    },

    pushMessage ({ commit, state }, data) {
      let l = state.Messages.length
      data.id = l ? state.Messages[l-1].id+1 : 0
      commit('ADD_MSG', data)
      setTimeout(() => {
        commit('DELETE_MSG', data.id)
      }, 3000)
    }
  }
})
