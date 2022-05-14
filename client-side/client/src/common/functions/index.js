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

export const formatArrayForSelect = (
  array,
  labelGroup,
  translate,
  isLocation = false,
  firstObject,
  isChangeFirst = false,
  valueChange
) => {
  if (Array.isArray(array)) {
    if (firstObject) {
      array = [firstObject].concat(array)
    }

    if (isChangeFirst) {
      array[0] = { value: translate(valueChange), label: translate(valueChange) }
    }

    if (labelGroup === 'Service Pacakges') {
      const renderLabel = (data) => {
        const serviceName = data.services.map((item) => item.serviceName).join(', ')
        return `${data.packageName} (${translate('Quantity')}: ${
          data.extantQuantity
        }) (${serviceName})`
      }

      const datas = array.map((item) => ({
        value: item.code ? item.code || '' : (item.servicePackage || {})._id || '',
        label: item.label ? translate(item.label) : renderLabel(item.servicePackage),
      }))

      return [
        {
          label: labelGroup,
          options: datas,
        },
      ]
    }

    const datas = array.map((item) => ({
      value: isLocation ? item.code || 0 : item.value || '',
      label: isLocation ? translate(item.name) : translate(item.label),
    }))

    return [
      {
        label: labelGroup ? labelGroup : 'Group',
        options: datas,
      },
    ]
  } else {
    return []
  }
}
