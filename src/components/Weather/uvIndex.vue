<template>
  <div class="uv-index-container">
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import highchartsMoreInit from 'highcharts/highcharts-more'
import solidGaugeInit from 'highcharts/modules/solid-gauge'

import { mapGetters } from 'vuex'

exportingInit(Highcharts)
highchartsMoreInit(Highcharts)
solidGaugeInit(Highcharts)

// https://www.highcharts.com/demo/gauge-activity/dark-unica
export default {
  data () {
    return {
      uvIndex: -1,
      humidity: -1,
      cloudCover: -1
    }
  },
  computed: {
    ...mapGetters({
      WeatherData: 'WeatherData'
    }),
    chartData () {
      let data = {}
      if (this.WeatherData) {
        data.uvIndex = this.WeatherData.currently.uvIndex
        data.humidity = this.WeatherData.currently.humidity
        data.cloudCover = this.WeatherData.currently.cloudCover
      }
      return data;
    },
    chartOptions () {
      let options = {
        credits: {
          enabled: false
        },
        chart: {
          type: 'solidgauge',
          height: 200,
          width: 200
        },
        exporting: {
          enabled: false
        },
        title: {
          text: ''
        },
        tooltip: {
          borderWidth: 0,
          backgroundColor: 'none',
          shadow: false,
          style: {
            fontSize: '14px'
          },
          pointFormat: '{series.name}<br><span style="font-size:1.2em; color: {point.color}; font-family: \'Avenir\'; font-style: bold;">{point.value}</span>',
          positioner: function (labelWidth) {
            return {
              x: (this.chart.chartWidth - labelWidth) / 2 - 60,
              y: (this.chart.plotHeight / 2) - 90
            }
          }
        },
        pane: {
          center: ['50%', '50%'],
          startAngle: 0,
          endAngle: 360,
          background: [{ // Track for Move
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: 'rgb(12,205,214,0.3)',
            borderWidth: 0
          }, { // Track for Exercise
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: 'rgb(41,52,98,0.3)',
            borderWidth: 0
          }, { // Track for Stand
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: 'rgb(246,35,102,0.3)',
            borderWidth: 0
          }]
        },
        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
          }
        },

        series: [{
          name: 'UV index',
          data: [{
            color: 'rgb(12,205,214,1)',
            radius: '112%',
            innerRadius: '88%',
            y: 0 || Math.round((this.chartData.uvIndex / 11) * 100),
            value: 0 || this.chartData.uvIndex
          }]
        }, {
          name: 'Humidity',
          data: [{
            color: 'rgb(41,52,98,1)',
            radius: '87%',
            innerRadius: '63%',
            y: 0 || this.chartData.humidity * 100,
            value: 0 || this.chartData.humidity
          }]
        }, {
          name: 'Cloud',
          data: [{
            color: 'rgb(246,35,102,1)',
            radius: '62%',
            innerRadius: '38%',
            y: 0 || this.chartData.cloudCover * 100,
            value: 0 || this.chartData.cloudCover
          }]
        }]
      }
      return options
    }
  }
}

</script>

<style scoped>

</style>
