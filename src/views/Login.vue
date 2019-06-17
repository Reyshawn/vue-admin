<template>
  <div class="login-container columns is-centered">
    <div class="login-form column is-3">
      <h1 class="title">Login Form</h1>
      <form @submit.prevent="login">
        <div class="field">
           <input type="email" class="input is-small" placeholder="Email" v-model="email">
        </div>
        <div class="field">
           <input type="password" class="input is-small" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="button">Login</button>
        <router-link to='/register'><button class="button">Register</button></router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.email || !this.password) {
        this.$store.dispatch('pushMessage', {
          type: 'warning',
          msg: 'Please fill in all fields.'
        })
      }
      if (this.$store.getters.Messages.length === 0) {
        let info = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', info).then(response => {
          console.log('login:', response)
          this.$store.dispatch('pushMessage', {
            type: 'success',
            msg: '❤️ Logged in success!'
          })
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #293462;
  margin: 0;
}

.login-form {
  margin-top: 200px;
}

.button {
  width: 100px;
  margin: 0 20px 0 0;
  border: none;
  color: #fff1c1;
  background-color: #293462;
  border-radius: 0 !important;
}

.button:hover {
  background-color: #242e58;
  color: #fff1c1;
}

h1.title {
  color: #fff1c1;
}

</style>
