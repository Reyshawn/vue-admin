<template>
  <div class="gallery-container">
    <div class="search-header" :class="{'scrolled': scrolled}">
      <h1>Gallery</h1>
      <div class="search-box">
        <button @click.prevent='search'><i class="fas fa-search"></i></button>
        <input type="text" v-model='q'>
      </div>
    </div>
    <div class="search-result grid">
      <div class="_box">scrollY: {{scroll}} sidebar closed?: {{closed}}</div>
      <div class="grid-sizer"></div>
      <div v-for="image in images" :key="image.id" class="grid-item">
        <img :src="image.urls.small"  alt="">
      </div>
    </div>
    <div class="scrollTop" @click="scrollTop"></div>
    <div class="loading-container">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Masonry from 'masonry-layout'
import imageLoaded from 'imagesloaded'

import {mapGetters} from 'vuex'

async function getImages (query, page) {
  const params = {
    query,
    page,
    per_page: 10
  }
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': 'Client-ID 7e417839332a5515cbc9a7a2ca51815ee33211fbe08ba142e384a996c3e2901d'
  }
  const config = {
    headers,
    params
  }
  try {
    let res = await axios.get('/unsplash/search/photos', config)
    return res
  } catch (e) {
    console.log(e)
  }
}

window.rID = null

function animate(duration, fn) {
  console.log('duration', duration)
  const start = performance.now();
  
  let progress = 0; // between 0 and 1, +/-

  console.log('start', start);

  var i = 1

  function stopAni() {
    cancelAnimationFrame(window.rID);
    window.rID = null;  
  };
  function tick(now) {

    i++;
    if (progress >= 1) {
      stopAni()
      fn(1);
      return;
    }

    const elapsed = now - start;
    progress = elapsed / duration;

    // callback
    fn(progress); // number between 0 and 1

    window.rID = requestAnimationFrame(tick); // every 16.6666667 ms
  }
  tick(start);
}

function easing(progress) {
  return (1 - Math.cos(progress * Math.PI)) / 2
}

const animationDefaults = {
  duration: 1000,
  easing
}

animate.fromTo = ({
  from,
  to,
  easing,
  duration
}, fn) => {
  easing = easing || animationDefaults.easing;
  duration = duration || animationDefaults.duration;

  const delta = +to - +from;
  console.log('delta', delta)
  return animate(duration, progress => fn(from + easing(progress) * delta));
}


export default {
  name: 'gallery',
  data () {
    return {
      q: '',
      page: null,
      images: [],
      scrolled: false,
      loading: false,

      msnry: null,

      scroll: 0
    }
  },
  computed: {
    ...mapGetters({
      closed: 'app/closed'
    })
  },
  methods: {
    async handleScroll (e) {
      this.scroll = window.pageYOffset // window.scrollY or document.documentElement.scrollTop
      if (window.scrollY > 600) {
        this.scrolled = true
      } else if (window.scrollY < 200) {
        this.scrolled = false
      }
      if (!this.loading && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.loading = true
        console.log('this is bottom')
        this.page++
        let res = await getImages(this.q, this.page)
        this.images.push(...res.data.results)
        this.loading = false
      }
    },
    async search (e) {
      this.loading = true
      console.log('loading')
      this.page = 1
      let res = await getImages(this.q, this.page)
      this.loading = false
      this.images = res.data.results
    },
    scrollTop () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      animate.fromTo({
        from: currentScroll,
        to: 0,
        duration: 500
      }, value => {
        window.scrollTo(0, value)
      })

    }
  },
  watch: {
    images (newVal, oldVal) {
      // After all images loaded
      this.$nextTick(() => {
        let gridItems = document.querySelectorAll('.grid-item')
        for (let i = 10 * (this.page - 1); i < gridItems.length; i++) {
          this.msnry.appended(gridItems[i])
        }
        imageLoaded('.grid', () => {
          this.msnry.layout()
        })
      })
    },
    closed (newVal, oldVal) {
      console.log('changed?')
      setTimeout(() => {
        this.msnry.layout()
      }, 500) // 500ms is the transition time of the sidebar
    }
  },
  mounted () {
    let elem = document.querySelector('.grid')
    this.msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer'
    })
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
  background-color: #fff;
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

  z-index: 1;
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

.search-result {
  margin-top: 50px;
  width: 100%;
  z-index: 0;
}

.grid-sizer, .grid-item {
  width: 33.3%;
}

.grid-item {
  padding: 10px; 
}

.grid-item img {
  border-radius: 10px;
  border: 3px solid #294362;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.grid-item img:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}



.loading-container {
  margin-top: 100px;
  height: 100px;
  width: 500px;
  
  border: 3px solid #d11141;
}

.scrollTop {
  position: fixed;
  height: 30px;
  width: 30px;
  border: 3px solid #d11141;
  bottom: 10px;
  right: 10px;
}

._box {
  position: sticky;
  z-index: 2;
  top: 0;
  margin-right: 400px;
  widows: 300px;
}

@media(min-width:1440px) {
  .grid-sizer, .grid-item {
    width: 20%;
  }
}

@media(min-width:1024px) and (max-width: 1439px) {
  .grid-sizer, .grid-item {
    width: 25%;
  }
}

@media(max-width:425px) {
  .grid-sizer, .grid-item {
    width: 100%;
  }
}

</style>
