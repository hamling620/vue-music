<template>
  <div class="recommend page-wrapper">
    <m-scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <m-slider autoplay>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" :alt="`pic_${item.id}`" @load="loadImage" class="needclick">
              </a>
            </div>
          </m-slider>
        </div>
        <div class="recommend-list">
          <h1 class="recommend-list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" :key="item.dissid" class="recommend-list-item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <div class="name" v-html="item.creator.name"></div>
                <div class="desc" v-html="item.dissname"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <m-loading></m-loading>
      </div>
    </m-scroll>
  </div>
</template>

<script>
import MScroll from '@/components/m-scroll'
import MSlider from '@/components/m-slider'
import MLoading from '@/components/m-loading'
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'

export default {
  name: 'Recommend',
  components: {
    MScroll,
    MSlider,
    MLoading
  },
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    Promise.all([
      this.getRecommend(),
      this.getDiscList()
    ])
  },
  methods: {
    async getRecommend () {
      const res = await getRecommend()
      if (res.code === ERR_OK) {
        this.recommends = res.data.slider
      }
    },
    async getDiscList () {
      const res = await getDiscList()
      if (res.code === ERR_OK) {
        this.discList = res.data.list
      }
    },
    loadImage () {
      if (!this.checkedLoaded) {
        this.checkedLoaded = true
        this.timer = setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/less/variable.less';
.recommend {
  &-content {
    height: 100%;
    overflow: hidden;
    .recommend-list {
      &-title {
        height: 65px;
        line-height: 65Px;
        text-align: center;
        font-size: @font-size-medium;
        color: @color-theme;
      }
      &-item {
        display: flex;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 20px;
          overflow: hidden;
          font-size: @font-size-medium;
          .name {
            margin-bottom: 10px;
            color: @color-text;
          }
          .desc {
            color: @color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
