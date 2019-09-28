<template>
  <div id="app">
    <notification />
    <Layout>
      <router-view/>
    </Layout>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import Layout from '@/views/Layout'

export default {
  name: 'App',
  components: {
    Notification,
    Layout
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/css/bulma.css';
@import '~@fortawesome/fontawesome-free/css/all.css';
@import '~weather-icons/css/weather-icons.min.css';

#app {
  font-family: 'Avenir', sans-serif;
  height: 100vh;
  max-width: 100%;
}
</style>
