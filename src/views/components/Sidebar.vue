<template>
  <div
    class="sidebar-wrapper"
    :class="{ sidebarToggle: isClosed}"
  >
    <div class="sidebar-toggle" @click="isClosed=!isClosed"><span>Toggle</span></div>
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li>
        <a @click="active = !active">Components</a>
        <div class="sidebar-submenu" v-if="active">
          <ul>
            <li v-for="route in componentRoutes" :key=route.path>
              <router-link :to="route.path">{{ route.name }}</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li><a>Other item</a></li>
      <li><a>Other item</a></li>
      <li><a>Other item</a></li>
      <li><a>Other item</a></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      active: false,
      isClosed: false
    }
  },
  computed: {
    ...mapGetters([
      'componentRoutes'
    ])
  }
}
</script>

<style scoped>
.sidebar-wrapper {
  background-color: #293462;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-wrapper.is-closed {
  width: 10px;
}

.sidebar-wrapper > ul {
  margin-top: 40px;
}

.sidebar-wrapper li {
  margin: 10px auto;
}

.sidebar-wrapper a {
  color: #fff1c1;
}

.sidebar-wrapper a:hover {
  border-bottom: 1px solid #fff1c1;
}

.sidebar-submenu {
  margin-left: 0;
  padding-left: 15px;
  border-left: 2px solid #fff1c1;
}
</style>
