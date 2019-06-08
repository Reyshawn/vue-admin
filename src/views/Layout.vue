<template>
  <div class="container" :class="{collapse: closed}">
    <sidebar :closed.sync="closed" />
    <div class="main-content">
      <NavBar>
        <div class="sidebar-toggle" @click="closed=!closed"><span>Toggle</span></div>
      </NavBar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'

export default {
  name: 'layout',
  data () {
    return {
      closed: false
    }
  },
  components: {
    Sidebar,
    NavBar
  }
}
</script>

<style scoped>
.container {
  display: flex;
  color: #fff1c1;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

#sidebar {
  min-width: 200px;
  max-width: 200px;
  min-height: 100vh;
}

.main-content {
  background-color: #fff1c1;
  color: black;
  width: 100%;
}

#sidebar {
  transition:margin-left 0.5s;
}

.collapse #sidebar {
  margin-left: -200px;
}

.test {
  display: flex;
  align-items: stretch;
  height: 100px;
  width: 100%;
}

.box1 {
  width: 200px;
  background-color: teal;
}

.box2 {
  width: 100%;
  background-color: coral;
}
</style>
