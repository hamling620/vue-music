<template>
  <div id="app">
    <m-header></m-header>
    <m-tab :list="tabList"></m-tab>
    <keep-alive>
      <router-view/>
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
}
</style>
