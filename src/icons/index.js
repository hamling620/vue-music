import Vue from 'vue'
import MIcon from '@/components/m-icon'

Vue.component('m-icon', MIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
