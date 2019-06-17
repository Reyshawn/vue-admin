<template>
  <div class="container" :class="{collapse: closed}">
    <sidebar :closed.sync="closed" />
    <div class="main-content">
      <NavBar>
        <div class="sidebar-toggle" @click="closeSidebar"><span>Toggle</span></div>
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
  },
  methods: {
    closeSidebar () {
      this.closed=!this.closed

    }
  }
}
</script>

<style>
.container {
  display: flex;
  color: #fff1c1;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

#sidebar {
  width: 200px;
  max-width: 200px;
  min-height: 100vh;
  max-height: 100vh;
}

.main-content {
  background-color: #fff1c1;
  color: black;
  width: 100%;
}

#sidebar {
  transition:width 0.5s;
}

.collapse #sidebar {
  width: 53px;
}

.collapse #sidebar .menu-title {
  visibility: hidden;
}

</style>
