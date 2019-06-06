<template>
  <div class="home">
    <button class="button" @click="logout">logout</button>
    <div class="container">
      <sidebar />
      <mainContent />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import Cookies from 'js-cookie'

export default {
  name: 'home',
  components: {
    Sidebar,
    MainContent
  },
  methods: {
    logout () {
      Cookies.remove('user')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 200px 100%;
  grid-column-gap: 1em;
  color: #fff1c1;
  height: 100vh;
  max-width: 100%;
  margin: 0;
}
</style>
