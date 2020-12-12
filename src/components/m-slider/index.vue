<template>
  <div class="m-slider" ref="slider">
    <div class="m-slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="m-slider-dots">
      <span class="m-slider-dots-item" v-for="(item, index) in dots" :class="{ active: currentPageIndex === index }" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { addClass } from '@/utils/dom'

BScroll.use(Slide)

export default {
  name: 'MSlider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.setSliderWidth()
      this.initDots()
      this.initSlider()
    }, 20)

    window.addEventListener('resize', this.handleResize)
    this.$once('hook:beforeDestory', () => {
      window.removeEventListener('resize', this.handleResize)
      clearTimeout(this.timer)
      this.slider.destory()
    })
  },
  methods: {
    setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'm-slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initDots () {
      this.dots = new Array(this.children.length)
    },
    initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        slide: {
          loop: this.loop,
          autoplay: this.autoplay,
          interval: this.interval,
          threshold: 0.3
        },
        useTransition: true,
        momentum: false,
        bounce: false
      })

      this.slider.on('scrollEnd', this.scrollEnd)
    },
    refresh () {
      if (this.slider) {
        this.setSliderWidth(true)
        this.slider.refresh()
      }
    },
    scrollEnd () {
      const pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
    },
    handleResize () {
      if (!this.slider) return
      this.refresh()
    },
    play () {
      let pageIndex = this.currentPageIndex
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
.m-slider {
  min-height: 1px;
  position: relative;
  &-group {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }
  &-item {
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    text-align: center;
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-decoration: none;
    }
    img {
      width: 100%;
    }
  }
  &-dots {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
    &-item {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 4px;
      border-radius: 50%;
      background: @color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: @color-text-ll;
      }
    }
  }
}
</style>
