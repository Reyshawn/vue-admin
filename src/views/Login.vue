<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-or-register">
        <router-link to='/login' class="currentRoute">Login</router-link>
        <p class="dividend">or</p>
        <router-link to='/register'>Register</router-link>
      </div>
      <form @submit.prevent="login">
        <label for="email">Email Adress</label>
        <input class="login-input" type="email" placeholder="Email" v-model="email">
        <label for="password">Password</label>
        <input class="login-input" type="password" placeholder="Password" v-model="password">
        <div class="form-submit">
          <input id='chkbox' type="checkbox" v-model="rememberMe">
          <label for="chkbox">Remember me</label>
          <button type="submit" class="button">Login</button>
        </div>
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
      password: '',
      rememberMe: false
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
          password: this.password,
          rememberMe: this.rememberMe
        }
        this.$store.dispatch('user/login', info).then(response => {
          this.$store.dispatch('pushMessage', {
            type: 'success',
            msg: '❤️ Logged in success!'
          })
          this.$router.push('/dashboard')
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
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(45deg, rgba(41,52,98,1) 0%, rgba(18,132,156,1) 100%);
}

.login-form {
  max-width: 800px;
  margin: 200px 30%;
  color: #293462;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.login-form form {
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

.login-input {
  width: 100%;
  margin: 5px 0;
  font-size: .8em;
  border: none;
  border-bottom: 1px solid #293462;
  outline: none;
}

.form-submit {
  display: flex;
  margin: 10px 0;
  align-items: center;
}

.form-submit label {
  margin-left: 10px;
  margin-right: auto;
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
