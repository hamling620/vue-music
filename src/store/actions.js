import {
  ADD_CACHED_VIEW
} from './mutation-types'

const actions = {
  addCachedView ({ commit }, route) {
    commit(ADD_CACHED_VIEW, route)
  }
}

export default actions
