<template>
  <div id="app">
    <notification />
    <router-view/>
  </div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  name: 'App',
  components: {
    Notification
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/css/bulma.css';
@import '~@fortawesome/fontawesome-free/css/all.css';
@import '~weather-icons/css/weather-icons.min.css';

#app {
  font-family: 'Avenir next', sans-serif;
  height: 100vh;
  max-width: 100%;
}
</style>
