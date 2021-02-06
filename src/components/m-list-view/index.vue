<template>
  <m-scroll class="m-list-view" ref="listView" :data="data">
    <ul>
      <li
        v-for="group in data"
        :key="group.title"
        class="list-group"
        ref="listGroup"
      >
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.items"
            :key="item.id"
            class="list-group-item"
            @click="selectItem(item)"
          >
            <img
              v-lazy="item.avatar"
              :alt="item.name"
              class="avatar"
            />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortctTouchMove"
      @touchend.stop
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="list-shortcut-item"
        >{{ item }}</li>
      </ul>
    </div>
  </m-scroll>
</template>

<script>
import MScroll from '@/components/m-scroll'
import { getData } from '@/utils/dom'

const ANCHOR_HEIGHT = 18

export default {
  name: 'MListView',
  components: {
    MScroll
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortcutList () {
      return this.data.map(({ title }) => title.substr(0, 1))
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    selectItem (item) {
      this.$emit('on-select', item)
    },
    onShortcutTouchStart (e) {
      const anchorIndex = getData(e.target, 'index')
      const firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this.scrollTo(anchorIndex)
    },
    onShortctTouchMove (e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      const delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this.scrollTo(anchorIndex)
    },
    scrollTo (index) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/variable.less';
.m-list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: @color-background;
  .list-group {
    margin-bottom: 30px;
    &-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
    &-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: @color-text-l;
        font-size: @font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: @color-background-d;
    font-family: Helvetica;
    &-item {
      padding: 3px;
      line-height: 1;
      color: @color-text-l;
      font-size: @font-size-small;
    }
  }
}
</style>
