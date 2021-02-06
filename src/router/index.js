import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/views/Recommend/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import(/* webpackChunkName: "singer" */ '@/views/Singer/index.vue')
  },
  {
    path: '/singerdetail/:id',
    name: 'singerDetail',
    meta: {
      noCache: true
    },
    component: () => import(/* webpackChunkName: "singerDetail" */ '@/views/SingerDetail/index.vue')
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import(/* webpackChunkName: "rank" */ '@/views/Rank/index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name) {
    store.dispatch('addCachedView', to)
  }
  next()
})

export default router
