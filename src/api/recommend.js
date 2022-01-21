import jsonp from '@/utils/jsonp'
import axios from 'axios'
import { commonParams, options } from './config'

const debug = process.env.NODE_ENV !== 'production'

export const getRecommend = () => {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export const getDiscList = async () => {
  const url = debug ? '/api/getDiscList' : 'http://ustbhuangyi.com/music/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  try {
    const res = await axios.get(url, { params: data })
    return res.data
  } catch (e) {
    return Promise.reject(e)
  }
}
