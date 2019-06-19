<template>
  <div class="dashboard-container">
    <div class="box box1"></div>
    <div class="box box2">
      <daily-temperature :height="240" :width="800" />
    </div>
    <div class="box box3">
      <hourly-temperature :height="240" :width="800" />
    </div>
    <div class="box box4">
      {{  }}
    </div>
    <div class="box box5"></div>
    <div class="box box6"></div>
  </div>
</template>

<script>
import dailyTemperature from './charts/dailyTemperature'
import hourlyTemperature from './charts/hourlyTemperature'

export default {
  name: 'dashboard',
  components: {
    dailyTemperature,
    hourlyTemperature
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
