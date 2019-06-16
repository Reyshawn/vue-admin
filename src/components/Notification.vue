<template>
  <div
    class="notification-center">
    <div
      v-for="error in errorMessages"
      :key="error.id"
      class="message is-warning">
      <div class="message-header">
        <p>Warning</p>
        <button @click="deleteErrMsg(error.id)" class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">
        <p>{{error.msg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Notification',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'errorMessages'
    ])
  },
  methods: {
    deleteErrMsg(id) {
      this.$store.commit('DELETE_ERROR_MSG', id)
    }
  }
}
</script>

<style scoped>
.notification-center {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 300px;
  z-index: 1;
}
</style>
