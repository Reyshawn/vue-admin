<template>
  <div class="login-container columns is-vcentered is-centered">
    <div class="column is-3">
      <h1 class="title">Register Form</h1>
      <form @submit.prevent="submitForm">
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
        <button class="button is-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'register',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    submitForm () {
      if (this.username && this.email && this.password) {
        this.$store.dispatch('register', { username: this.username, email: this.email, password: this.password }).then(() => {
          this.$router.push('/login')
        })
      } else {
        alert('Error!!!!')
      }
    }
  }
}
</script>

<style>

</style>
