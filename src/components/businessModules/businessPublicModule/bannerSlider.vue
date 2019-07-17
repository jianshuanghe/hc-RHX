<template>
  <div class="slider-wrapper" id="slider-wrapper" ref="sliderWrapper">
    <div class="slider-content">
      <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </div>
        <div class="dots">
          <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'
  import {mapMutations} from 'vuex'
  export default {
    name: 'slider',
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        loop: true,
        autoPlay: true,
        interval: 4000,
        recommends: [{
          "linkUrl": "https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=4054280&g_f=shoujijiaodian",
          "picUrl": "http://style.iambuyer.com/img/mi-temp-imgs-01.jpg",
          "id": 15718
        }, {
          "linkUrl": "http://y.qq.com/w/album.html?albummid=004KrDD526x3Lh",
          "picUrl": "http://style.iambuyer.com/img/mi-temp-imgs-01.jpg",
          "id": 15737
        }, {
          "linkUrl": "https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=4045051&g_f=shoujijiaodian",
          "picUrl": "http://style.iambuyer.com/img/mi-temp-imgs-01.jpg",
          "id": 15656
        }, {
          "linkUrl": "http://y.qq.com/m/act/101girlc/index.html?ADTAG=jiaodiantu",
          "picUrl": "http://style.iambuyer.com/img/mi-temp-imgs-01.jpg",
          "id": 15705
        }, {
          "linkUrl": "https://y.qq.com/apg/256/index.html",
          "picUrl": "http://style.iambuyer.com/img/mi-temp-imgs-01.jpg",
          "id": 15723
        }]
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.set_banner_height(this.$refs.sliderWrapper.offsetHeight)
        setTimeout(() => {
          this._setSliderWidth()
          this._initDots()
          this._initSlider()
          if (this.autoPlay) {
            this._play()
          }
        }, 20)
        window.addEventListener('resize', () => {
          if (!this.slider || !this.slider.enabled) {
            return
          }
          clearTimeout(this.resizeTimer)
          this.resizeTimer = setTimeout(() => {
            if (this.slider.isInTransition) {
              this._onScrollEnd()
            } else {
              if (this.autoPlay) {
                this._play()
              }
            }
            this.refresh()
          }, 60)
        })
      })
    },
    activated() {
      this.slider.enable()
      let pageIndex = this.slider.getCurrentPage().pageX
      this.slider.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slider.disable()
      clearTimeout(this.timer)
    },

    methods: {
      refresh() {
        if (this.slider) {
          this._setSliderWidth(true)
          this.slider.refresh()
        }
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.slider.refresh()
          }, 20)
        }
      },
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })
        this.slider.on('scrollEnd', this._onScrollEnd)
        this.slider.on('touchend', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      },
      ...mapMutations({
        setTempData: 'SET_TEMP_DATA',
        set_up_or_down: 'SET_UPORDOWN',
        set_edit: 'SET_EDITABLE',
        set_preview: 'SET_IS_PREVIEW',
        set_banner_height:'SET_BANNER_HEIGHT'
      }),
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
//banner start
.slider-wrapper
  position: relative
  width: 100%
  height: 0
  padding-top: 200px
  overflow: hidden
  .slider-content
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    .slider
      min-height: 1px
      height: 100%
      position: relative
      .slider-group
        position: relative
        overflow: hidden
        white-space: nowrap
        height: 100%
        .slider-item
          float: left
          height: 100%
          box-sizing: border-box
          overflow: hidden
          text-align: center
          a
            display: block
            width: 100%
            height: 100%
            overflow: hidden
            text-decoration: none
          img
            display: block
            width: 100%
            height 100%
      .dots
        position: absolute
        right: 0
        left: 0
        bottom: 12px
        transform: translateZ(1px)
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-text-l
          transition all 0.3s
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
//banner end

</style>
