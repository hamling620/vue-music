import originalJsonp from 'jsonp'

export default function jsonp (url, data, options) {
  return new Promise((resolve, reject) => {
    const newUrl = url + (url.includes('?') ? '&' : '?') + handleParams(data)
    originalJsonp(newUrl, options, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function handleParams (data) {
  let url = ''
  for (const key of Object.keys(data)) {
    const value = data[key] !== undefined ? data[key] : ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
