<template>
  <div class="admin-container">
    <h1>Users Control Panel</h1>
    <table class="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th></th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Roles</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="(user, index) in users" :key="user._id">
          <th>{{index+1}}</th>
          <td class="avatar"><img :src="user.imageUrl" :alt="user.name"></td>
          <td>{{user.name}}</td>
          <td>{{user.gender}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.email}}</td>
          <td>{{user.address}}</td>
          <td>{{user.roles}}</td>
        </tr>
      </tbody>
      </table>
  </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { bufferUrl } from '@/utils'

export default {
  name: 'admin',
  data () {
    return {
      res: '',
      users: null
    }
  },
  async mounted () {
    this.res = await axios.get('/auth/users', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    })
    console.log(this.res)
    this.users = this.res.data

    this.users.map(user => {
      user.imageUrl = bufferUrl(user.avatar.data.data)
    })
  }

}
</script>

<style lang='scss' scoped>

.admin-container {
  height: 100%;
  width: 100%;
  border: 3px solid #ff126d;

  .avatar {
    width: 30px;
    height: 30px;
  }

  .avatar img {
    clip-path: circle();
    transform: scale(0.7);
  }
}

</style>
