<template>
  <div class="daily-temperature-bar">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { extractData, iconMap } from './utils'

export default {
  name: 'daily-temperature-bar',
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
          type: 'column',
          style: {
            fontFamily: 'Avenir',
            fontWeight: 500
          },
          height: '30%'
        },
        title: {
          text: 'Daily Temperature',
          style: {
            fontSize: 16
          }
        },
        xAxis: {
          categories: null,
          crosshair: false,
          tickLength: 5,
          tickWidth: 1
        },
        yAxis: {
          title: {
            text: 'T (°C)'
          },
          minorTicks: true
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<i class="wi {point.icon}" style="margin-left:10px"></i><tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} °C</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: -45

        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: null
      }
    }
  },
  mounted () {
    this.$store.dispatch('getWeatherData')
      .then(response => {
        let daily = extractData(response.daily.data, 'temperatureHigh', 'temperatureLow', 'time', 'icon')
        let dailyTemperatureHigh = []

        for (let i = 0; i < daily.temperatureHigh.length; i++) {
          dailyTemperatureHigh.push({
            icon: iconMap[daily.icon[i]],
            y: daily.temperatureHigh[i]
          })
        }

        let dailyTemperatureLow = daily.temperatureLow
        let dailyLabel = daily.time.map(i => new Date(i * 1000).toDateString().slice(4, 10))

        let minTemp = Math.min.apply(null, dailyTemperatureLow)

        let series = [{
          name: 'High',
          color: 'rgba(255,215,0,0.4)',
          borderColor: 'rgba(255,215,0,1)',
          borderWidth: 2,
          data: dailyTemperatureHigh
        }, {
          name: 'Low',
          color: 'rgba(199,44,65,0.4)',
          borderColor: 'rgba(199,44,65,1)',
          borderWidth: 2,
          data: dailyTemperatureLow
        }]

        this.chartOptions.xAxis.categories = dailyLabel
        this.chartOptions.series = series
        this.chartOptions.yAxis.min = minTemp - 1
      })
  }
}
</script>

<style scoped>

</style>
