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

export const isNunberic = (str) => {
  if (typeof str != 'string') {
    return false
  }

  return !isNaN(str) && !isNaN(parseFloat(str))
}

export const convertTagArrayToString = (tagArray) => {
  if (Array.isArray(tagArray)) {
    let tagName = ''
    let tagValue = ''
    tagArray.forEach((tag, index) => {
      Object.keys(tag).forEach((key) => {
        tagName += key + `${index !== tagArray.length - 1 ? ',' : ''}`
        tagValue += tag[key] + `${index !== tagArray.length - 1 ? ',' : ''}`
      })
    })
    return { tagName, tagValue }
  }
}
