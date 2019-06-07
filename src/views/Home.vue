<template>
  <div class="home">
    <div class="container">
      <sidebar />
      <div class="main-content">
        <NavBar />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'

export default {
  name: 'home',
  components: {
    Sidebar,
    NavBar
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 200px calc(100% - 200px);
  color: #fff1c1;
  height: 100vh;
  max-width: 100%;
  margin: 0;
}

.main-content {
  background-color: #fff1c1;
  width: 100%;
  color: black;
}
</style>
