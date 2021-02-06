<template>
  <div class="singer page-wrapper">
    <m-list-view :data="singerList" @on-select="handleSelect"></m-list-view>
  </div>
</template>

<script>
import MListView from '@/components/m-list-view'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/utils/singer'
import { mapMutations } from 'vuex'
import { SET_SINGER } from '@/store/mutation-types'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  name: 'Singer',
  components: {
    MListView
  },
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this.getSingerList()
  },
  methods: {
    async getSingerList () {
      const res = await getSingerList()
      if (res.code === ERR_OK) {
        this.singerList = this.normalizeSinger(res.data.list)
      }
    },
    normalizeSinger (list) {
      const map = new Map()
      map.set('hot', {
        title: HOT_NAME,
        items: []
      })
      list.forEach((item, index) => {
        const singer = new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        })
        if (index < HOT_SINGER_LEN) {
          map.get('hot').items.push(singer)
        }

        const key = item.Findex
        if (!map.has(key)) {
          map.set(key, {
            title: key,
            items: []
          })
        }
        map.get(key).items.push(singer)
      })
      const ret = []
      const hot = []
      for (const [, value] of map) {
        if (value.title.match(/[a-zA-Z]/)) {
          ret.push(value)
        } else if (value.title === HOT_NAME) {
          hot.push(value)
        }
      }
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return hot.concat(ret)
    },
    handleSelect (item) {
      this.$router.push({
        name: 'singerDetail',
        params: {
          id: item.id
        }
      })
      this.setSinger(item)
    },
    ...mapMutations({
      setSinger: SET_SINGER
    })
  }
}
</script>
