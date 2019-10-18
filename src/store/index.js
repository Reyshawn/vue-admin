import Vue from 'vue'
import Vuex from 'vuex'

import message from './modules/message.js'
import weather from './modules/weather.js'
import user from './modules/user.js'
import permission from './modules/permission.js'
import app from './modules/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // Load external modules
  modules: {
    message,
    weather,
    user,
    permission,
    app
  }
})
