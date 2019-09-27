import axios from 'axios'

import { WeatherAPI, MapQuestAPI } from '@/config/api'
import { isoCountries } from '@/components/Weather/utils.js'

// Mock axios
import mock from '@/mock/mockAxios'
mock(axios)

const state = {
  WeatherData: null,
  Place: 'Shenzhen, China',
  Coord: {
    lat: '22.5306515',
    lng: '113.9121532'
  }
}

const mutations = {
  UPDATE_WEATHER (state, n) {
    state.WeatherData = n
  },

  UPDATE_PLACE (state, p) {
    state.Place = p
  },
  UPDATE_COORD (state, c) {
    state.Coord = c
  }

}

const actions = {
  getWeatherData ({ dispatch, commit }, place) {
    return new Promise((resolve, reject) => {
      dispatch('getCoordinates', place)
        .then(response => {
          let coord = response.lat + ',' + response.lng
          axios.get(`/forecast/${WeatherAPI}/${coord}?units=si`)
            .then(response => {
              commit('UPDATE_WEATHER', response.data)
              resolve(response.data)
            })
            .catch(err => reject(err))
        })
    })
  },

  getCoordinates ({ commit, state }, place) {
    return new Promise((resolve, reject) => {
      if (!place) {
        resolve(state.Coord)
      } else {
        axios.get(`/geocoding/address?key=${MapQuestAPI}&location=${place}`)
          .then(response => {
            let coord = response.data.results[0].locations[0].latLng
            let p = response.data.results[0].locations[0].adminArea5 + ', ' + isoCountries[response.data.results[0].locations[0].adminArea1]
            commit('UPDATE_PLACE', p)
            commit('UPDATE_COORD', coord)
            console.log('place', state.Place)
            console.log('coordination', state.Coord)
            resolve(coord)
          })
          .catch(err => reject(err))
      }
    })
  }
}

const getters = {
  WeatherData: state => state.WeatherData,
  Place: state => state.Place,
  Coord: state => state.Coord

}

const weatherModule = {
  state,
  mutations,
  actions,
  getters
}

export default weatherModule
