<template>
  <div id="app">
    <notification />
    <Layout v-if="!_route.meta.entry">
      <router-view id="main"/>
    </Layout>
    <router-view v-else />
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
  },
  computed: {
    _route () {
      return this.$route
    }
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

#main {
  display: flex;
  justify-content: center;
}
</style>
