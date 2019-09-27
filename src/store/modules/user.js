import axios from 'axios'

const state = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
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
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
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
          sessionStorage.removeItem('access_token')
          localStorage.removeItem('access_token')
          delete axios.defaults.headers.common['Authorization']
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

  getInfo ({ dispatch, commit }, email) {
    console.log(`/user?email=${email}`)
    return new Promise((resolve, reject) => {
      axios.get(`/user?email=${email}`)
        .then(response => {
          console.log(response)
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
  token: state => state.token
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
