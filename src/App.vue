<template>
  <div id="app">
    <notification />
    <Layout v-if="!$route.meta.entry">
      <router-view id="main"/>
    </Layout>
    <router-view v-else />
  </div>
</template>

<script>
import Notification from '@/components/Notification'

// lazy load the component
const Layout = () => import('@/views/Layout')

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

#main {
  display: flex;
  justify-content: center;
}
</style>
