import { useEffect } from 'react'

export const clearNullObject = (object) => {
  for (var key in object) {
    if (object[key] === null || object[key] === undefined || object[key] === 'null') {
      delete object[key]
    }
  }
  return object
}

export const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
}
