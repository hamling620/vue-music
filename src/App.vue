<template>
  <div id="app">
    <m-header></m-header>
    <m-tab :list="tabList"></m-tab>
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@/components/m-header'
import MTab from '@/components/m-tab'

export default {
  name: 'App',
  components: {
    MHeader,
    MTab
  },
  computed: {
    cachedViews () {
      return this.$store.getters.cachedViews
    },
    key () {
      return this.$route.path
    }
  },
  data () {
    return {
      tabList: [
        { title: '推荐', path: 'recommend' },
        { title: '歌手', path: 'singer' },
        { title: '排行', path: 'rank' },
        { title: '搜索', path: 'search' }
      ]
    }
  }
}
</script>

<style lang="less">
#app {
  min-height: 100vh;
  .page-wrapper {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
}
</style>
