<template>
  <div class="hourly-temperature-bar">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { extractData, iconMap } from './utils'

export default {
  name: 'hourly-temperature-bar',
  computed: {
    ...mapGetters({
      WeatherData: 'WeatherData'
    }),
    hourlyData () {
      let hourlyData = {}
      if (this.WeatherData) {
        let hourly = extractData(this.WeatherData.hourly.data, 'temperature', 'time', 'icon')
        let hourlyTemperature = []
        for (let i = 0; i < hourly.temperature.length; i++) {
          hourlyTemperature.push({
            icon: iconMap[hourly.icon[i]],
            y: hourly.temperature[i]
          })
        }
        let hourlyLabel = hourly.time.map(i => new Date(i * 1000).toLocaleTimeString().replace(/:00 /, ' '))

        let minTemp = Math.min.apply(null, hourly.temperature)

        let series = [{
          type: 'area',
          name: 'Temperature',
          color: 'rgba(75,192,192,1)',
          marker: {
            enabled: false
          },
          data: hourlyTemperature
        }]

        hourlyData.hourlyLabel = hourlyLabel
        hourlyData.series = series
        hourlyData.min = minTemp - 1
      }
      return hourlyData
    },
    chartOptions () {
      let options = {
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        chart: {
          style: {
            fontFamily: 'Avenir',
            fontWeight: 500
          },
          height: '30%'
        },
        title: {
          text: 'Hourly Temperature',
          style: {
            fontSize: 16
          }
        },
        xAxis: {
          categories: null,
          crosshair: false,
          tickInterval: 12,
          tickLength: 5,
          tickWidth: 1
        },
        yAxis: {
          title: {
            text: 'T (°C)'
          },
          minorTicks: true,
          minorTickLength: 0
        },
        tooltip: {
          pointFormat: '<div><p style="padding:0"><b>{point.y:.1f} °C  </b><i class="wi {point.icon}"></i></p></div>',
          useHTML: true
        },
        plotOptions: {
          area: {
            fillColor: 'rgba(75,192,192,0.4)'
          }
        },
        legend: {
          enabled: false
        },
        series: null
      }
      options.xAxis.categories = this.hourlyData.hourlyLabel
      options.series = this.hourlyData.series
      options.yAxis.min = this.hourlyData.min
      return options
    }
  }
}
</script>

<style>

</style>
