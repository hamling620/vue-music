export const hasClass = (el, className) => el.classList.contains(className)

export const addClass = (el, className) => {
  el.classList.add(className)
}

export const getData = (el, name, value) => {
  if (value) {
    el.dataset[name] = value
    return
  }
  return el.dataset[name]
}
