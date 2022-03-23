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

export const equalTwoArrays = (array1, array2) => {
  return (
    Array.isArray(array1) &&
    Array.isArray(array2) &&
    array1.length === array2.length &&
    array1.every((val, index) => val === array2[index])
  )
}
