<template>
  <div class="home">
    <button class="button" @click="logout">logout</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Cookies from 'js-cookie'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    logout () {
      Cookies.remove('user')
      this.$router.push('/login')
    }
  }
}
</script>
