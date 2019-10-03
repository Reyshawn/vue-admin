<template>
  <div class='visitor-container'>
    <div class="user-profile">
      <div class="avatar-container">
        <div class="avatar">
          <img src="@/assets/user.jpg" alt="user-avatar">
        </div>
      </div>
      <div class="info-container">
        <ul class="info-list">
          <li class="info info-name">
            {{ name.toUpperCase() }}
          </li>
          <li class="info">
            <p><i class="fas fa-venus-mars"></i> Gender:</p>
            <p>{{ gender }}</p>
          </li>
          <li class="info">
            <p><i class="fas fa-phone-alt"></i> Phone:</p>
            <p>{{ phone }}</p>
          </li>
          <li class="info">
            <p><i class="far fa-envelope"></i> E-mail:</p>
            <p>{{ email }}</p>
          </li>
          <li class="info">
            <p><i class="fas fa-map-marker-alt"></i> Address:</p>
            <p>{{ address }}</p>
          </li>
          <li class="info">
            <p><i class="fas fa-link"></i> Homepage:</p>
            <p>{{ homepage }}</p>
          </li>
          <li class="info">
            <p><i class="far fa-building"></i> Company:</p>
            <p>{{ company }}</p>
          </li>
          <li class="info">
            <p><i class="fas fa-university"></i> Education:</p>
            <p>{{ education }}</p>
          </li>
        </ul>
      </div>
      <div class="description">
        <p><i class="fas fa-info-circle"></i></p>
        <p>{{ introduction }}</p>
      </div>
      <button class="edit-button" @click="showForm=!showForm"><i class="fas fa-cog"></i></button>
    </div>
    <div class="user-status">

    </div>

    <div class="form-container" :class="{'show-form': showForm}">
      <form class="edit-form" @submit.prevent="updateInfo">
        <fieldset>
          <legend>Avatar</legend>
          <div class="info info-avatar">
            <div class="edit-avatar"></div>
            <input type="file" name="avatar" id="">
          </div>
        </fieldset>
        <fieldset>
          <legend>Personal</legend>
          <div class="info">
            <label><i class="fas fa-user"></i> Name:</label>
            <input type="text" name='name' v-model="name">
          </div>
          <div class="info info-gender">
            <label><i class="fas fa-venus-mars"></i> Gender:</label>
            <p>male</p>
            <input type="radio" name="gender" id="" value="male" v-model="gender">
            <p>female</p>
            <input type="radio" name="gender" id="" value="female" v-model="gender">
            <p>unknown</p>
            <input type="radio" name="gender" id="" value="unknown" v-model="gender">
          </div>
          <div class="info">
            <label><i class="fas fa-link"></i> Homepage:</label>
            <input type="text" name="homepage" v-model="homepage">
          </div>
          <div class="info">
            <label><i class="far fa-building"></i> Company:</label>
            <input type="text" name="company" v-model="company">
          </div>
          <div class="info">
            <label><i class="fas fa-university"></i> Education:</label>
            <input type="text" name="education" v-model="education">
          </div>
        </fieldset>
        <fieldset>
          <legend>Contact</legend>
           <div class="info">
            <label><i class="fas fa-phone-alt"></i> Phone:</label>
            <input type="text" name="phone" v-model="phone">
          </div>
          <div class="info">
            <label><i class="far fa-envelope"></i> E-mail:</label>
            <p>{{email}}</p>
          </div>
          <div class="info">
            <label><i class="fas fa-map-marker-alt"></i> Address:</label>
            <input type="text" name="address" v-model="address">
          </div>
        </fieldset>

        <fieldset>
          <legend>Appendix</legend>
          <div class="info info-intro">
            <label><i class="fas fa-info-circle"></i> Introduction:</label>
            <textarea rows="5" cols="33" name="introduction" v-model="introduction" />
          </div>
        </fieldset>

        <div class="button-wrapper">
          <button class="_button" type="submit">Confirm</button>
          <button class="_button" @click.prevent="showForm=false">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'visitor',
  data () {
    return {
      showForm: false,

      name: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      homepage: '',
      company: '',
      education: '',
      introduction: ''
    }
  },

  async mounted () {
    const res = await this.$store.dispatch('user/getInfo')
    this.name = res.name
    this.gender = res.gender
    this.phone = res.phone
    this.email = res.email
    this.address = res.address
    this.homepage = res.homepage
    this.company = res.company
    this.education = res.education
    this.introduction = res.introduction
  },
  methods: {
    async updateInfo (e) {
      const res = await this.$store.dispatch('user/setInfo', {
        name: this.name,
        gender: this.gender,
        phone: this.phone,
        address: this.address,
        homepage: this.homepage,
        company: this.company,
        education: this.education,
        introduction: this.introduction
      })
      console.log(res)
    }
  }
}
</script>

<style scoped>
.visitor-container {
  position: relative;

  height: calc(100vh - 50px);
  width: 100%;

  overflow: hidden;

  color: #293462;

  display: grid;
  grid-template-rows: 320px auto;
  grid-template-columns: auto 600px auto;
  grid-template-areas: "x user y"
                       "status status status";
}

.user-profile {
  position: relative;

  margin: 10px;
  grid-area: user;
  border: 1px solid #e6e6e6;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: #fff;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 80% 20%;
}

.user-profile:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.user-status {
  grid-area: status;
  background-color: #fff;
}

.info-container {
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  height: 200px;
  width: 200px;
  /* border: 1px solid #b60a5a; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.avatar img {
  /* clip-path: circle(); */
  transform: scale(1.8, 1.8);
}

.info {
  display: flex;
  align-items: center;
}

.info p:first-child, .info label {
  width: 120px;
  font-size: .8em;
  font-weight: bold;
}

.info-list {
  width: 320px;
  /* margin: 27px 0; */
  /* border: 1px solid #b60a5a; */
}

.info-name {
  font-size: 3.5em;
  font-weight: bold;
  font-style: italic;
}

.description {
  display: flex;
  justify-content: center;
  font-size: .9em;
  font-style: italic;
}

.description p {
  margin: 0 5px;
}

.edit-button {
  position: absolute;
  top: 5px;
  right: 5px;
}

.form-container {
  position: absolute;
  height: 100%;
  width: 100%;

  transform: translateY(100%);
  transition: transform .5s cubic-bezier(.25,.8,.25,1);

  display: flex;
  justify-content: center;
  align-items: center;

}

.show-form {
  transform: translateY(0);
}

.edit-form {
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 30px;
  background-color: #fff;
  opacity: 1!important;
  width: 500px;
  height: 750px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.edit-form:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

fieldset {
  border: 2px solid #293462;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
}

fieldset p {
  font-size: .9em;
}

fieldset input {
  margin-right: auto;
}

fieldset .info {
  margin: 5px 0;
}

fieldset label {
  width: 150px !important;
}

fieldset legend {
  font-weight: bold;
  margin-left: 10px;
  color: #acaeb3;
}

.info-gender p {
  margin-right: 5px;
}

.info-intro label {
  align-self: flex-start
}

.info-intro textarea {
  max-width: 250px;
  max-height: 100px;
}

.button-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.button-wrapper button {
  width: 100px;
  height: 30px;
  margin: 10px 0;
  border: none;
  outline: none;
  color: #fff1c1;
  background-color: #293462;
  border-radius: 5px !important;

  font-size: .8em;
  font-weight: 500;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.button-wrapper button:hover {
  color: #fff1c1;
  box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 5px 7px rgba(0,0,0,0.22);
}

.edit-avatar {
  width: 100px;
  height: 100px;

  border: 2px dashed #293462;
}

.info-avatar input {
  margin-left: 50px;
}

</style>
