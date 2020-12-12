<template>
  <div class="m-loading">
    <img src="./loading.gif" alt="loading">
    <p class="desc">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'MLoading',
  props: {
    title: {
      type: String,
      default: 'loading...'
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
.m-loading {
  width: 100%;
  text-align: center;
  img {
    width: 24px;
    height: 24px;
  }
  .desc {
    line-height: 20px;
    color: @color-text-l;
    font-size: @font-size-small;
  }
}
</style>
