export const clearNullObject = (object) => {
  for (var key in object) {
    if (object[key] === null || object[key] === undefined || object[key] === 'null') {
      delete object[key]
    }
  }
  return object
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
