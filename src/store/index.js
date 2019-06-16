import Vue from 'vue'
import Vuex from 'vuex'
import { componentRoutes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    componentRoutes
  },
  mutations: {

  },
  getters: {
    componentRoutes: state => state.componentRoutes
  },
  actions: {

  }
})
