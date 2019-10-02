<template>
  <div class="_breadcrumb">
    <router-link to="/dashboard">Dashboard</router-link>
    <div class="wrapper" v-if="$route.path!=='/dashboard'">
      <div class="wrapper" v-for="route in breadcrumb" :key="route.name">
        <p class="dividend">/</p>
        <router-link :to="route.path" >{{route.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
    }
  },
  computed: {
    breadcrumb() {
      return this.$route.matched
    }
  }

}
</script>

<style>
._breadcrumb {
  color: #293462;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-weight: 500;
}

._breadcrumb a {
  color: #293462;
}

._breadcrumb a:hover {
  color: #293462;
  border-bottom: 1px solid #293462;
}

.dividend {
  margin: 0 5px;
}

.wrapper {
  display: flex;
  flex-direction: row;
}


</style>
