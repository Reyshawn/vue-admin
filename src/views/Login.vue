<template>
  <div class="login-container columns is-vcentered is-centered">
    <div v-if="errors.length!==0" class="message is-warning">
        <div class="message-header">
          <p>Warning</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <p v-for="error in errors" :key="error.msg">{{error.msg}}</p>
        </div>
      </div>
    <div class="column is-3">
      <h1 class="title">Login Form</h1>
      <form @submit.prevent="login">
        <div class="field">
           <input type="email" class="input is-small" placeholder="Email" v-model="email">
        </div>
        <div class="field">
           <input type="password" class="input is-small" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="button is-primary">Login</button>
        <router-link to='/register'><button class="button">Register</button></router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    login () {
      if (!this.email || !this.password) {
        this.errors.push({ msg: 'Please fill in all fields.' })
      }
      if (this.errors.length === 0) {
        let data = {
          email: this.email,
          password: this.password
        }
        axios.post('/api/login', data)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push('/')
            }
          })
          .catch(err => {
            console.log(err.response)
            this.errors.push({ msg: err.response.data })
          })
      }
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
