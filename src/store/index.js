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

  },
  getters: {
    errorMessages: state => state.errorMessages,
    componentRoutes: state => state.componentRoutes
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login', data)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('access_token', response.data.token)
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
          localStorage.removeItem('access_token')
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
