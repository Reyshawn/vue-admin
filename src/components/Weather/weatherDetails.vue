<template>
  <div class="details-container">
    <div class="search-box">
      <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
      </span>
      <input type="text" placeholder="Search place...">
    </div>
    <div class="main-content">
      <p class="time">
         <i class="wi" :class="icon"></i>
        {{ formatTime }}
      </p>
      <div class="current-temperature">
        <p> {{temperature}} </p>
        <div class="celsius">°C</div>
      </div>
      <p>
        <span class="icon is-small is-left">
          <i class="fas fa-temperature-high"></i>
        </span>
        Feels like {{apparentTemperature}} °C
      </p>
      <div class="weather-summary">
        <p>Now: {{ summary }}</p>
        <p>This Week : {{ dailySummary }} </p>
      </div>
      <div class="weather-details">
        <ul>
          <li>
            <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
            Dew Pt : {{dewPoint}} °C
          </li>
          <li>
            <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
            Pressure : {{pressure}} hPa
          </li>
          <li>
            <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
            Ozone : {{ozone}} DU.
          </li>
        </ul>
      </div>
    </div>
    <div class="weather-location">

      <div class="date">
        <p>
          <span class="icon is-small is-left">
            <i class="fas fa-calendar-alt"></i>
          </span>
          {{date}}
        </p>
      </div>
      <div class="location">
        <p class="location-name">
          <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
          </span>
          Shenzhen, China
        </p>
        <p class="coordinates">Lat: 43°38'19.39" N</p>
        <p class="coordinates">Long: 116°14'28.86" W</p>
      </div>
    </div>
  </div>
</template>

<script>
import { iconMap } from './utils'

export default {
  name: 'weather-details',
  data () {
    return {
      time: null,
      summary: '',
      icon: '',
      temperature: null,
      apparentTemperature: null,
      dailySummary: '',
      dewPoint: null,
      pressure: null,
      ozone: null
    }
  },
  mounted () {
    this.$store.dispatch('getWeatherData')
      .then(response => {
        this.time = response.currently.time
        this.summary = response.currently.summary + '!  😆'
        this.icon = iconMap[response.currently.icon]
        this.temperature = response.currently.temperature
        this.apparentTemperature = response.currently.apparentTemperature
        this.dailySummary = response.daily.summary
        this.dewPoint = response.currently.dewPoint
        this.pressure = response.currently.pressure
        this.ozone = response.currently.ozone
      })
  },
  computed: {
    date () {
      return new Date(this.time * 1000).toDateString()
    },
    formatTime () {
      return new Date(this.time * 1000).toLocaleTimeString().slice(0, 18)
    }
  }

}
</script>

<style scoped>
.details-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search-box {
  height: 30px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.8em;
  padding: 5px;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
}

.search-box input {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  border-left: 1px solid #ccc;
  padding-left: 0.6em;
  font-family: 'Avenir', Helvetica, sans-serif;
  font-size: 12px;
}

.search-box .icon {
  width: 30px;
}

.main-content {
  display: flex;
  flex-direction: column;
}

.main-content .time {
  font-size: 0.9em;
  color: #a3a3a3;
}

.main-content .current-temperature {
  margin: 1px 0;
  position: relative;
  font-size: 3.5em;
  font-family: 'Avenir' sans-serif;
  font-weight: 600;
}

.main-content .celsius {
  position: absolute;
  color: #ccc;
  opacity: 0.5;
  top: 10px;
  left: 150px;
  font-size: 30px;
}

.current-temperature + p {
  font-size: 0.8em;
  font-style: italic;
  margin-bottom: 1em;
}

.weather-summary {
  margin-bottom: 1em;
  border-left: 3px solid #293462;
  padding-left: 10px;
  font-size: 1em;
  font-weight: 500;
}

.weather-details {
  height: 100%;
  margin: 2px;
  font-size: 0.8em;
}

.weather-location {
  margin-top: auto;
  margin-bottom: 1em;
}

.location-name {
  font-weight: 500;
}

.coordinates {
  font-size: 0.9em;
  padding-left: 1.4em;
}

</style>
