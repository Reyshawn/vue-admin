<template>
  <div class="register-container">
    <div class="register-form">
      <div class="login-or-register">
        <router-link to='/login'>Login</router-link>
        <p class="dividend">or</p>
        <router-link to='/register' class="currentRoute">Register</router-link>
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

        this.$store.dispatch('user/register', info)
          .then(response => {
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
  background: linear-gradient(45deg, rgba(41,52,98,1) 0%, rgba(18,132,156,1) 100%);
}

.register-form {
  max-width: 800px;
  margin: 200px 30%;
  color: #293462;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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

.login-or-register a {
  color: #293462;
  font-weight: bold;
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
  border-radius: 5px !important;

  font-size: .8em;
  font-weight: 500;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.button:hover {
  box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 5px 7px rgba(0,0,0,0.22);
}

.dividend {
  margin: 0 7px;
}

.currentRoute {
  border-bottom: 1px solid #293462;
}

</style>
