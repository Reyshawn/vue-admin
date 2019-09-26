<template>
  <div class="register-container">
    <div class="register-form">
      <div class="login-or-register">
        <router-link to='/login'>Login</router-link>
        " or "
        <router-link to='/register'>Register</router-link>
      </div>
      <form @submit.prevent="register">
        <div class="field">
          <label for="username">Username</label>
          <input type="text" name="username" placeholder="Username" v-model="username">
        </div>
        <div class="field">
          <label for="email">Email Address</label>
          <input type="email" name="email" placeholder="Email" v-model="email">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input type="password" name="password" placeholder="Password" v-model="password">
        </div>
        <div class="field">
          <label for="password_2">Repeat Password</label>
          <input type="password" name="password_2" placeholder="Repeat the password" v-model="password_2">
        </div>
        <div class="form-submit">
          <button type='submit' class="button">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password_2: ''
    }
  },
  methods: {
    register () {
      if (!this.username || !this.email || !this.password || !this.password_2) {
        this.$store.dispatch('pushMessage', {
          type: 'warning',
          msg: 'Please fill in all fields.'
        })
      }
      if (this.password !== this.password_2) {
        this.$store.dispatch('pushMessage', {
          type: 'warning',
          msg: 'Password do not match'
        })
      }
      if (this.password.length < 6) {
        this.$store.dispatch('pushMessage', {
          type: 'warning',
          msg: 'Password should be at least 6 characters'
        })
      }
      if (this.$store.getters.Messages.length === 0) {
        let info = {
          name: this.username,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('register', info)
          .then(response => {
            console.log(response)
            this.$store.dispatch('pushMessage', {
              type: 'success',
              msg: '❤️ Register succeeded.'
            })
            this.$router.push('/login')
          })
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #293462;
}

.register-form {
  max-width: 800px;
  margin: 200px 30%;
  color: #293462;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.register-form form {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.login-or-register {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.form-submit {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  align-items: center;
}

input {
  width: 100%;
  margin: 5px 0;
  font-size: .8em;
  border: none;
  border-bottom: 1px solid #293462;
  outline: none;
}

.button {
  width: 100px;
  margin: 0;
  border: none;
  color: #fff1c1;
  background-color: #293462;
  border-radius: 0 !important;
}

.button:hover {
  background-color: #242e58;
  color: #fff1c1;
}

</style>
