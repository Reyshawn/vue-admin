<template>
  <div class="dashboard-container">
    <div class="box box1">
      <weather-details />
    </div>
    <div class="box box2">
      <daily-t />
    </div>
    <div class="box box3">
      <hourly-t />
    </div>
    <div class="box box4">
      <uv-index />
    </div>
    <div class="box box5">
      <air-visibility />
    </div>
    <div class="box box6">
      <wind-status />
    </div>
  </div>
</template>

<script>
import dailyT from './Weather/dailyT'
import hourlyT from './Weather/hourlyT'

import uvIndex from './Weather/uvIndex'
import weatherDetails from './Weather/weatherDetails'
import windStatus from './Weather/windStatus'
import airVisibility from './Weather/airVisibility'

export default {
  name: 'dashboard',
  components: {
    dailyT,
    hourlyT,
    uvIndex,
    weatherDetails,
    windStatus,
    airVisibility
  },
  mounted () {
    this.$store.dispatch('getWeatherData')
      .then(response => {
        console.log(this.WeatherData)
      })
  }
}
</script>

<style scoped>
.dashboard-container {
  margin: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: minmax(240px, auto);
  grid-gap: 1em;
  max-width: 960px;
}

.box1 {
  grid-row: 1/4;
}

.box2, .box3 {
  grid-column: 2/5;
}

.box:not(:last-child) {
  margin: 0;
}

</style>
