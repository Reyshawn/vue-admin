<template>
  <div class="gallery-container">
    <div class="search-header" :class="{'scrolled': scrolled}">
      <h1>Gallery</h1>
      <div class="search-box">
        <button><i class="fas fa-search"></i></button>
        <input type="text">
      </div>

    </div>
    <div class="search-result">
    </div>
  </div>
</template>

<script>
export default {
  name: 'gallery',
  data () {
    return {
      scroll: 0,
      scrolled: false
    }
  },
  methods: {
    handleScroll (e) {
      this.scroll = window.scrollY
      if (this.scroll > 550) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }

}
</script>

<style scoped>

@keyframes slidedown {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

button {
  border: none;
  border-radius: 50%;
  padding: 0 10px;
  outline: none;
  font-size: 100%;
  transition: background-color .3s linear;

}

button:hover {
  color: #ffc125;
  background-color: #fff2d3;
}

.gallery-container {
  width: 100%;
  height: 3000px;
  border: 5px solid #d11141;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-header {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .5s linear;
}

.search-header h1 {
  font-size: 14em;
  font-weight: 700;
  color: #1a213d;
}

.search-header .search-box {
  margin-top: 50px;
  width: 500px;
  border: 2px solid #1a213d;
  border-radius: 10px;
  padding: 5px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.search-box input {
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.5em;
  margin: 3px;
}

.scrolled {
  position: sticky;
  align-self: flex-start;
  top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: slidedown .2s ease-in-out;
}

.scrolled h1 {
  margin-left: 20px;
  font-size: 2em;
}

.scrolled .search-box {
  margin: 0 20px;
  width: 300px
}

.scrolled input {
  font-size: 1em;
}

.scrolled button {
  padding: 0 5px;
}

.box {
  position: sticky;
  top: 60px;
  right: 10px;
}

</style>
