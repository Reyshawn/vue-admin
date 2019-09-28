<template>
  <nav id="sidebar">
    <ul>
      <li class="menu-item">
        <router-link to="/weather" class="menu-title-wrapper">
          <span class="icon">
            <i class="fas fa-tachometer-alt"></i>
          </span>
          <p class="menu-title">Weather</p>
        </router-link>
      </li>
      <li class="menu-item _dropdown">
        <div class="menu-title-wrapper" @click="toggleDropdown">
          <span class="icon">
            <i class="fas fa-angle-double-right"></i>
          </span>
          <a class="menu-title">Permission</a>
        </div>
        <ul class="_dropdown-menu" v-if="active">
          <li v-for="route in dynamicRoutes" :key=route.path class="menu-item">
            <router-link :to="route.path" class="menu-title-wrapper">
              <span class="icon">
                <i class="fas fa-angle-double-right"></i>
              </span>
              <p class="menu-title">{{ route.name }}</p>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="menu-item">
        <a class="menu-title-wrapper" href="#">
          <span class="icon">
            <i class="fas fa-cubes"></i>
          </span>
          <a class="menu-title">Other item</a>
        </a>
      </li>
      <li class="menu-item">
        <a class="menu-title-wrapper" href="#">
          <span class="icon">
            <i class="fas fa-cubes"></i>
          </span>
          <a class="menu-title">Other item</a>
        </a>
      </li>
      <li class="menu-item">
        <a class="menu-title-wrapper" href="#">
          <span class="icon">
            <i class="fas fa-cubes"></i>
          </span>
          <a class="menu-title">Other item</a>
        </a>
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
      active: false
    }
  },
  props: {
    closed: Boolean
  },
  computed: {
    ...mapGetters([
      'dynamicRoutes'
    ])
  },
  methods: {
    toggleDropdown (e) {
      e.stopPropagation()
      this.active = !this.active
      if (this.active) {
        window.addEventListener('click', () => {
          this.active = false
        })
      } else {
        window.removeEventListener('click', () => {
          this.active = false
        })
      }
    }
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
  font-weight: 500;
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
  visibility: hidden;
}

.menu-item:hover {
  background-color: #242e58;
}

#sidebar a {
  color: #fff1c1;
}

</style>
