<template>
  <div class="dashboard-container">
    <div class="box box1">
      
    </div>
    <div class="box box2">
      <test-chart :height="200" :width="800" />
    </div>
    <div class="box box3">
      <test-chart :height="200" :width="800" />
    </div>
    <div class="box box4"></div>
    <div class="box box5"></div>
    <div class="box box6"></div>
    
  </div>
</template>

<script>
import testChart from './testChart'
import { WeatherAPI } from '@/config/api'
import axios from 'axios'

// Mock axios 
import mock from '@/mock/mockAxios'
mock(axios)

export default {
  name: 'dashboard',
  components: {
    testChart
  },
  mounted () {
    // Get the weather data from https://api.darksky.net/forecast/
    // let place = '22.5307227,%20113.9121553'
    axios.get(`/users`)
      .then(response => {
        console.log(response.status)
        console.log(response.data)
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
