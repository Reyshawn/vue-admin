<template>
  <div
    class="notification-center">
    <transition-group name="fade" class="message-container">
      <div
        v-for="message in Messages"
        :key="message.id"
        class="message-item message"
        :class="'is-'+message.type"
        >
        <div class="message-header">
          <p>{{message.type[0].toUpperCase() + message.type.slice(1)}}</p>
          <button @click="deleteMsg(message.id)" class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <p>{{message.msg}}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Notification',
  computed: {
    ...mapGetters([
      'Messages'
    ])
  },
  methods: {
    deleteMsg (id) {
      this.$store.commit('DELETE_MSG', id)
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

.message-container {
  margin: 0;
  display: flex;
  flex-direction: column-reverse;
}

.message-item:last-child:not(:first-child) {
  margin-bottom: 24px;
}

.message-item:first-child {
  margin-bottom: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
