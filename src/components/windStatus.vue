<template>
  <div class="wind-status">
    <h1>Wind Status</h1>
    <div class="wind-details">
      <div class="wind-direction">
        <p class="title"> Direction </p>
        <div class="icon">
          <i class="fas fa-wind"></i>
        </div>
        <p class="wind-value"> {{ bearing }} </p>
        <p> {{ windBearing }}° </p>
      </div>
      <div class="wind-speed">
        <p class="title"> Speed </p>
          <div class="icon rotation">
            <i class="fas fa-fan"></i>
          </div>
        <p class="wind-value"> {{ windSpeed }} </p>
        <p>m/s</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toBearing } from './charts/tempUtils'

export default {
  name: 'wind-status',
  data () {
    return {
      windBearing: null,
      windSpeed: null,
      bearing: null
    }
  },
  mounted () {
    this.$store.dispatch('getWeatherData')
      .then(response => {
        this.windBearing = response.currently.windBearing
        this.bearing = toBearing(this.windBearing)
        this.windSpeed = response.currently.windSpeed
      })
  }
}
</script>

<style scoped>

.wind-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wind-status h1 {
  font-weight: 500;
}

.wind-details {
  display: flex;
  flex-direction: row;
}

.wind-direction, .wind-speed {
  margin: 1.4em 1em 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wind-details .icon {
  font-size: 4em;
}

.wind-details .title {
  font-size: 0.9em;
}

.wind-value {
  margin-top: 1.5em;
  font-size: 1.4em;
  font-weight: 500;
}

.rotation {
  animation: spin 2s ease-in-out;
}

.rotation:hover {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(-720deg);
  }
}

</style>
