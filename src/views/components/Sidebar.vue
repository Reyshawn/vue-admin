<template>
  <div class="sidebar-wrapper">
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/components">Components</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style scoped>
.sidebar-wrapper {
  background-color: #293462;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-wrapper ul {
  margin-top: 40px;
}

.sidebar-wrapper li {
  margin: 10px auto;
}

.sidebar-wrapper a {
  color: #fff1c1;
}

.sidebar-wrapper a:hover {
  border-bottom: 1px solid #fff1c1;
}
</style>
