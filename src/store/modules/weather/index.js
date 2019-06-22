import axios from 'axios'

import { WeatherAPI } from '@/config/api'

// Mock axios
import mock from '@/mock/mockAxios'
const place = '22.5306515,113.9121532'
mock(axios)

const state = {
  WeatherData: null
}

const mutations = {

}

const actions = {
  getWeatherData ({ dispatch, state }) {
    return new Promise((resolve, reject) => {
      if (!state.WeatherData) {
        axios.get(`/forecast/${WeatherAPI}/${place}?units=si`)
          .then(response => {
            state.WeatherData = response.data
            resolve(state.WeatherData)
          })
          .catch(err => reject(err))
      } else {
        resolve(state.WeatherData)
      }
    })
  }
}

const getters = {
  WeatherData: state => state.WeatherData
}

const weatherModule = {
  state,
  mutations,
  actions,
  getters
}

export default weatherModule
