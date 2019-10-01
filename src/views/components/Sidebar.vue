<template>
  <nav id="sidebar">
    <ul class="sidebar-wrapper">
      <li class="menu-item">
        <router-link to="/weather" class="menu-title-wrapper">
          <span class="icon">
            <i class="fas fa-tachometer-alt"></i>
          </span>
          <p class="menu-title">Weather</p>
        </router-link>
      </li>
      <li v-for="route in dynamicRoutes" :key=route.path class="menu-item">
        <router-link 
          v-if="typeof route.children === 'undefined'"
          :to="route.path" 
          class="menu-title-wrapper"
        >
          <span class="icon">
            <i class="fas fa-angle-double-right"></i>
          </span>
          <p class="menu-title">{{ route.name }}</p>
        </router-link>
        <div v-else>
          <div class="menu-title-wrapper" @click="toggleDropdown(route.name)">
            <span class="icon">
              <i class="fas fa-angle-double-right"></i>
            </span>
            <a class="menu-title">{{route.name}}</a>
          </div>
          <ul class="_dropdown-menu" v-if="submenu[route.name]">
            <li class="menu-title-wrapper submenu" v-for="subRoute in route.children" :key="subRoute.path">
              <span class="icon">
                <i class="fas fa-angle-double-right"></i>
              </span>
              <router-link :to="subRoute.path" class="menu-title submenu-title">{{subRoute.name}}</router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- <li class="menu-item _dropdown">
        <div class="menu-title-wrapper" @click="toggleDropdown">
          <span class="icon">
            <i class="fas fa-angle-double-right"></i>
          </span>
          <a class="menu-title">Permission</a>
        </div>
        <ul class="_dropdown-menu" v-if="active">
          
        </ul>
      </li> -->
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
      <li class="menu-title-wrapper">test</li>
    </ul>
  </nav>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      
    }
  },
  props: {
    closed: Boolean
  },
  computed: {
    ...mapGetters([
      'dynamicRoutes',
      'submenu'
    ])
  },
  methods: {
    toggleDropdown (name) {
      console.log(this.submenu)
      this.submenu[name] = !this.submenu[name]
    }
  }
}
</script>

<style scoped>
#sidebar {
  width: 200px;
/*   max-width: 200px; */
  min-height: 100vh;
  max-height: 100vh;

  background-color: #293462;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  overflow: visible;
  font-weight: 500;

  transition:width 0.5s;
}

.sidebar-wrapper {
  overflow-y: auto;
}

.collapse #sidebar {
  width: 52.2px;
}

.menu-item {
  cursor: pointer;
}

.menu-title-wrapper {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
}

.menu-title-wrapper .icon {
  min-width: 50px;
}

/* When collapsed, hidden the text. */
.collapse #sidebar .menu-title {
  display: none;
}

.menu-item:hover {
  background-color: #242e58;
}

#sidebar a {
  color: #fff1c1;
}

.submenu {
  font-size: .9em;
  padding-left: 32px;
}

.collapse ._dropdown-menu {
  border-radius: 5px;
  background-color: #293462;
  position: absolute;
  left: 50px;
  right: -100px;
  transform: translate(10px, -50px);
}

.collapse .submenu {
  padding-left: 0;
}

.collapse .submenu-title {
  display: block !important;
}

</style>
