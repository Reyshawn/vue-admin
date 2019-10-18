const state = {
  closed: false
}

const mutations = {
  SET_SIDEBAR (state, closed) {
    state.closed = closed
  }
}

const actions = {
}

const getters = {
  closed: state => state.closed
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
