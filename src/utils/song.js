class Song {
  constructor ({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

const filterSinger = (singer) => {
  if (!singer) return ''
  return singer.map(item => item.name).join('/')
}

export const createSong = ({ songid, songmid, singer, songname, albumname, interval, albummid, url }) => new Song({
  id: songid,
  mid: songmid,
  singer: filterSinger(singer),
  name: songname,
  album: albumname,
  duration: interval,
  image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`,
  url
})
