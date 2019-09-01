<template>
  <div class="details-container">
    <div class="search-box">
      <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
      </span>
      <input type="text" placeholder="Search place..." v-model="newPlace"
        @keyup.enter="changePlace"
      >
    </div>
    <div class="main-content">
      <p class="time">
         <i class="wi" :class="details.icon"></i>
        {{ details.formatTime }}
      </p>
      <div class="current-temperature">
        <p> {{details.temperature}} </p>
        <div class="celsius">°C</div>
      </div>
      <p>
        <span class="icon is-small is-left">
          <i class="fas fa-temperature-high"></i>
        </span>
        Feels like {{details.apparentTemperature}} °C
      </p>
      <div class="weather-summary">
        <p>Now: {{ details.summary }}</p>
        <p>This Week : {{ details.dailySummary }} </p>
      </div>
      <div class="weather-details">
        <ul>
          <li>
            <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
            Dew Pt : {{details.dewPoint}} °C
          </li>
          <li>
            <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
            Pressure : {{details.pressure}} hPa
          </li>
          <li>
            <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
            Ozone : {{details.ozone}} DU.
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
          {{details.date}}
        </p>
      </div>
      <div class="location">
        <p class="location-name">
          <span class="icon is-small is-left">
            <i class="fas fa-map-marker-alt"></i>
          </span>
          {{ Place }}
        </p>
        <p class="coordinates">Lat: {{DMS[0]}}</p>
        <p class="coordinates">Long: {{DMS[1]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { iconMap, latlng2DMS } from './utils'

export default {
  name: 'weather-details',
  data () {
    return {
      newPlace: ''
    }
  },
  computed: {
    ...mapGetters({
      WeatherData: 'WeatherData',
      Place: 'Place',
      Coord: 'Coord'
    }),
    details () {
      let details = {}
      if (this.WeatherData) {
        details.time = this.WeatherData.currently.time
        details.summary = this.WeatherData.currently.summary + '!  😆'
        details.icon = iconMap[this.WeatherData.currently.icon]
        details.temperature = this.WeatherData.currently.temperature
        details.apparentTemperature = this.WeatherData.currently.apparentTemperature
        details.dailySummary = this.WeatherData.daily.summary
        details.dewPoint = this.WeatherData.currently.dewPoint
        details.pressure = this.WeatherData.currently.pressure
        details.ozone = this.WeatherData.currently.ozone
        details.date = new Date(details.time * 1000).toDateString()
        details.formatTime = new Date(details.time * 1000).toLocaleTimeString().slice(0, 18)
      }
      return details
    },
    DMS () {
      if (this.Coord) {
        return latlng2DMS(this.Coord.lat, this.Coord.lng)
      } else {
        return ['', '']
      }
    }
  },
  methods: {
    changePlace () {
      this.$store.dispatch('getWeatherData', this.newPlace)
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
