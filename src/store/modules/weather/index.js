import axios from 'axios'

// import { WeatherAPI } from '@/config/api'
// const place = '22.5306515,113.9121532'

// Mock axios
import mock from '@/mock/mockAxios'
mock(axios)

const state = {
  WeatherData: null,
  Count: 0
}

const mutations = {

}

const actions = {
  getWeatherData ({ dispatch, state }) {
    return new Promise((resolve, reject) => {
      if (!state.WeatherData) {
        state.Count += 1
        axios.get(`/forecast`)
        /* axios.get(`/forecast/${WeatherAPI}/${place}`) */
          .then(response => {
            state.WeatherData = response.data
            dispatch('pushMessage', {
              type: 'success',
              msg: '😃 Data received'
            })
            resolve(state.WeatherData)
          })
          .catch(err => reject(err))
      } else {
        dispatch('pushMessage', {
          type: 'warninig',
          msg: '😆 Data has been saved!'
        })
        resolve(state.WeatherData)
      }
    })
  }
}

const getters = {
  WeatherData: state => state.WeatherData,
  Count: state => state.Count
}

const weatherModule = {
  state,
  mutations,
  actions,
  getters
}

export default weatherModule
