<template>
  <svg :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'MIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'm-icon ' + this.className
      }
      return 'm-icon'
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
.m-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: @color-theme;
  overflow: hidden;
}
</style>
