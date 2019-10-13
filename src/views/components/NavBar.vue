<template>
  <div class="nav-bar">
      <div class="slot-left">
        <slot></slot>
      </div>
      <Breadcrumb />
      <div class="search-container" @mouseover="showSearch=true" @mouseleave="showSearch=false">
        <i class="icon fas fa-search"></i>
        <transition name="slide">
          <span class="search-box" v-if="showSearch">
            <input type="text" placeholder="Search ...">
          </span>
        </transition>
      </div>
      <ul class="slot-right">
        <router-link to="/">
          <li class="nav-item">Home</li>
        </router-link>
        <router-link to="/about">
          <li class="nav-item">About</li>
        </router-link>
        <li class="user-profile nav-item">
          <div class="_dropdown" @click="toggleDropdown">
            <img :src="src" alt="user-avatar">
            <ul class="_dropdown-menu" v-if="showDropdown">
              <li class="_dropdown-menu-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="_dropdown-menu-item">
                <router-link to="/visitor">Profile</router-link>
              </li>
              <li class="_dropdown-menu-item"><a>Settings</a></li>
              <li class="_dropdown-menu-item"><a @click="logout">Logout</a></li>
            </ul>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'NavBar',
  components: {
    Breadcrumb
  },
  data () {
    return {
      src: '',
      showDropdown: false,
      showSearch: false
    }
  },
  async mounted () {
    const res = await this.$store.dispatch('user/getInfo')
    let arrayBuffer = res.avatar.data.data
    let bytes = new Uint8Array(arrayBuffer)
    let blob = new Blob([bytes], { type: 'image/png' })
    let urlCreator = window.URL || window.webkitURL
    let imageUrl = urlCreator.createObjectURL(blob)
    this.src = imageUrl
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
        .then(response => {
          this.$store.dispatch('pushMessage', {
            type: 'success',
            msg: '👋🏻 Logged out!'
          })
          this.$router.push('/login')
        })
    },
    toggleDropdown (e) {
      e.stopPropagation() // this will stop propagation of this event to upper level
      this.showDropdown = !this.showDropdown
      if (this.showDropdown) {
        window.addEventListener('click', () => {
          this.showDropdown = false
        })
      } else {
        window.removeEventListener('click', () => {
          this.showDropdown = false
        })
      }
    }
  }
}
</script>

<style scoped>
.nav-bar {
  height: 50px;
  background-color: #fe5f55;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.slot-left {
  margin: 0;
  height: 100%;
  width: 50px;
}

.slot-left .nav-item, .slot-right .nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slot-right {
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
  font-weight: 500;
}

.slot-right .nav-item {
  padding: 0 0.4em;
}

.nav-item {
  height: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.nav-item:hover {
  background-color: #e4554c;
}

.nav-bar a, .nav-bar .icon {
  color: #293462;
}

.nav-item .icon {
  height: auto;
  width: auto;
  font-size: 1em;
}

/* Search */

.search-container {
  height: 100%;
  min-width: 50px;
  margin-left: auto;
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.search-container .icon {
  width: auto;
  height: auto;
  cursor: pointer;
}

.search-container .icon:hover {
  color: #3e4871;
}

.search-box {
  width: 100px;
  border-bottom: 1px solid #293462;
  margin-left: 10px;
  font-family: 'Avenir';
  font-size: 1.2em;
  color: #293462;
}

.search-box input {
  border: none;
  background-color: #fe5f55;
  outline: none;
  width: 100%;
  font-family: 'Avenir';
  font-weight: 500;
  font-size: 0.7em;
  color: #293462;
}

.search-box input::placeholder {
  font-family: 'Avenir';
  font-weight: 500;
  color: #293462;
  opacity: 0.5
}

.slide-enter , .slide-leave-to {
  width: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter-to, .slide-leave {
  width: 100px;
  border-bottom: 1px solid #293462;
}

/* Dropdown Menu */
/* Add underscore to avoid the Bulma class name */

.user-profile {
  width: 50px;
  height: 100%;
  padding: 0 !important;
}

._dropdown {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

._dropdown img {
  clip-path: circle();
  transform: scale(0.8)
}

._dropdown-menu {
  background-color: #293462;
  box-shadow: 10px 10px 30px 1px rgba(0,0,0,0.5);
  z-index: 3;
  padding: 0;
  position: absolute;
  top: 50px;
  right: 0;
}

._dropdown-menu a {
  color: #fff1c1;
}

._dropdown-menu-item {
  padding: 3px 7px;
}

._dropdown-menu-item a {
  display: block;
  min-width: 100%;
}

._dropdown-menu-item:hover {
  background-color: #242e58;
}

</style>
