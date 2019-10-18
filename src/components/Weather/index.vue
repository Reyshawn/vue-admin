<template>
  <div class="dashboard-container">
    <div class="_box box1">
      <weather-details />
    </div>
    <div class="_box box2">
      <daily-t />
    </div>
    <div class="_box box3">
      <hourly-t />
    </div>
    <div class="_box box4">
      <uv-index />
    </div>
    <div class="_box box5">
      <air-visibility />
    </div>
    <div class="_box box6">
      <wind-status />
    </div>
  </div>
</template>

<script>
import dailyT from './dailyT'
import hourlyT from './hourlyT'

import uvIndex from './uvIndex'
import weatherDetails from './weatherDetails'
import windStatus from './windStatus'
import airVisibility from './airVisibility'

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

._box {
  border: 1px solid #e6e6e6;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

._box:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

._box:not(:last-child) {
  margin: 0;
}

</style>
