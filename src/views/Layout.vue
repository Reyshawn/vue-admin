<template>
  <div class="container" :class="{collapse: closed}">
    <sidebar :closed="closed" />
    <div class="main-content">
      <NavBar>
        <div class="nav-item sidebar-toggle" @click="closeSidebar">
          <i class="icon fas fa-bars"></i>
        </div>
      </NavBar>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'

import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  data () {
    return {
      closed: false
    }
  },
  computed: {
    ...mapGetters([
      'submenu'
    ])
  },
  components: {
    Sidebar,
    NavBar
  },
  methods: {
    closeSidebar () {
      this.closed = !this.closed
      this.$store.commit('app/SET_SIDEBAR', this.closed)
      if (this.closed) {
        this.$store.commit('RESET_SUBMENU')
      }
    }
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

.main-content {
  background-color: #fff1c1;
  color: black;
  width: 100%;
}
</style>
