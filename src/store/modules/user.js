import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'

import { resetRouter } from '@/router'

const state = {
  token: getToken() || '',
  roles: [],
  
  name: '',
  email: '',
  gender: '',
  phone: '',
  address: '',
  homepage: '',
  company: '',
  education: '',
  introduction: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  UPDATE_INFO: (state, payload) => {
    state.name = payload.name
    state.gender = payload.gender
    state.phone = payload.phone
    state.email = payload.email
    state.address = payload.address
    state.homepage = payload.homepage
    state.company = payload.company
    state.education = payload.education
    state.introduction = payload.introduction
  }
}

const actions = {
  login ({ dispatch, commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/login', data)
        .then((response) => {
          if (response.status === 200) {
            if (data.rememberMe) localStorage.setItem('access_token', response.data.token)
            else sessionStorage.setItem('access_token', response.data.token)
            commit('SET_TOKEN', response.data.token)
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

  logout ({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/auth/logout')
        .then(response => {
          commit('SET_TOKEN', '')
          commit('SET_ROUTES', [])
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
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

  getInfo ({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/auth/user', {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      })
        .then(response => {
          commit('SET_ROLES', response.data.roles)
          commit('UPDATE_INFO', response.data)
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

  setInfo ({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/user', payload,
      {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      })
        .then(response => {
          dispatch('pushMessage', {
            type: 'success',
            msg: 'It has been updated.'
          })
          resolve(response)
        })
        .catch(err => {
          dispatch('pushMessage', {
            type: 'warning',
            msg: err.response.data
          })
          reject(err)
        })
    })
  }
}

const getters = {
  token: state => state.token,
  roles: state => state.roles,
  
  name: state => state.name,
  email: state => state.email,
  gender: state => state.gender,
  phone: phone => state.phone,
  address: state => state.address,
  homepage: state => state.homepage,
  company: state => state.company,
  education: state => state.education,
  introduction: state => state.introduction,

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
