<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from '@/views/components/music-list'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/utils/song'
import { mapGetters } from 'vuex'

export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    if (!this.singer.id) {
      return this.$router.push('/singer')
    }
    this.getSingerDetail(this.singer.id)
  },
  methods: {
    async getSingerDetail (id) {
      const res = await getSingerDetail(id)
      if (res.code === ERR_OK) {
        this.songs = this.normalizeSong(res.data.list)
        console.log(this.songs)
      }
    },
    normalizeSong (list) {
      return list.map(item => createSong(item.musicData))
    }
  }
}
</script>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
