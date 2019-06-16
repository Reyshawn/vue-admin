<template>
  <div class="register-container columns is-vcentered is-centered">
    <div class="column is-3">
      <div v-if="errors.length!==0" class="message is-warning">
        <div class="message-header">
          <p>Warning</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <p v-for="error in errors" :key="error.msg">{{error.msg}}</p>
        </div>
      </div>
      <h1 class="title">Register Form</h1>
      <form @submit.prevent="register">
        <div class="field">
          <label for="username"></label>
          <input type="text" name="username" class="input is-small" placeholder="Username" v-model="username">
        </div>
        <div class="field">
          <label for="email"></label>
          <input type="email" name="email" class="input is-small" placeholder="Email" v-model="email">
        </div>
        <div class="field">
          <label for="password"></label>
          <input type="password" name="password" class="input is-small" placeholder="Password" v-model="password">
        </div>
        <div class="field">
          <label for="password_2"></label>
          <input type="password" name="password_2" class="input is-small" placeholder="Repeat the password" v-model="password_2">
        </div>
        <router-link to="/login"><button class="button">Login</button></router-link>
        <button type='submit' class="button is-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password_2: '',
      errors: []
    }
  },
  methods: {
    register () {
      if (!this.username || !this.email || !this.password || !this.password_2) {
        this.errors.push({ msg: 'Please fill in all fields.' })
      }
      if (this.password !== this.password_2) {
        this.errors.push({ msg: 'Password do not match' })
      }
      if (this.password.length < 6) {
        this.errors.push({ msg: 'Password should be at least 6 characters' })
      }
      if (this.errors.length === 0) {
        let info = {
          name: this.username,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('register', info)
          .then(response => {
            console.log(response)
          })
      }
    }
  }
}
</script>

<style>
.register-container {
  height: 100%;
  width: 100%;
  background-color: #293462;
  margin: 0;
}

h1.title {
  color: #fff1c1;
}

</style>
