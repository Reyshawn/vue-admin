<template>
  <nav id="sidebar">
    <ul>
      <div class="menu-item">
        <span class="icon">
          <i class="fas fa-tachometer-alt"></i>
        </span>
        <router-link to="/dashboard" class="menu-title">Dashboard</router-link>
      </div>
      <div class="menu-item"  @click="active = !active">
        <span class="icon">
          <i class="fas fa-angle-double-right"></i>
        </span>
        <a class="menu-title">Components</a>
      </div>
      <div class="sidemenu" v-if="active">
        <div class="menu-item" v-for="route in componentRoutes" :key=route.path>
          <span class="icon">
            <i class="fas fa-angle-double-right"></i>
          </span>
          <router-link :to="route.path" class="menu-title">{{ route.name }}</router-link>
        </div>
      </div>
      <div class="menu-item">
        <span class="icon">
          <i class="fas fa-cubes"></i>
        </span>
        <a class="menu-title">Other item</a>
      </div>
      <div class="menu-item">
        <span class="icon">
          <i class="fas fa-cubes"></i>
        </span>
        <a class="menu-title">Other item</a>
      </div>
      <div class="menu-item">
        <span class="icon">
          <i class="fas fa-cubes"></i>
        </span>
        <a class="menu-title">Other item</a>
      </div>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      active: false
    }
  },
  props: {
    closed: Boolean
  },
  computed: {
    ...mapGetters([
      'componentRoutes'
    ])
  }
}
</script>

<style scoped>
#sidebar {
  background-color: #293462;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  overflow: scroll;
}

.menu-item {
  margin: 0;
  height: 50px;
  display: flex;
  align-items: center;
}

.menu-title {
  width: 100%
}

/* When collapsed, hidden the text. */
.collapse #sidebar .menu-title {
  visibility: hidden;
}

.menu-item:hover {
  background-color: #242e58;
}

.menu-item > span.icon {
  min-width: 50px;
}

#sidebar a {
  color: #fff1c1;
}

</style>
