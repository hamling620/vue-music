<template>
  <div class="m-header">
    <div class="logo"></div>
    <h1 class="title">Vue Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <m-icon icon-class="user" class="icon-user"></m-icon>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MHeader'
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
@import '~@/assets/less/mixin.less';
.m-header {
  height: 44px;
  text-align: center;
  font-size: 0;
  color: @color-theme;
  position: relative;
  .logo {
    display: inline-block;
    vertical-align: top;
    margin-top: 6px;
    height: 32px;
    width: 30px;
    margin-right: 9px;
    .bg-image('~./logo');
    background-size: 100% 100%;
  }
  .title {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: @font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-user {
      display: block;
      padding: 10px;
      fill: @color-theme;
      font-size: @font-size-large-x;
    }
  }
}
</style>
