<template>
  <div class='visitor-container'>
    <div class="user-profile">
      <div class="avatar-container">
        <div class="avatar">
          <img src="@/assets/user.jpg" alt="user-avatar">
        </div>
      </div>
      <div class="info-container">
        <div class="info-list">
          <div class="info">Name</div>
          <div class="info">Email</div>
          <div class="info">Description</div>
        </div>
      </div>
    </div>
    <div class="user-status"></div>
  </div>
</template>

<script>
export default {
  name: 'visitor',
  data () {

  }

}
</script>

<style scoped>
.visitor-container {
  height: calc(100vh - 50px);
  width: 100%;
  border: 5px solid #b60a5a;

  display: grid;
  grid-template-rows: 320px auto;
  grid-template-columns: auto 600px auto;
  grid-template-areas: "x user y"
                       "status status status";
}


.user-profile {
  grid-area: user;
  border: 1px solid #b60a5a;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 80% 20%;
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
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  height: 200px;
  width: 200px;
  border: 1px solid #b60a5a;
}


.info-list {
  width: 320px;
  margin: 27px 0;
  border: 1px solid #b60a5a;
}


</style>
