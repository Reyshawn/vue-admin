<template>
  <div class="nav-bar">
      <div class="slot-left">
        <slot></slot>
      </div>
      <div class="slot-right">
        <div class="nav-item"><router-link to="/">Home</router-link></div>
        <div class="nav-item"><router-link to="/about">About</router-link></div>
        <div class="nav-item"><a @click="logout">Logout</a></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(response => {
          console.log(response)
          this.$store.dispatch('pushMessage', {
            type: 'success',
            msg: '👋🏻 Logged out!'
          })
          this.$router.push('/login')
        })
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
  margin-left: auto;
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
}

.nav-item:hover {
  background-color: #e4554c;
}

.nav-item a, .nav-item .icon {
  color: #293462;
}

.nav-item .icon {
  height: auto;
  width: auto;
  font-size: 1em;
}

</style>
