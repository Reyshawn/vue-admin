<template>
  <nav id="sidebar">
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
  align-items: center;
}

#sidebar > ul {
  margin-top: 40px;
}

#sidebar li {
  margin: 10px auto;
}

#sidebar a {
  color: #fff1c1;
}

#sidebar a:hover {
  border-bottom: 1px solid #fff1c1;
}

.sidebar-submenu {
  margin-left: 0;
  padding-left: 15px;
  border-left: 2px solid #fff1c1;
}
</style>
