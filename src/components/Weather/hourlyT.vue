<template>
  <div class="hourly-temperature-bar">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { extractData, iconMap } from './utils'

export default {
  name: 'hourly-temperature-bar',
  data () {
    return {
      chartOptions: {
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
    }
  },
  mounted () {
    this.$store.dispatch('getWeatherData')
      .then(response => {
        let hourly = extractData(response.hourly.data, 'temperature', 'time', 'icon')
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

        this.chartOptions.xAxis.categories = hourlyLabel
        this.chartOptions.series = series
        this.chartOptions.yAxis.min = minTemp - 1
      })
  }
}
</script>

<style>

</style>
