import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { componentRoutes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    errorMessages: [],
    componentRoutes
  },
  mutations: {
    CHANGE_STATE (state, val) {
      state.isLoggedIn = val
    }

  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    errorMessages: state => state.errorMessages,
    componentRoutes: state => state.componentRoutes
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data)
          .then((response) => {
            if (response.status === 200) {
              commit('CHANGE_STATE', true)
              resolve(response.data)
            }
          })
          .catch(err => {
            this.errors.push({ msg: err.response.data })
            reject(err.response)
        })
      })
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/auth/logout')
        .then(response => {
          commit('CHANGE_STATE', false)
          resolve(response.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/register', data)
          .then((response) => {
            resolve(response.data)
          })
          .catch(err => {
            this.errors.push({ msg: err.response.data })
            reject(err)
          })
      })
    }
  }
})
