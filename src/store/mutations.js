import {
  ADD_CACHED_VIEW,
  SET_SINGER
} from './mutation-types'

const mutations = {
  [ADD_CACHED_VIEW] (state, route) {
    if (state.cachedViews.includes(route.name)) return
    if (route.meta && route.meta.noCache) return
    state.cachedViews.push(route.name)
  },
  [SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default mutations
