<template>
  <div class="gallery-container">
    <div class="place-holder" v-if="scrolled"></div>
    <div class="search-header" :class="{'scrolled': scrolled}">
      <h1>Gallery</h1>
      <div class="search-box">
        <button @click.prevent='search'><i class="fas fa-search"></i></button>
        <input type="text" v-model='q'>
      </div>
    </div>
    <div class="search-result grid">
      <div class="grid-sizer"></div>
      <div v-for="image in images" :key="image.id" class="grid-item">
        <img :src="image.urls.small"  :alt="image.alt_description" @click="toggelImage($event, image)">
      </div>
    </div>
    <div
      class="img-details-wrapper"
      :class="{'show-img':showImage}"
      @click="toggelImage($event, image)"
    >
      <div class="img-wrapper">
        <img src="" alt="">
      </div>
      <div class="img-details" v-if="showImage">
        <div class="img-details-size">
          <p>Width: <span>{{image.width}}px</span></p>
          <p>Height: <span>{{image.height}}px</span> </p>
        </div>
        <div class="img-details-tags">
          <span class="img-detail-tag" v-for="tag in image.tags" :key="tag.title">
            #{{tag.title}}
          </span>
        </div>
        <div class="img-details-author">
          <p><i class="fas fa-user-circle"></i> <a :href="image.user.links.html"> {{image.user.name}}</a></p>
          <p v-if="image.user.instagram_username"><i class="fab fa-instagram"></i> @{{image.user.instagram_username}} </p>
          <p v-if="image.user.twitter_username"><i class="fab fa-twitter-square"></i> @{{image.user.twitter_username}} </p>
        </div>
        <div class="img-details-download">
          <a :href="image.links.download">
            <i class="far fa-arrow-alt-circle-down"></i> Download This!
          </a>
        </div>
      </div>
    </div>
    <div class="scrollTop" @click="scrollTop" :class="{'hide': !scrolled}">
      <i class="fas fa-arrow-up"></i>
    </div>
    <div class="loading-container" v-if="loading">
      <div class="_loader">Loading ... </div>
    </div>
    <div class="search-result-end" v-if="page===totalPages">There is no result! 🎉</div>
  </div>
</template>

<script>
import axios from 'axios'
import Masonry from 'masonry-layout'
import imageLoaded from 'imagesloaded'

import { mapGetters } from 'vuex'
import { UnsplashAPI } from '@/config/api.js'
import animate from '@/utils/animate.js'

async function getImages (query, page) {
  const params = {
    query,
    page,
    per_page: 10
  }
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': `Client-ID ${UnsplashAPI}`
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

export default {
  name: 'gallery',
  data () {
    return {
      q: '',
      page: -1,
      totalPages: -2,
      images: [],
      scroll: 0,
      scrolled: false,
      loading: false,
      showImage: false,
      image: null,

      msnry: null
    }
  },
  computed: {
    ...mapGetters({
      closed: 'app/closed'
    })
  },
  methods: {
    async handleScroll (e) {
      this.scroll = document.body.scrollTop // window.scrollY or document.documentElement.scrollTop
      if (this.scroll > 600) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
      if (!this.loading && window.innerHeight + this.scroll >= document.body.scrollHeight && this.page < this.totalPages) {
        this.loading = true
        console.log('this is bottom')
        this.page++
        let res = await getImages(this.q, this.page)
        this.images.push(...res.data.results)
      }
    },
    async search (e) {
      if (this.scrolled) {
        this.scrollTop()
      }
      this.loading = true
      console.log('loading')
      this.page = 1
      let res = await getImages(this.q, this.page)
      this.loading = false
      this.images = res.data.results
      this.totalPages = res.data.total_pages
    },
    scrollTop () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      animate.fromTo({
        from: currentScroll,
        to: 0,
        duration: 500
      }, value => {
        document.body.scrollTo(0, value)
      })
    },

    toggelImage (e, image) {
      e.stopPropagation()
      this.showImage = !this.showImage
      let img = document.querySelector('.img-details-wrapper img')
      if (this.showImage) {
        this.image = image
        img.src = image.urls.regular
        document.body.style.overflow = 'hidden'
      } else {
        img.src = ''
        document.body.style.overflow = 'scroll'
      }
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
          this.loading = false
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
    document.body.style.overflow = 'scroll'
    let elem = document.querySelector('.grid')
    this.msnry = new Masonry(elem, {
      // options
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer'
    })
    document.body.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    document.body.style.removeProperty('overflow')
    document.body.removeEventListener('scroll', this.handleScroll)
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
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-header {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

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

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
}

.search-header .search-box:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
  margin-top: 10px;
}

.scrollTop {
  position: fixed;
  height: 50px;
  width: 50px;
  border: 2px solid #1a213d;
  color: #fff1c1;
  background-color: #294362;
  border-radius: 50%;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5em;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
}

.scrollTop:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.hide {
  visibility: hidden;
}

.place-holder {
  height: 100%;
  height: 388px; /* the height of bigger search-header minus the height of scrolled seach-header */
}

.img-details-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.8);
  transform: translateY(100%);
  transition: transform .3s ease-in-out;

  z-index: 1000;

  display: grid;
  grid-template-columns: 66.6% 1fr;
}

.img-details-wrapper .img-wrapper {
  grid-column: 1 / 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 10px;
}

.img-details-wrapper img {
  max-width: 100%;
  max-height: 100%;
}

.show-img {
  transform: translateY(0);
}

.img-details-wrapper .img-details {
  /* border-left: 1px solid #fff1c1; */
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 1.2em;
  padding-left: 10px;
}
.img-details-wrapper a {
  color: #fff;
}

.img-details-wrapper a:hover {
  border-bottom: 1px solid #fff;
}

.img-details-wrapper .img-details-tags {
  margin: 10px 0;
  font-size: .8em;
  font-weight: bold;
  font-style: italic;
}

/* loader animation */

._loader {
  font-size: 5px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #294362;
  background: linear-gradient(to right, #294362 0%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: load3 1s infinite linear;
  transform: translateZ(0);
}
._loader:before {
  width: 50%;
  height: 50%;
  background: #294362;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
._loader:after {
  background: #fff1c1;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.search-result-end {
  color: #1a213d;
  font-size: 2em;
  font-style: italic;
  font-weight: bold;
  margin: 100px auto;
}

@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
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
