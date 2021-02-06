<template>
  <div class="music-list">
    <div class="back">
      <m-icon icon-class="back" class="icon-back" @click="back"></m-icon>
    </div>
    <div class="title" v-html="title"></div>
    <div class="bg-image" :style="bgStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImage}`
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
@import '~@/assets/less/mixin.less';
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @color-background;
  .back {
    position: absolute;
    z-index: 50;
    top: 0;
    left: 6px;
    .icon-back {
      display: block;
      padding: 10px;
      color: @color-theme;
      font-size: @font-size-large-x;
    }
  }
  .title {
    position: absolute;
    z-index: 40;
    top: 0;
    left: 10%;
    width: 80%;
    line-height: 40px;
    text-align: center;
    font-size: @font-size-large;
    color: @color-text;
    .no-wrap();
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
  }
}
</style>
