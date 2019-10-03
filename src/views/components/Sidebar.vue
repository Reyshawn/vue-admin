<template>
  <nav id="sidebar">
    <ul class="sidebar-wrapper">
      <li v-for="route in dynamicRoutes" :key=route.name class="menu-item">
        <router-link
          v-if="typeof route.children === 'undefined'"
          :to="route.path"
          class="menu-title-wrapper"
          :class="{currentRoute: $route.path===route.path}"
        >
          <span class="icon">
            <i :class="[route.meta.icon]"></i>
          </span>
          <p class="menu-title">{{ route.name }}</p>
        </router-link>
        <div v-else
          @mouseover="if(closed) submenu[route.name]=true"
          @mouseleave="if(closed) submenu[route.name]=false"
        >
          <div class="menu-title-wrapper" @click="toggleDropdown($event, route.name)">
            <span class="icon">
              <i :class="[route.meta.icon]"></i>
            </span>
            <a class="menu-title">{{route.name}}</a>
          </div>
          <ul class="_dropdown-menu" v-if="submenu[route.name]">
            <li class="menu-item submenu" v-for="subRoute in route.children" :key="subRoute.name" :class="{currentRoute: $route.path===subRoute.path}">
              <router-link :to="subRoute.path" class="menu-title-wrapper">
                <span class="icon">
                  <i :class="[subRoute.meta.icon]"></i>
                </span>
                <p class="menu-title submenu-title">{{subRoute.name}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
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
    toggleDropdown (e, name) {
      e.stopPropagation()
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

  z-index: 999;
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
  padding-left: 12px;
}

.collapse ._dropdown-menu {
  background-color: #293462;
  box-shadow: 10px 10px 30px 1px rgba(0,0,0,0.5);
  position: absolute;
  left: 50px;
  right: -120px;
  transform: translate(0, -50px);
}

.collapse .submenu {
  padding-left: 0;
}

.collapse .submenu-title {
  display: block !important;
}

.currentRoute {
  border-left: 3px solid #fff1c1;
  background-color: #242e58;
}

</style>
