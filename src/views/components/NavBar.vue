<template>
  <div class="nav-bar">
    <div class="nav-list">
      <div class="nav-item"><a @click="logout">Logout</a></div>
      <div class="nav-item"><router-link to="/about">About</router-link></div>
      <div class="nav-item"><router-link to="/">Home</router-link></div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'NavBar',
  methods: {
    logout () {
      Cookies.remove('user')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.nav-bar {
  height: 50px;
  width: 100%;
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
