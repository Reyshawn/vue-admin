import MockAdapter from 'axios-mock-adapter'
import WeatherData from './WeatherData'

export default (axios) => {
  const mock = new MockAdapter(axios)
  mock.onGet(/\/forecast\/[^ ]+/).reply(200, WeatherData)
  mock.onGet(/\/geocoding\/[^ ]+/).passThrough()
  mock.onPost(/\/auth\/[^ ]+/).passThrough()
  mock.onGet(/\/auth\/[^ ]+/).passThrough()
  mock.onGet(/\/unsplash\/[^ ]+/).passThrough()
}
