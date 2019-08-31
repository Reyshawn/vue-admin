<template>
  <div class="air-visibility">
    <h1>Air Visibility</h1>
    <div class="icon">
       <i class="fas fa-eye"></i>
    </div>
    <p class="air-visibility-value">
      {{ airVisibility }} km
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'air-visibility',
  computed: {
    ...mapGetters({
      WeatherData: 'WeatherData'
    }),
    airVisibility () {
      return this.WeatherData && this.WeatherData.currently.visibility
    }
  }

}
</script>

<style scoped>

.air-visibility {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.air-visibility h1 {
  font-weight: 500;
}

.air-visibility .icon {
  margin: 0.6em 0 0.55em 0;
  font-size: 5em;
}

.air-visibility-value {
  font-size: 1.4em;
  font-weight: 500;
}

</style>
