<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: 'MScroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    }
  },
  watch: {
    data () {
      this.refreshTimer = setTimeout(this.refresh, 20)
      this.$once('hook:beforeDestory', () => {
        clearTimeout(this.refreshTimer)
      })
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.initScroll()
    }, 20)
    this.$once('hook:beforeDestory', () => {
      clearTimeout(this.timer)
    })
  },
  methods: {
    initScroll () {
      if (!this.$refs.scroll) return
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('on-scroll', pos)
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>
