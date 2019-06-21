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
export default {
  name: 'air-visibility',
  data () {
    return {
      airVisibility: null
    }
  },
  mounted () {
    this.$store.dispatch('getWeatherData')
      .then(response => {
        this.airVisibility = response.currently.visibility
      })
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
