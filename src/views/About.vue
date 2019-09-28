<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click='test'>Click me</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    async test () {
      /* const { roles } = await this.$store.dispatch('getInfo')
      console.log('here about', roles)
      const accessedRoutes = await this.$store.dispatch('generateRoutes', roles)
      console.log('accessedRoutes about ', accessedRoutes) */
      return 0
    }
  }

}
</script>

<style scoped>
</style>
