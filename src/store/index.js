import Vue from 'vue'
import Vuex from 'vuex'

import message from './modules/message.js'
import weather from './modules/weather.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // Load external modules
  modules: {
    message,
    weather,
    user
  }
})
