const state = {
  Messages: []

}

const mutations = {
  ADD_MSG (state, payload) {
    state.Messages.push(payload)
  },

  DELETE_MSG (state, id) {
    state.Messages = state.Messages.filter(msg => msg.id !== id)
  }

}

const actions = {
  pushMessage ({ commit, state }, data) {
    let l = state.Messages.length
    data.id = l ? state.Messages[l - 1].id + 1 : 0
    commit('ADD_MSG', data)
    setTimeout(() => {
      commit('DELETE_MSG', data.id)
    }, 3000)
  }
}

const getters = {
  Messages: state => state.Messages
}

const messageModule = {
  state,
  mutations,
  actions,
  getters
}

export default messageModule
