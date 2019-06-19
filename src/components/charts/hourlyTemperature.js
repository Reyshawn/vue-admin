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
      hourlyChartData: null
    }
  },
  mounted () {
    axios.get(`/users`)
      .then(response => {
        let hourly = extractData(response.data.hourly.data, 'temperature', 'time')
        let hourlyTemperature = hourly.temperature.map(i => toCelsius(i))
        let hourlyLabel = hourly.time.map(i => i * 1000)

        this.hourlyChartData = {
          labels: hourlyLabel,
          datasets: [{
            label: 'temperature',
            data: hourlyTemperature,
            pointRadius: 0,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2
          }]
        }
        this.renderChart(this.hourlyChartData, {
          title: {
            display: true,
            text: 'Hourly Temperature',
            fontFamily: 'Avenir next',
            fontSize: 14
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              time: {
                displayFormats: {
                  hour: 'h:mm a'
                },
                stepSize: 6
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
                min: Math.min.apply(null, hourlyTemperature) - 1,
                max: Math.max.apply(null, hourlyTemperature) + 1,
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
