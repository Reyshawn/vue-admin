import MockAdapter from 'axios-mock-adapter'
import WeatherData from './WeatherData'

export default (axios) => {
  const mock = new MockAdapter(axios)
    mock.onGet('/users').reply(200, WeatherData);
}