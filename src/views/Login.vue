<template>
  <div class="login-container columns is-vcentered is-centered">
    <div class="column is-3">
      <h1 class="title">Login Form</h1>
      <form>
        <div class="field">
           <input type="email" class="input is-small" placeholder="Email" v-model="email">
        </div>
        <div class="field">
           <input type="password" class="input is-small" placeholder="Password" v-model="password">
        </div>
        <button class="button is-primary" @click="login">Login</button>
        <button class="button" @click="register">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      token: ''
    }
  },
  computed: {
    ...mapGetters([
      'users'
    ])
  },
  created () {
    this.$store.dispatch('getUsers')
  },
  methods: {
    login () {
      this.token = this.password
      let findUser = this.users.find(user =>
        user.email === this.email
      )
      if (findUser && findUser.token === this.token) {
        let token = this.token
        Cookies.set('user', { email: token }, { expires: 7 })
        this.$router.push('/')
      } else {
        alert('Login error')
      }
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #293462;
  margin: 0;
}

h1.title {
  color: #fff1c1;
}

</style>
