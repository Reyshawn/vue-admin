import { Line } from 'vue-chartjs'
import { extractData, toCelsius } from './tempUtils'

// import { WeatherAPI } from '@/config/api'
import axios from 'axios'

// Mock axios
import mock from '@/mock/mockAxios'
mock(axios)

export default {
  extends: Line,
  data () {
    return {
      dailyChartData: null
    }
  },
  mounted () {
    axios.get(`/users`)
      .then(response => {
        let daily = extractData(response.data.daily.data, 'temperatureHigh', 'temperatureLow', 'time')
        let dailyTemperatureHigh = daily.temperatureHigh.map(i => toCelsius(i))
        let dailyTemperatureLow = daily.temperatureLow.map(i => toCelsius(i))
        let dailyLabel = daily.time.map(i => new Date(i * 1000).toLocaleString().slice(0, 9))

        this.dailyChartData = {
          labels: dailyLabel,
          datasets: [{
            label: 'High',
            data: dailyTemperatureHigh,
            pointRadius: 0,
            backgroundColor: 'rgba(255,215,0,0.4)',
            borderColor: 'rgba(255,215,0,1)',
            borderWidth: 2
          }, {
            label: 'Low',
            data: dailyTemperatureLow,
            pointRadius: 0,
            backgroundColor: 'rgba(199,44,65,0.4)',
            borderColor: 'rgba(199,44,65,1)',
            borderWidth: 2
          }]
        }

        this.renderChart(this.dailyChartData, {
          title: {
            display: true,
            text: 'Daily Temperature',
            fontFamily: 'Avenir next',
            fontSize: 14
          },
          legend: {
            display: true,
            position: 'right',
            labels: {
              fontColor: 'teal',
              boxWidth: 14
            }
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MMM D'
                },
                stepSize: 1
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                source: 'auto',
                display: true,
                fontFamily: 'Avenir next',
                fontSize: 10
              }
            }],
            yAxes: [{
              gridLines: {
                borderDash: [2, 2],
                display: true,
                drawBorder: false
              },
              ticks: {
                min: Math.min.apply(null, dailyTemperatureLow) - 1,
                max: Math.max.apply(null, dailyTemperatureHigh) + 1,
                stepSize: 1,
                fontFamily: 'Avenir next',
                fontSize: 10
              }
            }]
          }
        })
      })
  }
}
