<template>
  <div class="m-tab">
    <router-link v-for="item in list" :key="item.path" tag="div" :to="`/${item.path}`" class="m-tab-item">
      <span class="m-tab-link">{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'MTab',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
.m-tab {
  display: flex;
  &-item {
    flex: 1;
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: @font-size-medium;
    &.router-link-active {
      .m-tab-link {
        color: @color-theme;
        border-bottom: 2px solid @color-theme;
      }
    }
  }
  &-link {
    padding-bottom: 4px;
    color: @color-text-l;
  }
}
</style>
