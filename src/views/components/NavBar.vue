<template>
  <div class="nav-bar">
    <div class="nav-list">
      <slot></slot>
      <div class="nav-item"><a @click="logout">Logout</a></div>
      <div class="nav-item"><router-link to="/about">About</router-link></div>
      <div class="nav-item"><router-link to="/">Home</router-link></div>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav-list {
  display: flex;
  flex-direction: row-reverse;
}

.nav-item {
  margin: auto 10px;
}

.nav-item a {
  color: #fff1c1;
}

.nav-item a:hover {
  border-bottom: 1px solid #fff1c1;
}
</style>
